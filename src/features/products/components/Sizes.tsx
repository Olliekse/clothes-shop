interface SizesProps {
  sizes: (string | null)[];
}

function Sizes({ sizes }: SizesProps) {
  // Filter out null values and ensure all values are strings
  const validSizes = sizes
    .filter((size): size is string => size !== null)
    .map((size) => String(size).toUpperCase());

  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];
  const sortedSizes = validSizes.sort(
    (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
  );

  return (
    <>
      <p className="text-sm text-neutral-500 pb-[16px]">Available sizes</p>
      <div className="flex gap-[16px] flex-wrap">
        {sortedSizes.map((size) => (
          <div
            key={size}
            className="w-16 flex justify-center items-center gap-1.5 bg-white px-5 py-3 rounded border border-solid border-neutral-200"
          >
            {size}
          </div>
        ))}
      </div>
    </>
  );
}

export default Sizes;
