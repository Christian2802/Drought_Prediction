import {
  CloudRain,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoBox}>
                <CloudRain size={24} color="white" />
              </div>
              <span className={styles.brandText}>
                AI Drought Monitor
              </span>
            </div>

            <p className={styles.description}>
              Platform prediksi risiko kekeringan berbasis AI untuk mendukung ketahanan iklim dan pembangunan berkelanjutan.
            </p>
          </div>

          <div>
            <h3 className={styles.title}>Quick Links</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <a className={styles.link} href="/#dashboard">Dashboard</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.link} href="/#data-sources">Data Sources</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.link} href="/#teknologi-ai">Teknologi AI</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.link} href="/#mitigasi">Mitigasi</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.link} href="/#sdg">SDG</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.link} href="/predict">Uji Prediksi</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.title}>Kontak</h3>

            <div className={styles.contactItem}>
              <Mail className={styles.icon} size={20} />
              <div>
                <div className={styles.contactLabel}>Email</div>
                <a className={styles.contactText}>
                  info@aidrought.id
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <Phone className={styles.icon} size={20} />
              <div>
                <div className={styles.contactLabel}>Telepon</div>
                <a className={styles.contactText}>
                  +62 21 1234 567
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <MapPin className={styles.icon} size={20} />
              <div>
                <div className={styles.contactLabel}>Alamat</div>
                <a className={styles.contactText}>
                    Jakarta, Indonesia
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomInner}>
            <p className={styles.bottomText}>
              © 2025 AI Drought Monitor. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}