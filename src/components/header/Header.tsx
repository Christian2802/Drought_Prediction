import { CloudRain } from 'lucide-react';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.inner}>

          <div className={styles.logoWrapper}>
            <div className={styles.logoBox}>
              <CloudRain size={24} color="white" />
            </div>
            <span className={styles.logoText}>
              AI Drought Monitor
            </span>
          </div>

          <nav className={styles.nav}>
            <a href="/#dashboard" className={styles.link}>Dashboard</a>
            <a href="/#data-sources" className={styles.link}>Data Sources</a>
            <a href="/#teknologi-ai" className={styles.link}>Teknologi AI</a>
            <a href="/#mitigasi" className={styles.link}>Mitigasi</a>
            <a href="/#sdg" className={styles.link}>SDG</a>
            <a href="/predict" className={styles.link}>Uji Prediksi</a>
          </nav>

        </div>
      </div>
    </header>
  );
}