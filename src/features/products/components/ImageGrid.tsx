import { useEffect, useState } from "react";

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

  const filteredImages = selectedColor
    ? images.filter((image) => image.color === selectedColor)
    : images;

  useEffect(() => {
    if (filteredImages.length > 0) {
      setMainImage(filteredImages[0].image_url);
    }
  }, [selectedColor, filteredImages]);

  const thumbnailImages = filteredImages.slice(1, 5);

  return (
    <div className="flex flex-col gap-[26px] min-[375px]:pt-[48px] min-[375px]:pb-[50px] min-[375px]:px-[16px] min-[768px]:pt-[64px] min-[1440px]:py-[96px] min-[1440px]:p-0">
      {mainImage && (
        <img
          className="min-[375px]:h-[400px] min-[375px]:w-[311px] object-cover rounded-md min-[768px]:w-[704px] min-[768px]:h-[800px] min-[1440px]:h-[800px] min-[1440px]:w-[592px]"
          src={mainImage}
          alt="Main product image"
        />
      )}
      <div className="flex flex-row gap-[16px] overflow-scroll">
        {thumbnailImages.map((image, index) => (
          <img
            key={index}
            className="cursor-pointer object-cover min-[375px]:h-[120px] rounded-md min-[768px]:h-[190px] flex-shrink-0 min-[768px]:w-[188px] min-[375px]:w-[80px] min-[1440px]:h-[190px] min-[1440px]:w-[160px]"
            src={image.image_url}
            alt={`Product thumbnail ${index + 1}`}
            onClick={() => setMainImage(image.image_url)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
