# 🌧️ Drought Risk Prediction System

Sistem prediksi risiko kekeringan menggunakan Machine Learning (Random Forest) dengan Frontend React dan Backend FastAPI.

---

## ⚡ Quick Start (5 Minutes)

### 1. Backend Setup

```bash
cd <project-root>
pip install -r requirements.txt
python main_api.py
```

✅ Backend running at: http://localhost:8000

### 2. Frontend Setup (New Terminal)

```bash
cd Drought_Prediction-main
npm install
npm run dev
```

✅ Frontend running at: http://localhost:5173

### 3. Test (Optional - New Terminal)

```bash
python test_api.py
```

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Backend setup lengkap |
| [BACKEND_README.md](BACKEND_README.md) | API documentation |
| [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) | Frontend-Backend integration |
| [Drought_Prediction-main/FRONTEND_SETUP.md](Drought_Prediction-main/FRONTEND_SETUP.md) | Frontend development |

---

## 🏗️ Architecture

```
Frontend (React)          Backend (FastAPI)       ML Model
────────────────         ──────────────────      ────────
http://5173              http://8000
   │                         │                       │
   ├─ PredictPage     ──────►├─ /predict/quick   ───┤
   │  (Input form)           │  /predict          │  Random
   │  (Result display)       │  /stats/*          │  Forest
   │                         │  /history          │  Model
   │                         │                    │
   │                    ◄────┤ Response JSON   ◄──┤
   └─ Display Result    (risk, spi, score)        │
                             │
                        SQLite DB
                       (history)
```

---

## 🔌 API Endpoints

### Quick Predict (for Frontend)
```
POST /predict/quick?rainfall=100&temperature=32
```

Response:
```json
{
  "risk": "Risiko Rendah",
  "spi": 1.234,
  "risk_score": 0.95
}
```

### Full Predict (Advanced)
```
POST /predict
```

See [BACKEND_README.md](BACKEND_README.md) for details.

---

## 📊 Risk Levels

| Level | SPI Range | Color | Status |
|-------|-----------|-------|--------|
| **Risiko Rendah** | SPI > 0 | 🟢 | Kondisi basah |
| **Risiko Sedang** | -1 < SPI ≤ 0 | 🟡 | Potensi kekeringan |
| **Risiko Tinggi** | SPI ≤ -1 | 🔴 | Risiko tinggi |

---

## 🧪 Testing

### Automated Tests
```bash
python test_api.py
```

### API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Manual Testing
Open http://localhost:5173 and try the form

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS Error | Backend running? Check .env VITE_API_URL |
| 404 Not Found | Model files exist? Run Main.ipynb first |
| Connection Refused | Backend not running? `python main_api.py` |
| Model Not Found | Generate model from Main.ipynb |

---

## 📁 Key Files

```
├── main_api.py              # FastAPI server
├── database.py              # SQLite config
├── prediction_service.py    # ML model wrapper
├── models/
│   └── rf_drought_model.pkl # Trained model
├── Drought_Prediction-main/ # React frontend
│   └── src/pages/predictPage/PredictPage.tsx
└── requirements.txt         # Python dependencies
```

---

## 🎯 Features

✅ Real-time drought risk prediction  
✅ Simple web interface  
✅ ML-based classification  
✅ History tracking  
✅ REST API for external integration  
✅ Swagger/ReDoc documentation  
✅ Automated testing suite  

---

## 📚 More Information

- **Backend**: See [BACKEND_README.md](BACKEND_README.md)
- **Setup**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Integration**: See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
- **Frontend**: See [Drought_Prediction-main/FRONTEND_SETUP.md](Drought_Prediction-main/FRONTEND_SETUP.md)

---

## 🚀 Production Deployment

1. Build frontend: `npm run build` (outputs to `dist/`)
2. Deploy dist/ to web server
3. Update `.env` with production API URL
4. Deploy backend to production server
5. Setup SSL/HTTPS

---

**System Ready! 🎉**

Sistem prediksi kekeringan Anda sudah lengkap dan siap digunakan.
