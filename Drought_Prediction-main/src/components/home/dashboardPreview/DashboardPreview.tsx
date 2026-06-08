import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection, Feature, Polygon } from 'geojson';

import styles from './DashboardPreview.module.css';

interface DroughtFeatureProperties {
  region_name?: string;
  risk?: 'low' | 'medium' | 'high';
}

interface MarkerData {
  lat: number;
  lng: number;
  region_name: string;
  risk: 'low' | 'medium' | 'high';
}

export function DashboardPreview() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // Calculate centroid of polygon
  const calculateCentroid = (coordinates: number[][][]): [number, number] => {
    let minLat = Infinity, maxLat = -Infinity;
    let minLng = Infinity, maxLng = -Infinity;

    coordinates[0].forEach(([lng, lat]) => {
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    });

    return [
      (minLat + maxLat) / 2,
      (minLng + maxLng) / 2
    ];
  };

  useEffect(() => {
    fetch('/data/drought_risk.geojson')
      .then((res) => res.json())
      .then((data: FeatureCollection) => {
        console.log('GeoJSON Loaded:', data);
        
        const markerList = data.features
          .filter((feature): feature is Feature<Polygon> => feature.geometry.type === 'Polygon')
          .map((feature: Feature) => {
            const props = feature.properties as DroughtFeatureProperties;
            const coords = feature.geometry.coordinates;
            const [lat, lng] = calculateCentroid(coords);

            return {
              lat,
              lng,
              region_name: props?.region_name ?? 'Wilayah',
              risk: props?.risk ?? 'low',
            };
          });

        setMarkers(markerList);
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

                  {markers.map((marker, idx) => (
                    <CircleMarker
                      key={idx}
                      center={[marker.lat, marker.lng]}
                      radius={3.5}
                      fillColor={riskColor(marker.risk)}
                      color={riskColor(marker.risk)}
                      weight={2}
                      opacity={0.8}
                      fillOpacity={0.9}
                    >
                      <Popup>
                        <strong>{marker.region_name}</strong>
                        <br />
                        Tingkat Risiko: <strong>{marker.risk}</strong>
                      </Popup>
                    </CircleMarker>
                  ))}
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