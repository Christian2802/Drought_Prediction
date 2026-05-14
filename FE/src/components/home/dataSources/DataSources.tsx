import {
  Cloud,
  Satellite,
  Leaf,
  Database,
  type LucideIcon,
} from 'lucide-react';

import styles from './DataSources.module.css';

interface SourceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

export function DataSources() {
  const sources: SourceItem[] = [
    {
      icon: Cloud,
      title: 'Data Meteorologi dan Iklim',
      description:
        'Kami menggunakan data suhu udara, kelembaban relatif, dan curah hujan dari Badan Meteorologi Klimatologi dan Geofisika (BMKG). Data ini memberikan gambaran yang jelas tentang kondisi cuaca yang mempengaruhi kekeringan.',
      color: 'blue',
    },
    {
      icon: Satellite,
      title: 'Sumber Data Satelit',
      description:
        'Kami juga memanfaatkan citra satelit real-time untuk memonitor kondisi atmosfer dan melihat dampak perubahan iklim terhadap kekeringan. Data ini termasuk indeks vegetasi (NDVI) yang membantu memantau kesehatan tanaman dan lahan.',
      color: 'purple',
    },
    {
      icon: Leaf,
      title: 'Data Kejadian Kekeringan (SPI & DDD)',
      description:
        'Dengan menggunakan Standardized Precipitation Index (SPI) dan Cumulative Dry Days, kami dapat memantau dan menganalisis kekeringan berdasarkan akumulasi curah hujan dan jumlah hari kering.',
      color: 'green',
    },
    {
      icon: Database,
      title: 'Sensor IoT dan Stasiun Cuaca Lokal',
      description:
        'Data tambahan dari sensor IoT dan stasiun cuaca lokal memberi informasi langsung tentang kelembaban tanah dan kecepatan angin.',
      color: 'orange',
    },
  ];

  return (
    <section id="data-sources" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sumber Data Terpercaya</h2>

          <p className={styles.subtitle}>
            Kami mengintegrasikan berbagai sumber data untuk memberikan
            prediksi yang akurat dan komprehensif.
          </p>
        </div>

        <div className={styles.grid}>
          {sources.map((source, index) => {
            const Icon = source.icon;

            return (
              <div
                key={index}
                className={`${styles.card} ${styles[source.color]}`}
              >
                <div
                  className={`${styles.iconWrapper} ${styles[`${source.color}IconBg`]}`}
                >
                  <Icon
                    className={`${styles.icon} ${styles[`${source.color}Icon`]}`}
                  />
                </div>

                <h3 className={styles.cardTitle}>{source.title}</h3>

                <p className={styles.cardDescription}>
                  {source.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}