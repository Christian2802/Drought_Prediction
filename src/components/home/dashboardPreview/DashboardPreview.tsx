import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection } from 'geojson';

import styles from './DashboardPreview.module.css';

interface DroughtFeatureProperties {
  region_name?: string;
  risk?: 'low' | 'medium' | 'high';
}

export function DashboardPreview() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch('/data/drought_risk.geojson')
      .then((res) => res.json())
      .then((data: FeatureCollection) => {
        console.log('GeoJSON Loaded:', data);
        setGeojson(data);
      })
      .catch((err) => console.error('Error loading GeoJSON:', err));
  }, []);

  const riskColor = (risk?: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low':
        return '#22c55e';
      case 'medium':
        return '#eab308';
      case 'high':
        return '#ef4444';
      default:
        return '#9ca3af';
    }
  };

  return (
    <section id="dashboard" className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Dashboard Monitoring Kekeringan</h2>
          <p className={styles.subtitle}>
            Visualisasi peta risiko kekeringan berbasis model AI dan data
            historis
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.mapWrapper}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Peta Risiko Kekeringan</h3>

              <div className={styles.mapContainer}>
                <MapContainer
                  center={[-2.5, 118]}
                  zoom={5}
                  className={styles.map}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  {geojson && (
                    <GeoJSON
                      data={geojson}
                      pane="overlayPane"
                      style={(feature) => {
                        const props =
                          feature?.properties as DroughtFeatureProperties;

                        const color = riskColor(props?.risk);

                        return {
                          color,
                          fillColor: color,
                          fillOpacity: 0.75,
                          weight: 1,
                        };
                      }}
                      onEachFeature={(feature, layer) => {
                        const props =
                          feature?.properties as DroughtFeatureProperties;

                        layer.bindPopup(`
                          <strong>${props?.region_name ?? 'Wilayah'}</strong><br/>
                          Tingkat Risiko: ${props?.risk ?? 'N/A'}
                        `);
                      }}
                    />
                  )}
                </MapContainer>
                
                <div className={styles.legendCard}>
                    <h4 className={styles.legendTitle}>Legenda Risiko</h4>

                    <div className={styles.legendContainer}>
                        <div className={styles.legendItem}>
                            <div
                                className={styles.legendColor}
                                style={{ backgroundColor: '#22c55e' }}
                            />

                            <span className={styles.legendText}>
                                Risiko Rendah
                            </span>
                        </div>

                        <div className={styles.legendItem}>
                            <div
                                className={styles.legendColor}
                                style={{ backgroundColor: '#eab308' }}
                            />

                            <span className={styles.legendText}>
                                Risiko Sedang
                            </span>
                        </div>

                        <div className={styles.legendItem}>
                            <div
                                className={styles.legendColor}
                                style={{ backgroundColor: '#ef4444' }}
                            />

                            <span className={styles.legendText}>
                                Risiko Tinggi
                            </span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}