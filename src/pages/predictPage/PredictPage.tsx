import { useState } from 'react';
import { CloudRain, Thermometer, Wind, Sun } from 'lucide-react';
import styles from './PredictPage.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function PredictPage() {
  // Only the core model features (as requested)
  const [tn, setTn] = useState('');
  const [tx, setTx] = useState('');
  const [tavg, setTavg] = useState('');
  const [rhAvg, setRhAvg] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [ss, setSs] = useState('');
  const [ffX, setFfX] = useState('');
  const [dddCar, setDddCar] = useState('N');

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
      // Build payload using only requested features
      const payload = {
        station_id: 'WEB',
        station_name: 'Web Client',
        region_name: 'Unknown',
        tn: Number(tn),
        tx: Number(tx),
        tavg: Number(tavg),
        rh_avg: Number(rhAvg),
        precipitation: Number(precipitation),
        ss: Number(ss),
        ff_x: Number(ffX),
        ddd_car: dddCar || 'N',
      };

      // Validate numeric inputs
      const numericFields = ['tn', 'tx', 'tavg', 'rh_avg', 'precipitation', 'ss', 'ff_x'];
      for (const f of numericFields) {
        if (isNaN(payload[f as keyof typeof payload] as number)) {
          setError('Harap isi semua field numerik (tn, tx, tavg, rh_avg, precipitation, ss, ff_x) dengan benar');
          setLoading(false);
          return;
        }
      }

      // Call backend API (/predict expects JSON body)
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Prediksi gagal');
      }

      const data = await response.json();

      // Backend returns risk as 'low'|'medium'|'high' — convert to Indonesian labels
      const riskMap: Record<string, string> = { low: 'Risiko Rendah', medium: 'Risiko Sedang', high: 'Risiko Tinggi' };
      const riskLabel = typeof data.risk === 'string' ? (riskMap[data.risk] ?? data.risk) : data.risk;

      setResult(riskLabel);
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
            {/* Core features (only these fields) */}
            <div className={styles.inputGroup}>
              <label>
                <Thermometer size={18} />
                Min temperature
              </label>
              <input type="number" placeholder="Contoh: 22" value={tn} onChange={(e) => setTn(e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label>Max temperature</label>
              <input type="number" placeholder="Contoh: 35" value={tx} onChange={(e) => setTx(e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label>Avg temperature</label>
              <input type="number" placeholder="Contoh: 28" value={tavg} onChange={(e) => setTavg(e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label>Relative humidity</label>
              <input type="number" placeholder="Contoh: 75" value={rhAvg} onChange={(e) => setRhAvg(e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label>
                <CloudRain size={18} />
                Curah hujan
              </label>
              <input type="number" placeholder="Contoh: 120" value={precipitation} onChange={(e) => setPrecipitation(e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label>
                <Sun size={18} />
                Sunshine duration
              </label>
              <input type="number" placeholder="Contoh: 6" value={ss} onChange={(e) => setSs(e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label>
                <Wind size={18} />
                Max wind speed
              </label>
              <input type="number" placeholder="Contoh: 5" value={ffX} onChange={(e) => setFfX(e.target.value)} />
            </div>

            <div className={styles.inputGroup}>
              <label>Wind direction</label>
              <input type="text" placeholder="N, NE, E, etc" value={dddCar} onChange={(e) => setDddCar(e.target.value)} />
            </div>

            {/* removed station and location inputs per request */}

            {/* Button */}
            <button
              className={styles.predictButton}
              onClick={handlePredict}
              disabled={
                loading || !tn || !tx || !tavg || !rhAvg || !precipitation || !ss || !ffX || !dddCar
              }
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