import { useState } from 'react';
import { CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';
import styles from './PredictPage.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function PredictPage() {
  // Temperature inputs
  const [tn, setTn] = useState('');  // Min temperature
  const [tx, setTx] = useState('');  // Max temperature
  const [tavg, setTavg] = useState('');  // Avg temperature
  
  // Weather parameters
  const [rhAvg, setRhAvg] = useState('');  // Relative humidity
  const [precipitation, setPrecipitation] = useState('');  // Curah hujan
  const [ss, setSs] = useState('');  // Sunshine duration
  const [ffX, setFfX] = useState('');  // Max wind speed
  const [dddCar, setDddCar] = useState('N');  // Wind direction

  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [spi, setSpi] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Convert inputs to numbers
      const tnNum = Number(tn);
      const txNum = Number(tx);
      const tavgNum = Number(tavg);
      const rhAvgNum = Number(rhAvg);
      const precipitationNum = Number(precipitation);
      const ssNum = Number(ss);
      const ffXNum = Number(ffX);

      // Validate input - all fields required
      if (!tn || !tx || !tavg || !rhAvg || !precipitation || !ss || !ffX || !dddCar) {
        setError('Harap isi semua input');
        setLoading(false);
        return;
      }

      // Validate value ranges
      if (tnNum < -50 || tnNum > 60 || txNum < -50 || txNum > 60 || tavgNum < -50 || tavgNum > 60) {
        setError('Nilai temperatur tidak valid (-50°C s/d 60°C)');
        setLoading(false);
        return;
      }

      if (rhAvgNum < 0 || rhAvgNum > 100) {
        setError('Kelembaban harus 0-100%');
        setLoading(false);
        return;
      }

      if (precipitationNum < 0) {
        setError('Curah hujan tidak boleh negatif');
        setLoading(false);
        return;
      }

      if (ssNum < 0 || ssNum > 24) {
        setError('Durasi sinar matahari harus 0-24 jam');
        setLoading(false);
        return;
      }

      if (ffXNum < 0) {
        setError('Kecepatan angin tidak boleh negatif');
        setLoading(false);
        return;
      }

      // Call backend API with all parameters
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          station_id: 'TEST_001',
          station_name: 'Test Station',
          region_name: 'Test Region',
          tn: tnNum,
          tx: txNum,
          tavg: tavgNum,
          rh_avg: rhAvgNum,
          precipitation: precipitationNum,
          ss: ssNum,
          ff_x: ffXNum,
          ddd_car: dddCar,
          latitude: 0,
          longitude: 0
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Prediksi gagal');
      }

      const data = await response.json();
      
      // Set result from API response
      setResult(data.risk);
      setSpi(data.spi);
      setScore(data.risk_score);
      
    } catch (error) {
      console.error('Prediction error:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan. Cek apakah backend running di port 8000');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getResultClass = () => {
    if (result === 'Risiko Tinggi') return styles.high;
    if (result === 'Risiko Sedang') return styles.medium;
    return styles.low;
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <h1>Uji Prediksi Kekeringan</h1>

            <p>
              Masukkan parameter cuaca untuk melihat prediksi
              risiko kekeringan dari model AI.
            </p>
          </div>

          {/* Form */}
          <div className={styles.form}>
            {/* Temperature Section */}
            <div className={styles.section}>
              <h3>🌡️ Data Temperatur</h3>
              
              {/* Min Temperature */}
              <div className={styles.inputGroup}>
                <label>
                  <Thermometer size={18} />
                  Temperatur Minimum (°C)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 24"
                  value={tn}
                  onChange={(e) => setTn(e.target.value)}
                  step="0.1"
                />
              </div>

              {/* Max Temperature */}
              <div className={styles.inputGroup}>
                <label>
                  <Thermometer size={18} />
                  Temperatur Maksimum (°C)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 35"
                  value={tx}
                  onChange={(e) => setTx(e.target.value)}
                  step="0.1"
                />
              </div>

              {/* Avg Temperature */}
              <div className={styles.inputGroup}>
                <label>
                  <Thermometer size={18} />
                  Temperatur Rata-rata (°C)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 29"
                  value={tavg}
                  onChange={(e) => setTavg(e.target.value)}
                  step="0.1"
                />
              </div>
            </div>

            {/* Weather Parameters Section */}
            <div className={styles.section}>
              <h3>☁️ Parameter Cuaca</h3>

              {/* Relative Humidity */}
              <div className={styles.inputGroup}>
                <label>
                  <Droplets size={18} />
                  Kelembaban Relatif (%)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 75"
                  value={rhAvg}
                  onChange={(e) => setRhAvg(e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* Precipitation */}
              <div className={styles.inputGroup}>
                <label>
                  <CloudRain size={18} />
                  Curah Hujan (mm)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 120"
                  value={precipitation}
                  onChange={(e) => setPrecipitation(e.target.value)}
                  step="0.1"
                />
              </div>

              {/* Sunshine Duration */}
              <div className={styles.inputGroup}>
                <label>
                  ☀️ Durasi Sinar Matahari (jam)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 8"
                  value={ss}
                  onChange={(e) => setSs(e.target.value)}
                  min="0"
                  max="24"
                  step="0.1"
                />
              </div>

              {/* Max Wind Speed */}
              <div className={styles.inputGroup}>
                <label>
                  <Wind size={18} />
                  Kecepatan Angin Maksimum (m/s)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 5"
                  value={ffX}
                  onChange={(e) => setFfX(e.target.value)}
                  step="0.1"
                />
              </div>

              {/* Wind Direction */}
              <div className={styles.inputGroup}>
                <label>
                  <Wind size={18} />
                  Arah Angin Dominan
                </label>
                <select value={dddCar} onChange={(e) => setDddCar(e.target.value)}>
                  <option value="N">Utara (N)</option>
                  <option value="S">Selatan (S)</option>
                  <option value="E">Timur (E)</option>
                  <option value="W">Barat (W)</option>
                  <option value="NE">Timur Laut (NE)</option>
                  <option value="SE">Tenggara (SE)</option>
                  <option value="SW">Barat Daya (SW)</option>
                  <option value="NW">Barat Laut (NW)</option>
                </select>
              </div>
            </div>

            {/* Button */}
            <button
              className={styles.predictButton}
              onClick={handlePredict}
              disabled={loading || !tn || !tx || !tavg || !rhAvg || !precipitation || !ss || !ffX}
            >
              {loading ? 'Memproses...' : 'Prediksi Sekarang'}
            </button>

            {/* Error Message */}
            {error && (
              <div className={styles.errorBox}>
                <p>⚠️ {error}</p>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className={`${styles.resultBox} ${getResultClass()}`}>
                <h3>Hasil Prediksi</h3>
                <p className={styles.riskLevel}>{result}</p>
                
                {spi !== null && (
                  <div className={styles.details}>
                    <div className={styles.detail}>
                      <span>SPI:</span>
                      <strong>{spi.toFixed(4)}</strong>
                    </div>
                    <div className={styles.detail}>
                      <span>Confidence:</span>
                      <strong>{((score || 0) * 100).toFixed(1)}%</strong>
                    </div>
                  </div>
                )}
                
                <div className={styles.interpretation}>
                  <small>
                    {result === 'Risiko Tinggi' && 'SPI ≤ -1: Kondisi sangat kering dengan risiko kekeringan tinggi'}
                    {result === 'Risiko Sedang' && '-1 < SPI ≤ 0: Kondisi normal dengan potensi kekeringan'}
                    {result === 'Risiko Rendah' && 'SPI > 0: Kondisi basah, tidak ada risiko kekeringan'}
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}