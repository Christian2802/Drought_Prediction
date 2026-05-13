import { useState } from 'react';
import { CloudRain, Thermometer } from 'lucide-react';
import styles from './PredictPage.module.css';

export function PredictPage() {
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState('');

  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);

    try {
      // simulasi request API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const rain = Number(rainfall);
      const temp = Number(temperature);

      let prediction = 'Risiko Rendah';

      if (rain < 100 && temp > 32) {
        prediction = 'Risiko Tinggi';
      } else if (rain < 150) {
        prediction = 'Risiko Sedang';
      }

      setResult(prediction);
    } catch (error) {
      console.error(error);
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
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Prediksi Sekarang'}
            </button>

            {/* Result */}
            {result && (
              <div className={`${styles.resultBox} ${getResultClass()}`}>
                <h3>Hasil Prediksi</h3>
                <p>{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}