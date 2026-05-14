# Dokumentasi Lengkap: Backend & Frontend Drought Prediction

## 📋 Ringkasan Singkat

Saya sudah membuat backend **FastAPI** + contoh **Frontend HTML** untuk sistem prediksi risiko kekeringan Anda. Semuanya sudah siap untuk connect dengan model ML yang sudah ditraining.

---

## 🗂️ File-File yang Dibuat

```
Project/
├── main_api.py                    ✅ FastAPI backend utama
├── database.py                    ✅ Database configuration
├── schemas.py                     ✅ Request/Response models
├── prediction_service.py          ✅ Model prediction logic
├── test_api.py                    ✅ API testing script
├── frontend_example.html          ✅ Web UI example
├── requirements.txt               ✅ Python dependencies
├── BACKEND_README.md              ✅ API documentation lengkap
└── .gitignore                     ✅ Git ignore rules
```

---

## 🚀 Quick Start (3 Langkah)

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Run Backend

```bash
python main_api.py
```

**Output:**
```
============================================================
Drought Risk Prediction API
============================================================
Project Dir: E:\Semester 4 (Intelligent System)\Machine Learning\Project
Starting server...
API Documentation: http://localhost:8000/docs
============================================================
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 3: Akses Frontend

Buka browser dan akses:
- **Web UI**: [frontend_example.html](frontend_example.html) (buka file langsung di browser)
- **API Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

---

## 📡 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Browser)                    │
│              (frontend_example.html)                    │
│  - Prediction Form                                      │
│  - Result Display                                       │
│  - History Viewer                                       │
│  - Statistics Dashboard                                 │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP/REST
                   │ JSON
┌──────────────────▼──────────────────────────────────────┐
│              FastAPI Backend (Port 8000)                │
│                 (main_api.py)                          │
│                                                         │
│  Endpoints:                                             │
│  - POST /predict                                        │
│  - GET /predict/history                                 │
│  - GET /predict/history/{station_id}                    │
│  - GET /stats/risk-distribution                         │
│  - GET /stats/average-spi                               │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌───────▼────────┐
│  ML Model      │   │  SQLite DB     │
│  (Trained)     │   │  (History)     │
│ rf_drought_    │   │ predictions.db │
│ model.pkl      │   │                │
└────────────────┘   └────────────────┘
```

---

## 🧪 Testing

### Test 1: Jalankan Test Suite

```bash
python test_api.py
```

Ini akan otomatis test semua endpoints dengan sample data.

### Test 2: Manual Test dengan cURL

```bash
# Health check
curl http://localhost:8000/health

# Predict
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "station_id": "STN001",
    "station_name": "Jakarta-Kemayoran",
    "region_name": "DKI Jakarta",
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
  }'

# Get history
curl http://localhost:8000/predict/history?days=7
```

### Test 3: Swagger UI

Buka http://localhost:8000/docs di browser untuk interactive API testing.

---

## 📊 API Endpoints Lengkap

### 1. Health Check
```
GET /health
```
Cek status backend dan model.

### 2. Predict (Main)
```
POST /predict
```
Kirim data iklim stasiun tunggal → dapatkan prediksi risiko.

**Input:**
- Station info: `station_id`, `station_name`, `region_name`
- Climate data: `tn`, `tx`, `tavg`, `rh_avg`, `precipitation`, `ss`, `ff_x`, `ddd_car`
- Coordinates: `latitude`, `longitude`

**Output:**
```json
{
  "risk": "low",        // atau "medium", "high"
  "spi": 1.1235,        // Standardized Precipitation Index
  "risk_score": 0.95    // Confidence (0-1)
}
```

### 3. Get History
```
GET /predict/history
GET /predict/history/{station_id}
```

Query parameters:
- `days`: Data dari N hari terakhir (default: 30)
- `limit`: Max records (default: 100)
- `station_id`: Filter by stasiun
- `risk`: Filter by risk level

### 4. Statistics
```
GET /stats/risk-distribution?days=30
GET /stats/average-spi?days=30&region=Jakarta
```

---

## 🎨 Frontend Example Fitur

### 1. Prediction Form
- Input data iklim untuk satu stasiun
- Real-time validation
- Preset values dari Jakarta

### 2. Result Display
- Visualisasi risk level dengan badge warna
- SPI value
- Confidence score
- Interpretation guide

### 3. History Viewer
- Table dengan latest predictions
- Filter options
- Auto-load ketika prediksi baru dibuat

### 4. Statistics Dashboard
- Visual stats (High/Medium/Low risk counts)
- Average SPI trends
- Interactive refresh button

---

## 💾 Database Schema

**Table: `prediction_history`**

| Column | Type | Description |
|--------|------|-------------|
| id | Integer | Primary Key |
| station_id | String | Stasiun ID |
| station_name | String | Nama stasiun |
| region_name | String | Nama region |
| tn, tx, tavg | Float | Temperatures |
| rh_avg | Float | Humidity |
| precipitation | Float | Curah hujan (mm) |
| ss, ff_x | Float | Sunshine & wind |
| ddd_car | String | Wind direction |
| spi | Float | Standardized Precipitation Index |
| risk | String | Risk level (low/medium/high) |
| risk_score | Float | Model confidence |
| latitude, longitude | Float | Coordinates |
| created_at | DateTime | Timestamp |

---

## 🔌 Integration dengan Frontend Lain

### React Example

```javascript
const predictDrought = async (stationData) => {
  const response = await fetch('http://localhost:8000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stationData)
  });
  return await response.json();
};
```

### Vue Example

```javascript
async function predict(stationData) {
  const { data } = await this.$axios.post(
    'http://localhost:8000/predict',
    stationData
  );
  return data;
}
```

### Angular Example

```typescript
predict(stationData: StationData): Observable<PredictionResult> {
  return this.http.post<PredictionResult>(
    'http://localhost:8000/predict',
    stationData
  );
}
```

---

## ⚙️ Configuration

### Port berbeda?

Edit `main_api.py` baris terakhir:

```python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8080,  # Ubah port di sini
        log_level="info"
    )
```

### CORS untuk production?

Edit `main_api.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourfrontend.com"],  # Production domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📝 Data Format Examples

### Request dengan curah hujan tinggi (Low Risk)

```json
{
  "station_id": "STN001",
  "station_name": "Jakarta",
  "region_name": "Jakarta",
  "tn": 23.5,
  "tx": 32.1,
  "tavg": 27.8,
  "rh_avg": 75.5,
  "precipitation": 250.0,
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
  "risk": "low",
  "spi": 3.89,
  "risk_score": 0.99
}
```

### Request dengan curah hujan rendah (High Risk)

```json
{
  "station_id": "STN002",
  "station_name": "Yogyakarta",
  "region_name": "DIY",
  "tn": 21.0,
  "tx": 29.5,
  "tavg": 25.2,
  "rh_avg": 65.0,
  "precipitation": 5.0,
  "ss": 10.2,
  "ff_x": 6.8,
  "ddd_car": "E",
  "latitude": -7.7956,
  "longitude": 110.4158
}
```

**Response:**
```json
{
  "risk": "high",
  "spi": -1.56,
  "risk_score": 0.87
}
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Model not found | Pastikan model sudah di-generate dari notebook |
| Database error | Delete `predictions.db` dan restart server |
| CORS error di frontend | Update `allow_origins` di main_api.py |
| Port 8000 sudah dipakai | Ubah port di `if __name__ == "__main__"` |
| Import error | Jalankan `pip install -r requirements.txt` |

---

## 📚 File Documentation

1. **`main_api.py`**: FastAPI app dengan semua endpoints
2. **`database.py`**: SQLite setup dan models
3. **`schemas.py`**: Pydantic request/response models
4. **`prediction_service.py`**: Model loading dan prediction logic
5. **`test_api.py`**: Automated API testing
6. **`frontend_example.html`**: Web UI example (standalone)
7. **`BACKEND_README.md`**: Dokumentasi API lengkap
8. **`requirements.txt`**: Python dependencies

---

## ✅ Checklist Implementasi

- [x] FastAPI backend dengan REST endpoints
- [x] SQLite database untuk history
- [x] Pydantic models untuk validation
- [x] Integration dengan trained ML model
- [x] CORS enabled untuk frontend
- [x] Swagger UI documentation
- [x] Test suite
- [x] HTML frontend example
- [x] Comprehensive API documentation
- [x] Error handling

---

## 🎯 Next Steps untuk Frontend

1. **Buka `frontend_example.html`** langsung di browser
2. **Mulai backend**: `python main_api.py`
3. **Test predictions** menggunakan form
4. **View history** dan statistics
5. **Integrate ke React/Vue/Angular** menggunakan endpoints

---

## 📞 Support

Semua endpoints sudah documented di:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **File**: `BACKEND_README.md`

Setiap endpoint ada contoh request dan response.

---

**Selamat! Backend dan frontend example sudah siap untuk digunakan! 🎉**

Butuh bantuan? Cek dokumentasi lengkap di `BACKEND_README.md`
