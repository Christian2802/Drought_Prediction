import { useState } from 'react';
import { CloudRain, Thermometer } from 'lucide-react';
import styles from './PredictPage.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function PredictPage() {
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState('');

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
      const rain = Number(rainfall);
      const temp = Number(temperature);

      // Validate input
      if (!rainfall || !temperature) {
        setError('Harap isi semua input');
        setLoading(false);
        return;
      }

      if (rain < 0 || temp < -50 || temp > 60) {
        setError('Input tidak valid. Silakan cek kembali');
        setLoading(false);
        return;
      }

      // Call backend API
      const response = await fetch(`${API_BASE_URL}/predict/quick?rainfall=${rain}&temperature=${temp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
            {/* Curah Hujan */}
            <div className={styles.inputGroup}>
              <label>
                <CloudRain size={18} />
                Curah Hujan (mm)
              </label>

              <input
                type="number"
                placeholder="Contoh: 120"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
              />
            </div>

            {/* Suhu */}
            <div className={styles.inputGroup}>
              <label>
                <Thermometer size={18} />
                Suhu (°C)
              </label>

              <input
                type="number"
                placeholder="Contoh: 33"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              className={styles.predictButton}
              onClick={handlePredict}
              disabled={loading || !rainfall || !temperature}
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