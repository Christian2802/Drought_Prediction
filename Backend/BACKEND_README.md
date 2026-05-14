# Drought Risk Prediction Backend

Backend FastAPI untuk prediksi risiko kekeringan. Terintegrasi dengan model Machine Learning yang sudah ditraining.

## ✅ Prerequisites

- Python 3.8+
- Model sudah ditraining (file ada di `models/rf_drought_model.pkl`)
- Processed data tersedia

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run Backend

```bash
python main_api.py
```

Server akan berjalan di `http://localhost:8000`

### 3. Akses Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 📋 API Endpoints

### 1. **Health Check** (System Status)
```
GET /health
```
Check apakah API dan model siap

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "database_connected": true,
  "message": "Semua sistem ready"
}
```

---

### 2. **Quick Predict** (Frontend - Simplified)
```
POST /predict/quick?rainfall={mm}&temperature={°C}
```

Endpoint sederhana untuk React frontend. Hanya perlu curah hujan dan suhu.

**Query Parameters:**
- `rainfall`: Curah hujan (mm)
- `temperature`: Suhu rata-rata (°C)

**Response:**
```json
{
  "risk": "Risiko Rendah",
  "spi": 1.234,
  "risk_score": 0.95,
  "prediction_type": "quick"
}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/predict/quick?rainfall=100&temperature=32"
```

---

### 3. **Predict** (Full - All Parameters)
```
POST /predict
```

**Request Body:**
```json
{
  "station_id": "STN001",
  "station_name": "Jakarta-Kemayoran",
  "region_name": "Jakarta",
  "tn": 23.5,
  "tx": 32.1,
  "tavg": 27.8,
  "rh_avg": 75.5,
  "precipitation": 125.5,
  "ss": 6.2,
  "ff_x": 8.5,
  "ddd_car": "N",
  "latitude": -6.1751,
  "longitude": 106.8650
}
```

**Response:**
```json
{
  "id": 1,
  "station_id": "STN001",
  "station_name": "Jakarta-Kemayoran",
  "region_name": "Jakarta",
  "tn": 23.5,
  "tx": 32.1,
  "tavg": 27.8,
  "rh_avg": 75.5,
  "precipitation": 125.5,
  "ss": 6.2,
  "ff_x": 8.5,
  "ddd_car": "N",
  "spi": 1.1235,
  "risk": "low",
  "risk_score": 0.95,
  "latitude": -6.1751,
  "longitude": 106.8650,
  "created_at": "2024-01-15T10:30:00"
}
```

---

### 4. **Get Prediction History**
```
GET /predict/history
```

**Query Parameters:**
- `station_id` (optional): Filter by stasiun
- `risk` (optional): Filter by risk level (low, medium, high)
- `days` (optional): Data dari N hari terakhir (default: 30)
- `limit` (optional): Max records (default: 100, max: 1000)

**Example:**
```
GET /predict/history?station_id=STN001&risk=high&days=7&limit=50
```

**Response:**
```json
{
  "total": 3,
  "data": [
    {
      "id": 1,
      "station_id": "STN001",
      ...
      "risk": "high",
      ...
    },
    ...
  ]
}
```

---

### 5. **Get Station History**
```
GET /predict/history/{station_id}
```

**Query Parameters:**
- `days` (optional): Default 30
- `limit` (optional): Default 50

**Example:**
```
GET /predict/history/STN001?days=7&limit=20
```

---

### 6. **Risk Distribution Stats**
```
GET /stats/risk-distribution
```

**Query Parameters:**
- `days` (optional): Default 30

**Response:**
```json
{
  "high": 5,
  "medium": 12,
  "low": 83,
  "total": 100
}
```

---

### 7. **Average SPI Stats**
```
GET /stats/average-spi
```

**Query Parameters:**
- `days` (optional): Default 30
- `region` (optional): Filter by region

**Example:**
```
GET /stats/average-spi?days=7&region=Jakarta
```

**Response:**
```json
{
  "average_spi": 0.3456,
  "count": 10
}
```

---

## 📊 Data Dictionary

### Input Features

| Feature | Type | Range | Description |
|---------|------|-------|-------------|
| `station_id` | String | - | ID unik stasiun |
| `station_name` | String | - | Nama stasiun |
| `region_name` | String | - | Nama region |
| `tn` | Float | -20 to 50 | Temperatur minimum (°C) |
| `tx` | Float | -20 to 50 | Temperatur maksimum (°C) |
| `tavg` | Float | -20 to 50 | Temperatur rata-rata (°C) |
| `rh_avg` | Float | 0 to 100 | Kelembaban relatif rata-rata (%) |
| `precipitation` | Float | 0 to 500 | Curah hujan (mm) |
| `ss` | Float | 0 to 12 | Durasi sinar matahari (jam) |
| `ff_x` | Float | 0 to 50 | Kecepatan angin maksimum (m/s) |
| `ddd_car` | String | N, S, E, W, NE, SE, SW, NW | Arah angin dominan |
| `latitude` | Float | -90 to 90 | Latitude stasiun |
| `longitude` | Float | -180 to 180 | Longitude stasiun |

### Output Features

| Feature | Type | Description |
|---------|------|-------------|
| `spi` | Float | Standardized Precipitation Index |
| `risk` | String | Risk level: `low`, `medium`, `high` |
| `risk_score` | Float | Confidence score (0 to 1) |
| `created_at` | DateTime | Timestamp prediksi |

### Risk Classification

| SPI Range | Risk Level | Description |
|-----------|------------|-------------|
| SPI > 0 | **low** | Kondisi basah, tidak ada risiko kekeringan |
| -1 < SPI ≤ 0 | **medium** | Kondisi normal dengan potensi kekeringan |
| SPI ≤ -1 | **high** | Kondisi sangat kering, risiko tinggi |

---

## 🗄️ Database

### SQLite Database: `predictions.db`

Menyimpan history semua prediksi dengan fields:
- Prediction ID
- Station info (ID, name, region)
- Input features
- SPI value
- Risk level
- Risk score (confidence)
- Timestamp

**Queries yang berguna:**

```sql
-- Total prediksi per stasiun
SELECT station_id, COUNT(*) as total
FROM prediction_history
GROUP BY station_id;

-- Prediksi dengan risiko tinggi
SELECT * FROM prediction_history
WHERE risk = 'high'
ORDER BY created_at DESC;

-- Rata-rata SPI per region
SELECT region_name, AVG(spi) as avg_spi
FROM prediction_history
GROUP BY region_name;
```

---

## 🐍 Python Usage Example

### Menggunakan Library `requests`

```python
import requests
import json

BASE_URL = "http://localhost:8000"

# 1. Health Check
response = requests.get(f"{BASE_URL}/health")
print(response.json())

# 2. Make Prediction
data = {
    "station_id": "STN001",
    "station_name": "Jakarta-Kemayoran",
    "region_name": "Jakarta",
    "tn": 23.5,
    "tx": 32.1,
    "tavg": 27.8,
    "rh_avg": 75.5,
    "precipitation": 125.5,
    "ss": 6.2,
    "ff_x": 8.5,
    "ddd_car": "N",
    "latitude": -6.1751,
    "longitude": 106.8650
}

response = requests.post(f"{BASE_URL}/predict", json=data)
prediction = response.json()
print(f"Risk Level: {prediction['risk']}")
print(f"SPI: {prediction['spi']}")

# 3. Get History
response = requests.get(
    f"{BASE_URL}/predict/history",
    params={
        "station_id": "STN001",
        "days": 7,
        "limit": 10
    }
)
history = response.json()
print(f"Total predictions: {history['total']}")

# 4. Get Statistics
response = requests.get(f"{BASE_URL}/stats/risk-distribution?days=30")
stats = response.json()
print(f"High risk: {stats['high']}")
```

---

## 🔄 Integration dengan Frontend

### Contoh Request dari JavaScript/React

```javascript
// Predict drought risk
const predictDrought = async (stationData) => {
  try {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stationData)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Prediction error:', error);
  }
};

// Get prediction history
const getHistory = async (stationId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/predict/history/${stationId}?days=30`
    );
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('History fetch error:', error);
  }
};

// Usage
const stationData = {
  station_id: "STN001",
  station_name: "Jakarta-Kemayoran",
  region_name: "Jakarta",
  tn: 23.5,
  tx: 32.1,
  tavg: 27.8,
  rh_avg: 75.5,
  precipitation: 125.5,
  ss: 6.2,
  ff_x: 8.5,
  ddd_car: "N",
  latitude: -6.1751,
  longitude: 106.8650
};

const result = await predictDrought(stationData);
console.log('Risk level:', result.risk);
```

---

## 🛡️ CORS Configuration

Backend sudah dikonfigurasi untuk accept requests dari frontend apapun. Untuk production, ubah di `main_api.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Production domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📁 Project Structure

```
Project/
├── main_api.py              # FastAPI app utama
├── main.ipynb               # Jupyter notebook training
├── database.py              # SQLAlchemy database config
├── schemas.py               # Pydantic request/response models
├── prediction_service.py    # Model prediction service
├── requirements.txt         # Python dependencies
├── predictions.db           # SQLite database (auto-created)
├── models/
│   ├── rf_drought_model.pkl # Trained Random Forest model
│   └── label_encoder_ddd_car.pkl # Wind direction encoder
└── data/
    └── processed/
        └── climate_data_processed.csv
```

---

## ⚙️ Configuration

### Environment Variables (Optional)

Buat file `.env` jika ingin customize:

```
API_HOST=0.0.0.0
API_PORT=8000
DATABASE_URL=sqlite:///./predictions.db
```

Kemudian load dengan:

```python
from dotenv import load_dotenv
import os

load_dotenv()
HOST = os.getenv("API_HOST", "0.0.0.0")
PORT = int(os.getenv("API_PORT", 8000))
```

---

## 🚨 Troubleshooting

### Error: "Model file tidak ditemukan"
- Pastikan file `models/rf_drought_model.pkl` exists
- Jalankan notebook `Main.ipynb` terlebih dahulu untuk generate model

### Error: "Encoder tidak ditemukan"
- Pastikan file `models/label_encoder_ddd_car.pkl` exists
- Ini di-generate saat preprocessing di notebook

### Error: "Database connection failed"
- Delete `predictions.db` dan restart server
- Database akan di-recreate otomatis

### CORS Error di Frontend
- Pastikan backend running di port yang benar
- Update allowed origins di CORS middleware

---

## 📈 Next Steps

1. **Connect Frontend**: Gunakan endpoint `/predict` untuk real-time predictions
2. **Visualize Data**: Gunakan `/predict/history` untuk historical trends
3. **Analytics Dashboard**: Gunakan `/stats/*` endpoints untuk monitoring
4. **Mobile App**: Semua endpoints bisa diakses via HTTP

---

## 📞 API Support

Dokumentasi lengkap tersedia di:
- **Swagger UI**: `/docs`
- **ReDoc**: `/redoc`

Setiap endpoint sudah documented dengan contoh request/response.

---

**Dibuat untuk**: Drought Risk Prediction System  
**Backend Version**: 1.0.0  
**API Framework**: FastAPI 0.104.1
