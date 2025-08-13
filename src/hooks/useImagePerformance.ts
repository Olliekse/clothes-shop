import { useEffect, useRef } from "react";

interface ImagePerformanceMetrics {
  loadTime: number;
  imageSize: number;
  isCached: boolean;
}

export function useImagePerformance(src: string) {
  const metricsRef = useRef<ImagePerformanceMetrics | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!src) return;

    startTimeRef.current = performance.now();

    const img = new Image();

    img.onload = () => {
      const loadTime = performance.now() - startTimeRef.current;

      // Check if image was cached
      const isCached = loadTime < 50; // Very fast loads are usually cached

      metricsRef.current = {
        loadTime,
        imageSize: 0, // We can't get actual file size from client side
        isCached,
      };

      // Log performance metrics in development
      if (process.env.NODE_ENV === "development") {
        console.log(`Image loaded: ${src}`, {
          loadTime: `${loadTime.toFixed(2)}ms`,
          isCached,
          url: src,
        });
      }
    };

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return metricsRef.current;
}
