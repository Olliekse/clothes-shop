import React, { useEffect, useMemo, useState } from "react";

interface ImageGridProps {
  images: Array<{
    product_id: string;
    color: string;
    image_url: string;
  }>;
  selectedColor?: string | null;
}

function ImageGrid({ images, selectedColor }: ImageGridProps) {
  const [mainImage, setMainImage] = useState(images[0]?.image_url);

  const filteredImages = useMemo(() => {
    return selectedColor
      ? images.filter((image) => image.color === selectedColor)
      : images;
  }, [selectedColor, images]);

  useEffect(() => {
    if (filteredImages.length > 0) {
      setMainImage(filteredImages[0].image_url);
    }
  }, [selectedColor, filteredImages]);

  const thumbnailImages = filteredImages.slice(1, 5);

  return (
    <div className="flex flex-col gap-6 min-[375px]:pt-12 min-[375px]:pb-12 min-[375px]:px-4 md:pt-[64px] xl:py-[96px] xl:p-0">
      {mainImage && (
        <img
          className="min-[375px]:h-96 min-[375px]:w-80 object-cover rounded-md md:w-[704px] md:h-[800px] xl:h-[800px] xl:w-[592px]"
          src={mainImage}
          alt="Main product image"
        />
      )}
      <div className="flex flex-row gap-4 overflow-scroll">
        {thumbnailImages.map((image, index) => (
          <img
            key={index}
            className="cursor-pointer object-cover min-[375px]:h-28 rounded-md md:h-48 flex-shrink-0 md:w-48 min-[375px]:w-20 xl:h-[190px] xl:w-[160px]"
            src={image.image_url}
            alt={`Product thumbnail ${index + 1}`}
            onClick={() => setMainImage(image.image_url)}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(ImageGrid);
