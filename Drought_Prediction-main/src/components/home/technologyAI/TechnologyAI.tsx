import { Brain, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

import styles from './TechnologyAI.module.css';

export function TechnologyAI() {
  return (
    <section id="teknologi-ai" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Teknologi AI yang Digunakan
          </h2>

          <p className={styles.subtitle}>
            Menggunakan algoritma pembelajaran mesin canggih untuk prediksi
            yang akurat dan real-time
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left */}
          <div className={styles.imageWrapper}>
            <div className={styles.imageCard}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ5MDY1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Neural Network Technology"
                className={styles.image}
              />
            </div>

            {/* Floating Badge */}
            <div className={styles.badge}>
              <div className={styles.badgeContent}>
                <Brain className={styles.badgeIcon} />
                <span>AI Powered</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className={styles.content}>
            {/* Card */}
            <div className={styles.techCard}>
              <div className={styles.techCardInner}>
                <div className={styles.iconWrapper}>
                  <TrendingUp className={styles.icon} />
                </div>

                <div>
                  <h3 className={styles.cardTitle}>
                    Random Forest
                  </h3>

                  <p className={styles.cardDescription}>
                    Algoritma ensemble learning yang menggabungkan
                    multiple decision trees untuk meningkatkan akurasi
                    prediksi risiko kekeringan berdasarkan data historis
                    dan parameter cuaca.
                  </p>

                  <div className={styles.tagContainer}>
                    <span className={styles.tag}>
                      Akurasi Tinggi
                    </span>

                    <span className={styles.tag}>
                      Anti Overfitting
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValueBlue}>150+</div>
                <div className={styles.statLabel}>Wilayah</div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statValueGreen}>
                  10 Tahun
                </div>
                <div className={styles.statLabel}>
                  Data Training
                </div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statValueBlue}>94.88%</div>
                <div className={styles.statLabel}>Akurasi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}