# 🌧️ Drought Risk Prediction - Integration Guide

Complete guide untuk mengintegrasikan Frontend React dengan Backend FastAPI.

---

## 📋 Overview

```
┌─────────────────────────────────────┐
│    Frontend (React + TypeScript)    │
│    Port: 5173 (Vite dev server)    │
│                                     │
│  - Predict Page                    │
│  - Input: Rainfall, Temperature    │
│  - Output: Risk Level              │
└──────────────────┬──────────────────┘
                   │ HTTP Request
                   │ POST /predict/quick
                   │ JSON Response
┌──────────────────▼──────────────────┐
│   Backend (FastAPI + Python)        │
│   Port: 8000                        │
│                                     │
│  - ML Model (RandomForest)         │
│  - SQLite Database                 │
│  - REST API Endpoints              │
└─────────────────────────────────────┘
```

---

## 🚀 Quick Setup (5 menit)

### Terminal 1: Backend

```bash
cd "e:\Semester 4 (Intelligent System)\Machine Learning\Project"
pip install -r requirements.txt
python main_api.py
```

**Expected Output:**
```
============================================================
Drought Risk Prediction API
============================================================
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Terminal 2: Frontend

```bash
cd "e:\Semester 4 (Intelligent System)\Machine Learning\Project\Drought_Prediction-main"
npm install
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in XX ms

➜  Local:   http://localhost:5173/
```

### Terminal 3: Test (Optional)

```bash
cd "e:\Semester 4 (Intelligent System)\Machine Learning\Project"
python test_api.py
```

---

## 🔌 API Endpoints Reference

### 1. Quick Predict (Frontend Uses This)

**Request:**
```
POST /predict/quick?rainfall={mm}&temperature={°C}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/predict/quick?rainfall=100&temperature=32"
```

**Response:**
```json
{
  "risk": "Risiko Rendah",
  "spi": 1.234,
  "risk_score": 0.95,
  "prediction_type": "quick"
}
```

---

### 2. Full Predict (Advanced)

**Request:**
```
POST /predict
Content-Type: application/json

{
  "station_id": "STN001",
  "station_name": "Jakarta",
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
}
```

**Response:**
```json
{
  "id": 1,
  "station_id": "STN001",
  "risk": "low",
  "spi": 1.234,
  "risk_score": 0.95,
  "created_at": "2024-01-15T10:30:00"
}
```

---

### 3. Get History

```
GET /predict/history?days=30&limit=10
```

---

### 4. Statistics

```
GET /stats/risk-distribution?days=30
GET /stats/average-spi?days=30
```

---

## 🔧 Configuration

### Frontend Environment

Create `.env` file in `Drought_Prediction-main/`:

```env
# Development
VITE_API_URL=http://localhost:8000

# Production
# VITE_API_URL=https://api.yourdomain.com
```

### Backend Configuration (Optional)

Edit `main_api.py` untuk custom port atau CORS:

```python
# Line ~250
if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,  # Change if needed
        log_level="info"
    )
```

---

## 📊 Data Flow

### Step 1: User Input

User membuka frontend dan input:
- Curah Hujan: 100 mm
- Suhu: 32°C

### Step 2: Frontend Processing

```typescript
// PredictPage.tsx
const response = await fetch(
  `${API_BASE_URL}/predict/quick?rainfall=100&temperature=32`,
  { method: 'POST' }
);
const data = await response.json();
```

### Step 3: Backend Processing

```python
# main_api.py -> quick_predict()
1. Receive rainfall=100, temperature=32
2. Create feature vector dengan default values
3. Load ML model
4. Predict risk level
5. Convert to Indonesian label
6. Save ke database
7. Return JSON response
```

### Step 4: Frontend Display

```typescript
// Display result
setResult(data.risk);           // "Risiko Rendah"
setSpi(data.spi);              // 1.234
setScore(data.risk_score);      // 0.95
```

---

## 🎨 Risk Classification

| SPI Value | Risk Level | Color | Description |
|-----------|-----------|-------|-------------|
| > 0 | Risiko Rendah | 🟢 Green | Kondisi basah, tidak ada risiko |
| -1 to 0 | Risiko Sedang | 🟡 Yellow | Kondisi normal dengan potensi risiko |
| ≤ -1 | Risiko Tinggi | 🔴 Red | Kondisi sangat kering, risiko tinggi |

---

## 🧪 Testing Workflow

### 1. Manual Testing

```
1. Buka http://localhost:5173
2. Input: Rainfall=50, Temperature=35
3. Click "Prediksi Sekarang"
4. Should show "Risiko Tinggi"
5. Check DevTools Network tab untuk see request/response
```

### 2. Automated Testing

```bash
python test_api.py
```

Test ini akan:
- Check backend health
- Test prediction endpoint
- Test batch predictions
- Test history retrieval
- Test statistics

### 3. API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 🐛 Troubleshooting

### Issue 1: CORS Error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Pastikan backend running: `python main_api.py`
- Check `.env` file: `VITE_API_URL=http://localhost:8000`
- Backend sudah enable CORS

### Issue 2: 404 Not Found

**Error:**
```
POST http://localhost:8000/predict/quick 404
```

**Solution:**
- Pastikan backend sudah di-update dengan endpoint `/predict/quick`
- Jalankan `git pull` atau copy latest `main_api.py`

### Issue 3: Connection Refused

**Error:**
```
Failed to fetch (backend connection refused)
```

**Solution:**
```bash
# Terminal baru
cd <project-root>
python main_api.py
```

### Issue 4: Model Not Found

**Error:**
```
Model not found at models/rf_drought_model.pkl
```

**Solution:**
- Jalankan notebook `Main.ipynb` terlebih dahulu untuk generate model
- Pastikan file ada: `models/rf_drought_model.pkl`

---

## 📁 Directory Structure

```
e:\Semester 4 (Intelligent System)\Machine Learning\Project\
│
├── Backend Files:
│   ├── main_api.py                  # FastAPI app
│   ├── database.py                  # Database config
│   ├── schemas.py                   # Data models
│   ├── prediction_service.py        # ML service
│   ├── requirements.txt             # Dependencies
│   ├── test_api.py                  # API tests
│   └── models/
│       ├── rf_drought_model.pkl     # Trained model
│       └── label_encoder_ddd_car.pkl
│
├── Drought_Prediction-main/         # Frontend
│   ├── src/
│   │   └── pages/predictPage/
│   │       ├── PredictPage.tsx      # Main component
│   │       └── PredictPage.module.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
└── Documentation:
    ├── BACKEND_README.md
    ├── SETUP_GUIDE.md
    ├── INTEGRATION_GUIDE.md (this file)
    └── Drought_Prediction-main/FRONTEND_SETUP.md
```

---

## 🚀 Deployment Checklist

### Backend Deployment

- [ ] Set `VITE_API_URL` untuk production domain
- [ ] Update CORS `allow_origins` di `main_api.py`
- [ ] Use production WSGI server (gunicorn, etc)
- [ ] Setup SSL/HTTPS
- [ ] Configure environment variables

### Frontend Deployment

- [ ] Build: `npm run build`
- [ ] Update `.env.production`
- [ ] Deploy `dist/` folder ke web server
- [ ] Test all endpoints di production

---

## 📝 Example Predictions

### Scenario 1: High Risk

```
Input:
  - Rainfall: 20 mm (sangat rendah)
  - Temperature: 35°C (sangat panas)

Output:
  - Risk: "Risiko Tinggi"
  - SPI: -1.5
  - Confidence: 92%
```

### Scenario 2: Medium Risk

```
Input:
  - Rainfall: 80 mm (sedang)
  - Temperature: 30°C (normal)

Output:
  - Risk: "Risiko Sedang"
  - SPI: -0.3
  - Confidence: 85%
```

### Scenario 3: Low Risk

```
Input:
  - Rainfall: 200 mm (tinggi)
  - Temperature: 28°C (normal)

Output:
  - Risk: "Risiko Rendah"
  - SPI: 2.1
  - Confidence: 98%
```

---

## 📞 Support & Resources

### Documentation
- Backend: `BACKEND_README.md`
- Setup: `SETUP_GUIDE.md`
- Frontend: `Drought_Prediction-main/FRONTEND_SETUP.md`

### API Documentation (Live)
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Testing
```bash
python test_api.py
```

---

## ✅ Verification Checklist

- [ ] Backend running: `python main_api.py` ✓
- [ ] Frontend running: `npm run dev` ✓
- [ ] Can access Swagger UI: http://localhost:8000/docs ✓
- [ ] Can access frontend: http://localhost:5173 ✓
- [ ] Prediction works end-to-end ✓
- [ ] Result shows correct risk level ✓
- [ ] No console errors ✓

---

**Backend & Frontend Integration Complete! 🎉**

Sistem prediksi risiko kekeringan Anda sudah siap untuk digunakan!
