# Import necessary libraries
from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd
import traceback

# Initialize Flask app
app = Flask(__name__)

MODEL_PATH = 'model/best_crash_severity_model.pkl'

# Load the model
with open(MODEL_PATH, 'rb') as f:
    model_package = pickle.load(f)

# Unpack model components
model = model_package['model']
ordinal_encoder = model_package['ordinal_encoder']
label_encoders = model_package['label_encoders']
y_encoder = model_package['y_encoder']
ordinal_features = model_package['ordinal_features']
remaining_features = model_package['remaining_features']
feature_order = model_package['feature_order']

# Preprocessing function
def preprocess(data):
    
    # Create a copy to avoid modifying original data
    df = data.copy()
    
    # Handle missing values for 'Distraction Level'
    if 'Distraction Level' in df.columns:
        if df['Distraction Level'].isna().all():
            # If all values are missing, fill with 'Other'
            df['Distraction Level'] = df['Distraction Level'].fillna('Other')
        else:
            # Fill missing with mode
            df['Distraction Level'] = df['Distraction Level'].fillna(
                df['Distraction Level'].mode().iloc[0]
            )
    
    # Convert categorical columns to string type
    for col in df.select_dtypes(include=['category']).columns:
        df[col] = df[col].astype('str')
    
    # Binary encoding for 'Airbag Deployed' and 'Seatbelt Used'
    df['Airbag Deployed'] = df['Airbag Deployed'].apply(lambda x: 1 if x == 'Yes' else 0)
    df['Seatbelt Used'] = df['Seatbelt Used'].apply(lambda x: 1 if x == 'Yes' else 0)
    
    return df


# Home route
@app.route('/')
def index():
    return render_template('index.html')

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Prepare input data dictionary
        input_data = {
            'Crash Speed (km/h)': int(data['crash_speed']),
            'Impact Angle (degrees)': int(data['impact_angle']),
            'Airbag Deployed': data['airbag'],
            'Seatbelt Used': data['seatbelt'],
            'Weather Conditions': data['weather'],
            'Road Conditions': data['road'],
            'Crash Type': data['crash_type'],
            'Vehicle Type': data['vehicle_type'],
            'Vehicle Age (years)': int(data['vehicle_age']),
            'Brake Condition': data['brake'],
            'Tire Condition': data['tire'],
            'Driver Age': int(data['driver_age']),
            'Driver Experience (years)': int(data['driver_experience']),
            'Alcohol Level (BAC%)': float(data['alcohol_level']),
            'Distraction Level': data.get('distraction') if data.get('distraction') else None,
            'Time of Day': data['time_of_day'],
            'Traffic Density': data['traffic'],
            'Visibility Distance (m)': int(data['visibility'])
        }
        
        # Convert to DataFrame
        df = pd.DataFrame([input_data])
        
        # Preprocess the data
        df_processed = preprocess(df)
        
        # Drop target column if present
        df_processed = df_processed.drop(columns=['Severity'], errors='ignore')
        
        # Encode ordinal features
        df_processed[ordinal_features] = ordinal_encoder.transform(
            df_processed[ordinal_features]
        )
        
        # Encode remaining categorical features
        for feature in remaining_features:
            le = label_encoders[feature]
            df_processed[feature] = df_processed[feature].map(
                lambda x: le.transform([x])[0] if x in le.classes_ else -1
            )
        
        # Reorder features
        df_processed = df_processed[feature_order]
        
        # Make prediction
        prediction_encoded = model.predict(df_processed)[0]

        # Decode prediction
        prediction_label = y_encoder.inverse_transform([prediction_encoded])[0]
        
        # Get prediction probabilities
        probabilities = model.predict_proba(df_processed)[0]

        # Create probability dictionary
        prob_dict = {
            severity: float(prob) 
            for severity, prob in zip(y_encoder.classes_, probabilities)
        }
        
        # Maximum probability
        max_prob = max(probabilities)

        # Determine risk level and color
        if prediction_label == 'Fatal' or max_prob > 0.7:
            risk_level = 'High'
            risk_color = '#e74c3c'
        elif prediction_label == 'Severe Injury' or max_prob > 0.5:
            risk_level = 'Medium'
            risk_color = '#f39c12'
        else:
            risk_level = 'Low'
            risk_color = '#2ecc71'
        
        # Return JSON response
        return jsonify({
            'success': True,
            'prediction': prediction_label,
            'probabilities': prob_dict,
            'risk_level': risk_level,
            'risk_color': risk_color,
            'confidence': float(max_prob)
        })
        
    except Exception as e:
        error_trace = traceback.format_exc()
        print("Error:", error_trace)
        
        return jsonify({
            'success': False,
            'error': str(e),
            'trace': error_trace
        }), 400

# Run the app
if __name__ == '__main__':
    app.run(debug=True)