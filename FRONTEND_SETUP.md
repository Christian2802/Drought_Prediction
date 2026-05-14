# Frontend Setup Guide

Dokumentasi setup frontend React dengan Backend FastAPI.

## 🚀 Quickstart

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Buat file `.env` di root folder:

```bash
cp .env.example .env
```

Edit `.env` sesuai dengan backend URL:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### 4. Pastikan Backend Running

Di terminal lain, jalankan backend:

```bash
cd ..
python main_api.py
```

Backend akan berjalan di `http://localhost:8000`

---

## 🔌 API Integration

### Endpoint yang Digunakan

#### Quick Prediction (Main)
```
POST /predict/quick?rainfall={mm}&temperature={°C}
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

#### Full Prediction (Advanced)
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

### Environment Variable

Backend URL dikonfigurasi via `import.meta.env.VITE_API_URL`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

---

## 📦 Build untuk Production

### 1. Build Application

```bash
npm run build
```

Output akan di folder `dist/`

### 2. Preview Build

```bash
npm run preview
```

### 3. Deploy

Deploy folder `dist/` ke web server Anda.

Update `.env` production:

```env
VITE_API_URL=https://api.yourdomain.com
```

---

## 🧪 Testing API

### Menggunakan Browser DevTools

1. Buka frontend di `http://localhost:5173`
2. Buka DevTools (F12)
3. Tab Network
4. Input data di form
5. Click "Prediksi Sekarang"
6. Lihat request/response di Network tab

### Menggunakan Postman

1. Buka Postman
2. POST request ke `http://localhost:8000/predict/quick?rainfall=100&temperature=32`
3. Check response

### Menggunakan cURL

```bash
curl -X POST "http://localhost:8000/predict/quick?rainfall=100&temperature=32" \
  -H "Content-Type: application/json"
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS Error | Pastikan backend running dan CORS enabled |
| 404 Not Found | Check API_BASE_URL di .env |
| Connection Refused | Backend belum running, jalankan `python main_api.py` |
| Slow Response | Backend mungkin sedang load model, tunggu beberapa detik |

---

## 📁 Project Structure

```
Drought_Prediction-main/
├── src/
│   ├── pages/
│   │   └── predictPage/
│   │       ├── PredictPage.tsx      # Main prediction component
│   │       └── PredictPage.module.css
│   ├── App.tsx
│   └── main.tsx
├── .env.example                      # Environment config template
├── .env                              # Environment config (gitignored)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔑 Key Components

### PredictPage.tsx

Main component untuk prediksi:

- Input: rainfall (mm), temperature (°C)
- Output: risk level, SPI, confidence score
- Error handling dan loading state

**Data Flow:**

```
User Input → handlePredict() → API Call (/predict/quick)
             ↓
         Display Result ← Response {risk, spi, score}
```

---

## 🎨 Styling

Menggunakan CSS Modules:

- `.low` - Risk rendah (warna hijau)
- `.medium` - Risk sedang (warna kuning)
- `.high` - Risk tinggi (warna merah)

---

## 📖 More Info

- Backend Documentation: `../BACKEND_README.md`
- Setup Guide: `../SETUP_GUIDE.md`
- API Testing: `python ../test_api.py`

---

**Frontend Ready! 🎉**
