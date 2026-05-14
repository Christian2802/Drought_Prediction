import React, { useState } from 'react';
import styles from './ImageWithFallback.module.css';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4K';

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [didError, setDidError] = useState(false);

  const { src, alt = '', className = '', ...rest } = props;

  if (didError) {
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <div className={styles.fallback}>
          <img
            src={ERROR_IMG_SRC}
            alt="Error loading image"
            className={styles.fallbackIcon}
            {...rest}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        onError={() => setDidError(true)}
        {...rest}
      />
    </div>
  );
}