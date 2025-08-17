import React, { useState, useEffect, useRef } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
}

function OptimizedImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  priority = false,
  sizes = "100vw",
  onClick,
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const preloadImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (priority && src) {
      preloadImgRef.current = new Image();
      const img = preloadImgRef.current;

      img.onload = () => {
        setImageLoaded(true);
        preloadImgRef.current = null;
      };

      img.onerror = () => {
        setImageError(true);
        preloadImgRef.current = null;
      };

      img.src = src;
    }

    return () => {
      if (preloadImgRef.current) {
        preloadImgRef.current.onload = null;
        preloadImgRef.current.onerror = null;
        preloadImgRef.current = null;
      }
    };
  }, [src, priority]);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setImageError(true);
  };

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [src]);

  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
        onClick={onClick}
      >
        <span className="text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`${className} ${imageLoaded ? "opacity-100" : "opacity-0"}`}
      loading={priority ? "eager" : loading}
      decoding="async"
      sizes={sizes}
      onLoad={handleLoad}
      onError={handleError}
      onClick={onClick}
      style={{
        transition: "opacity 0.2s ease-in-out",
        ...(onClick && { cursor: "pointer" }),
      }}
    />
  );
}

export default React.memo(OptimizedImage);
