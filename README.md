<p align="center">
  <img src="https://github.com/user-attachments/assets/0ccb0c4d-bdfc-4fe2-be8a-139695b79f08" width="80" alt="flask-icon"/>
</p>

<h1 align="center">🚗 Car Crash Severity Prediction System</h1>
<h4 align="center">MODEL BUILT USING PYTHON, JUPYTER NOTEBOOK, FLASK, AND JAVASCRIPT</h4>

<p align="center">
  <img src="https://github.com/user-attachments/assets/daa8e441-f20d-40ad-a3d3-e8248ca5bd3e" height="38"/>&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/116de819-50a4-41f7-8a2d-65d8aecc0042" height="33"/>&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/6bfaa1c7-d0cb-4d14-bbcf-ddef317693c9" height="43"/>
</p>

<h4 align="center">DEPLOYED ON RENDER VIA GITHUB</h4>

<p align="center">
  <img src="https://github.com/user-attachments/assets/fe117f9a-8bd3-4161-8af3-9b4104c1f74d" height="23"/>
</p>

---

#### ☁️ Live Application: [https://car-crash-severity-prediction-model.onrender.com](https://car-crash-severity-prediction-model.onrender.com)

A full-stack Machine Learning web application that predicts the severity of car crashes (Minor Injury, Severe Injury, Fatal) based on vehicle, driver, environmental, and crash-related factors. Road traffic accidents remain a major global safety issue. This project builds, evaluates, and deploys multiple machine learning models to accurately predict crash severity using structured crash data.

## 📑 Table of Contents

- [✨ Features](#-features)
- [📜 Dataset](#-dataset)
- [📌 Technology Stack Overview](#-technology-stack-overview)
- [📁 Project Structure](#-project-structure)
- [🔄 Data Preprocessing Pipeline](#-data-preprocessing-pipeline)
- [🧩 Handling Class Imbalance (SMOTE)](#-handling-class-imbalance-smote)
- [🤖 Models Trained & Compared](#-models-trained--compared)
- [📊 Confusion Matrix: Gradient Boosting](#-confusion-matrix-gradient-boosting)
- [🔌 API Endpoint](#-api-endpoint)
- [🎯 Installation & Setup](#-installation--setup)
- [🧪 Model Training & Testing (Optional)](#-model-training--testing-optional)
- [📸 System Screenshots](#-system-screenshots)
- [👤 Created By](#-created-by)
- [📝 License](#-license)

---

## ✨ Features

* **Predicts car crash severity (Minor Injury, Severe Injury, Fatal)**
* **Uses machine learning with high accuracy (up to 86.52%)**
* **Supports multiple ML models with best model selection**
* **Provides probability-based predictions with confidence scores**
* **Displays risk level (Low / Medium / High)**
* **Real-time prediction via Flask web application**
* **Interactive probability visualization using Chart.js**
* **User-friendly and responsive interface**

---

## 📜 Dataset

- **Dataset**: Car Crash Dataset (4000+ records)
- **Target Variable**: Severity (Minor Injury, Severe Injury, Fatal)
- **Link**: [https://github.com/PAIshanMadusha/car-crash-severity-prediction-model/blob/main/dataset/car_crash_train.csv](https://github.com/PAIshanMadusha/car-crash-severity-prediction-model/blob/main/dataset/car_crash_train.csv)
- **Source**: [Kaggle Competition](https://www.kaggle.com/competitions/car-crash-severity-prediction)
- **Features**: 18 input variables:

| Category | Feature | Description |
|----------|----------|-------------|
| **Crash Factors** | Crash Speed (km/h) | Speed of vehicle at the time of impact |
|  | Impact Angle (degrees) | Angle at which the collision occurred |
|  | Crash Type | Type of collision (e.g., head-on, side impact) |
|  | Visibility Distance (m) | Driver’s visibility range during crash |
| **Vehicle Factors** | Vehicle Type | Type of vehicle (Car, SUV, Truck, etc.) |
|  | Vehicle Age | Age of the vehicle in years |
|  | Brake Condition | Condition of braking system |
|  | Tire Condition | Condition of tires |
|  | Airbag Deployed | Whether airbags were deployed (Yes/No) |
|  | Seatbelt Used | Whether seatbelt was used (Yes/No) |
| **Driver Factors** | Driver Age | Age of the driver |
|  | Driver Experience | Years of driving experience |
|  | Alcohol Level (BAC%) | Blood alcohol concentration |
|  | Distraction Level | Driver distraction type (Phone, Drowsiness, etc.) |
| **Environmental Factors** | Weather Conditions | Weather during crash (Clear, Rain, Fog, etc.) |
|  | Road Conditions | Road surface condition (Dry, Wet, Icy) |
|  | Time of Day | Time period of crash (Morning, Night, etc.) |
|  | Traffic Density | Traffic level at crash time (Low, Medium, High) |

---

## 📌 Technology Stack Overview
The following technologies are used in this project:

| Layer | Technologies | Description |
|-------|-------------|-------------|
| **Development** | Visual Studio Code, Jupyter Notebook | Model development, experimentation, debugging, and project development environment |
| **Backend** | Python, Flask, Scikit-Learn, XGBoost, Imbalanced-learn, NumPy, Pickle | Handles machine learning model training, preprocessing, prediction, and API endpoints |
| **Frontend** | HTML, CSS, JavaScript | Provides interactive UI for entering crash details and displaying severity predictions |
| **Deployment** | Render, Gunicorn | Production server setup and cloud hosting for live application access |

---

## 📁 Project Structure
The following structure is used for this project:

```
car-crash-severity-prediction-model/
│
├── dataset/                            # Dataset used for training the model
│   ├── car_crash_test.csv
│   ├── car_crash_train.csv
│   └── sample_submission.csv
├── model/
│   └── best_crash_severity_model.pkl   # Saved trained model
├── notebooks/                          # Jupyter notebooks for development and experimentation
│   └── car_crash_severity_prediction.ipynb
├── static/                             # Static frontend assets (CSS, JS & images)
│   ├── css/
│   │   └── style.css
│   ├── images/
│   └── js/
│       └── script.js
├── templates/                          # Main frontend user interface
│   └── index.html
├── venv/                               # Virtual environment
├── .gitignore
├── app.py                              # Core Flask backend application
├── LICENSE
├── Procfile
├── README.md
└── requirements.txt                    # All python dependencies
```

---

## 🔄 Data Preprocessing Pipeline
The preprocessing pipeline ensures model consistency and reliability:

* Handling missing values using mode imputation for categorical features
* Binary encoding for: (Airbag Deployed, Seatbelt Used)
* Ordinal encoding for ordered categorical features: (Weather Conditions, Road Conditions, Brake Condition, Tire Condition, Distraction Level & Traffic Density)
* Label encoding for nominal categorical features
* Feature alignment to maintain training order consistency
* Target encoding for severity classes

---

## 🧩 Handling Class Imbalance (SMOTE)
SMOTE was used to balance the dataset by oversampling underrepresented crash severity classes:

**1. ✅ Original class distribution:**

```
Minor Injury  : 2756
Severe Injury : 1038
Fatal         : 206
```
* Severe class imbalance existed (Fatal class underrepresented)

**2. ✅ After applying SMOTE (Synthetic Minority Oversampling Technique):**

```
Minor Injury  : 2756
Severe Injury : 2756
Fatal         : 2756
```
* This significantly improved recall performance for minority classes and reduced model bias

---

## 🤖 Models Trained & Compared
Four machine learning models were trained and evaluated:

|  A bar chart comparing the accuracy of all trained models (Random Forest, Gradient Boosting, XGBoost, and Neural Network), highlighting the best-performing model. |
| ---------------------------------------------------------------------------------------------------------------- |
| <p align="center"><img src="https://github.com/user-attachments/assets/4e233097-354f-48af-865f-194373792802" width="700"></p> |

| Model                | Accuracy   | Strength                   |
| -------------------- | ---------- | -------------------------- |
| Random Forest        | 82.77%     | Strong baseline, robust    |
| Gradient Boosting    | **86.52%  ✓**  | Best overall performance   |
| XGBoost              | 85.01%     | Strong non-linear modeling |
| Neural Network (MLP) | 78.84%     | Deep learning approach     |

* **🏆 Final Model Chosen:** `Gradient Boosting`  
> Selected for its balanced performance across all severity classes, with strong precision and recall.

#### 📊 Confusion Matrix: Gradient Boosting

| The confusion matrix visualizes the model’s performance by comparing predicted labels against the actual labels. |
| ---------------------------------------------------------------------------------------------------------------- |
| <p align="center"><img src="https://github.com/user-attachments/assets/2697a3d3-f89f-4514-a121-127c6fa39046" width="700"></p> |

---

## 🔌 API Endpoint
`POST /predict`, takes crash, vehicle, driver, and environmental conditions as input and returns the predicted crash severity along with confidence scores:

### ✅ Request Headers
Include the following header in your request:

```bash
Content-Type: application/json
```

### ✅ Request Body
Send a JSON object with the following parameters:

```json
{
  "Crash Speed (km/h)": 150,
  "Impact Angle (degrees)": 85,
  "Airbag Deployed": "No",
  "Seatbelt Used": "No",
  "Weather Conditions": "Fog",
  "Road Conditions": "Icy",
  "Crash Type": "Head-on",
  "Vehicle Type": "Motorcycle",
  "Vehicle Age (years)": 15,
  "Brake Condition": "Worn out",
  "Tire Condition": "Worn out",
  "Driver Age": 22,
  "Driver Experience (years)": 1,
  "Alcohol Level (BAC%)": 0.12,
  "Distraction Level": "Phone",
  "Time of Day": "Night",
  "Traffic Density": "Low",
  "Visibility Distance (m)": 50
}
```

### ✅ Successful Response
Returns `success = true` with the predicted severity, confidence scores, and risk level:

```json
{
  "success": true,
  "prediction": "Minor Injury",
  "confidence": 1.0,
  "risk_level": "High",
  "probabilities": {
    "Fatal": 0.0,
    "Minor Injury": 1.0,
    "Severe Injury": 0.0
  }
}
```

---

## 🎯 Installation & Setup
Follow these steps to run the project locally:

#### 1. ✅ Clone the Repository
```bash
git clone https://github.com/PAIshanMadusha/car-crash-severity-prediction-model.git
````

#### 2. ✅ Navigate to the Project Directory

```bash
cd car-crash-severity-prediction-model
```

#### 3. ✅ Create & Activate Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows
```

#### 4. ✅ Install Dependencies

```bash
pip install -r requirements.txt
```

#### 5. ▶️ Run the Application

```bash
python app.py
```

#### 6. ✅ Open in Browser

```
http://127.0.0.1:5000
```

---

## 🧪 Model Training & Testing (Optional)
You can train and test the model using the Jupyter Notebook:

#### 1. 📂 Open the Notebook File

```bash
notebooks/car_crash_severity_prediction.ipynb
```

#### 2. ✅ Create & Activate Virtual Environment (if not already done)

```bash
python -m venv venv

# Activate
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows
```

#### 3. 🧰 Install Jupyter Notebook & Launch

```bash
pip install jupyter notebook
jupyter notebook
```

#### * Then open `car_crash_severity_prediction.ipynb` and run the cells step by step.

## 📸 System Screenshots:

---
<p align="center">
  <img src="https://github.com/user-attachments/assets/79d6bba6-8c1d-41f9-baff-d3359abfe926" alt="Screenshot 1" width="800">
  </br>
  <img src="https://github.com/user-attachments/assets/de5509c4-c1f8-4840-ae65-22e883881503" alt="Screenshot 1" width="800">
</p>

---

### 👤 Created By
**Ishan Madhusha**  
GitHub: [PAIshanMadusha](https://github.com/PAIshanMadusha)  

Feel free to explore my work and reach out if you'd like to collaborate! 🚀

---

## 📝 License
This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for more details.
