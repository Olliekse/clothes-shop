interface ImageGridProps {
  images: Array<{
    product_id: string;
    color: string;
    image_url: string;
  }>;
}

function ImageGrid({ images }: ImageGridProps) {
  const mainImage = images[0]?.image_url;
  const thumbnailImages = images.slice(1, 5);

  return (
    <div className="flex flex-col gap-[24px] min-[375px]:py-[48px] min-[375px]:px-[16px] min-[768px]:pt-[64px] min-[1440px]:py-[96px]">
      {mainImage && (
        <img
          className="min-[375px]:h-[400px] min-[375px]:w-[311px] object-cover rounded-md min-[768px]:w-[704px] min-[768px]:h-[800px]  min-[1440px]:h-[800px]"
          src={mainImage}
          alt="Main product image"
        />
      )}
      <div className="flex flex-row gap-[16px] overflow-hidden">
        {thumbnailImages.map((image, index) => (
          <img
            key={index}
            className="object-cover min-[375px]:h-[120px] rounded-md min-[768px]:h-[190px] flex-shrink-0 min-[768px]:w-[188px] min-[375px]:w-[80px] min-[1440px]:h-[190px] min-[1440px]:w-[160px]"
            src={image.image_url}
            alt={`Product thumbnail ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
