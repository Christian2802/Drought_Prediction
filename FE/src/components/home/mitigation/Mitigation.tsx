import { Droplets, AlertTriangle, AlertOctagon } from 'lucide-react';
import styles from './Mitigation.module.css';

export function Mitigation() {
  return (
    <section id="mitigasi" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Rekomendasi Mitigasi Kekeringan
          </h2>

          <p className={styles.subtitle}>
            Panduan tindakan berdasarkan tingkat risiko kekeringan di wilayah Anda
          </p>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {/* LOW */}
          <div className={`${styles.card} ${styles.low}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.lowIconBox}`}>
                <Droplets className={styles.icon} />
              </div>

              <span className={`${styles.badge} ${styles.lowBadge}`}>
                Risiko Rendah
              </span>
            </div>

            <p className={styles.desc}>
              Kondisi air cukup, fokus pada pemeliharaan sistem
            </p>

            <h4 className={styles.listTitle}>
              Langkah yang Harus Dilakukan:
            </h4>

            <ul className={styles.list}>
              <li>Monitoring rutin kondisi tanah dan sumber air</li>
              <li>Periksa dan rawat sistem irigasi secara berkala</li>
              <li>Konservasi air sebagai pencegahan</li>
              <li>Rotasi tanaman terencana</li>
            </ul>
          </div>

          {/* MEDIUM */}
          <div className={`${styles.card} ${styles.medium}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.mediumIconBox}`}>
                <AlertTriangle className={styles.icon} />
              </div>

              <span className={`${styles.badge} ${styles.mediumBadge}`}>
                Risiko Sedang
              </span>
            </div>

            <p className={styles.desc}>
              Waspadai penurunan ketersediaan air, mulai tindakan preventif
            </p>

            <h4 className={styles.listTitle}>
              Langkah yang Harus Dilakukan:
            </h4>

            <ul className={styles.list}>
              <li>Kurangi penggunaan air 20–30%</li>
              <li>Prioritaskan tanaman utama</li>
              <li>Gunakan mulsa organik</li>
              <li>Siapkan sumber air cadangan</li>
            </ul>
          </div>

          {/* HIGH */}
          <div className={`${styles.card} ${styles.high}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.highIconBox}`}>
                <AlertOctagon className={styles.icon} />
              </div>

              <span className={`${styles.badge} ${styles.highBadge}`}>
                Risiko Tinggi
              </span>
            </div>

            <p className={styles.desc}>
              Kekeringan kritis, tindakan darurat diperlukan segera
            </p>

            <h4 className={styles.listTitle}>
              Langkah yang Harus Dilakukan:
            </h4>

            <ul className={styles.list}>
              <li>Aktifkan irigasi darurat</li>
              <li>Prioritaskan tanaman penting</li>
              <li>Koordinasi dengan BPBD</li>
              <li>Ajukan bantuan/asuransi pertanian</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}