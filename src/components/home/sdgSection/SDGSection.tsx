import { Target, Users, Leaf } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

import styles from './SDGSection.module.css';

export function SDGSection() {
  return (
    <section id="sdg" className={styles.section}>
      <div className={styles.container}>
        {/* MAIN HERO */}
        <div className={styles.hero}>
          {/* Background decorations */}
          <div className={styles.bgCircle1} />
          <div className={styles.bgCircle2} />

          <div className={styles.heroGrid}>
            {/* LEFT */}
            <div className={styles.left}>
              <div className={styles.badge}>
                <Target className={styles.badgeIcon} />
                <span>Sustainable Development Goals</span>
              </div>

              <h2 className={styles.title}>
                Mendukung SDG 13 – Climate Action
              </h2>

              <p className={styles.subtitle}>
                Platform AI Drought Monitor berkontribusi langsung terhadap
                pencapaian SDGs khususnya SDG 13 tentang aksi iklim  dengan menyediakan teknologi prediksi dan mitigasi kekeringan yang akurat.
              </p>

              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.iconBox}>
                    <Target className={styles.icon} />
                  </div>
                  <div>
                    <div className={styles.itemTitle}>Target 13.1</div>
                    <p className={styles.itemDesc}>
                      Memperkuat ketahanan dan kapasitas adaptasi terhadap bahaya iklim
                    </p>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.iconBox}>
                    <Users className={styles.icon} />
                  </div>
                  <div>
                    <div className={styles.itemTitle}>Target 13.3</div>
                    <p className={styles.itemDesc}>
                      Meningkatkan pendidikan dan kapasitas mitigasi perubahan iklim
                    </p>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.iconBox}>
                    <Leaf className={styles.icon} />
                  </div>
                  <div>
                    <div className={styles.itemTitle}>Dampak Lingkungan</div>
                    <p className={styles.itemDesc}>
                      Mengurangi emisi karbon melalui optimalisasi penggunaan sumber daya air
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className={styles.right}>
              <div className={styles.imageCard}>
                <div className={styles.imageWrapper}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1578589318274-02854f68813e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                    alt="Earth Climate"
                    className={styles.image}
                  />
                </div>
              </div>

              {/* floating badge */}
              <div className={styles.floatingBadge}>
                <div className={styles.circle}>13</div>
                <div className={styles.badgeText}>SDG 13</div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom cards */}
        <div className={styles.bottomGrid}>
          <div className={styles.bottomCard}>
            <h3>SDG 2</h3>
            <p>Zero Hunger - Meningkatkan ketahanan pangan melalui manajemen air yang lebih baik</p>
          </div>

          <div className={styles.bottomCard}>
            <h3>SDG 6</h3>
            <p>Clean Water - Optimalisasi penggunaan sumber daya air bersih</p>
          </div>

          <div className={styles.bottomCard}>
            <h3>SDG 15</h3>
            <p>Life on Land - Perlindungan ekosistem darat dari degradasi lahan</p>
          </div>
        </div>
      </div>
    </section>
  );
}