import { useQuery } from "@tanstack/react-query";
import { dataService } from "../../../../api/dataService";

function Collections() {
  const {
    data: collections,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: () => dataService.getCollections(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading collections</div>;
  if (!collections || !collections.collections?.length) return null;

  // split collections into left + right groups
  const [leftCard, ...rightCards] = collections.collections;

  return (
    <div className="px-3 pb-12 md:pb-16 bg-white xl:px-[96px] xl:pb-[96px]">
      <h2 className="font-semibold text-3xl text-neutral-900 pb-[32px]">
        Our Collections
      </h2>

      <div className="flex flex-col md:flex-row gap-7">
        {/* Left big card */}
        <div className="flex-1 xl:w-[50%]">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={leftCard.image_url}
              alt={leftCard.name}
              className="w-84 xl:w-full h-[580px] rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-black/40 rounded-lg xl:w-full"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
              <h3 className="text-sm">{leftCard.name}</h3>
              <p className="font-medium text-lg">{leftCard.description}</p>
            </div>
          </div>
        </div>

        {/* Right stacked cards */}
        <div className="flex flex-col gap-7 flex-1 sm:mt-7 md:mt-0 xl:w[50%]">
          {rightCards.map((item) => (
            <div
              key={item.collection_id}
              className="relative rounded-lg overflow-hidden h-[337px] md:h-[276px]"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full rounded-lg object-cover md:w-[338px] md:h-[276px] xl:w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg md:h-[276px] md:w-[338px]  xl:w-full"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                <h3 className="text-sm">{item.name}</h3>
                <p className="font-medium text-lg">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collections;
