import { useEffect, useState, useMemo } from "react";
import Button from "../../../components/Button";
import { ProductGrid } from "../components/ProductGrid";
import { mockData } from "../../../api/mockData";
import ColorPicker from "../../../components/ColorPicker";
import { useQuery } from "@tanstack/react-query";
import { dataService } from "../../../api/dataService";
import { useMediaQuery } from "react-responsive";
import StarRating from "../../../components/StarRating";
import CustomCheckbox from "../../../components/CustomCheckbox";
import Header from "../components/Header/Header";

const sortingOptions = [
  "Newest",
  "Best rating",
  "Most popular",
  "Price: Low to high",
  "Price: High to low",
];

function Products() {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [activeSortBy, setActiveSortBy] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set()
  );
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [checkboxStates, setCheckboxStates] = useState({
    latestArrivals: false,
    urbanOasis: false,
    cozyComfort: false,
    freshFusion: false,
    unisex: false,
    women: false,
    men: false,
  });

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });

  // Function to toggle section collapse/expand
  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  // Use React Query instead of useEffect + fetch
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (import.meta.env.PROD) {
        return { products: mockData.products };
      }
      const response = await fetch("http://localhost:9000/products");
      const data = await response.json();
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });

  // Sorting function
  const sortProducts = (products: any[], sortOption: string) => {
    if (!products || products.length === 0) return products;

    const sortedProducts = [...products];

    switch (sortOption) {
      case "Newest":
        return sortedProducts.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });

      case "Best rating":
        return sortedProducts.sort((a, b) => {
          const productA = dataService.getProductAverageRating(a.product_id);
          const productB = dataService.getProductAverageRating(b.product_id);

          return productA - productB;
        });

      case "Most popular":
        return sortedProducts.sort((a, b) => {
          const productA = dataService.getProductInventory(a.product_id);
          const productB = dataService.getProductInventory(b.product_id);
          const sumSoldA = productA
            .map((item) => item.sold)
            .reduce((acc, curr) => (curr += acc), 0);
          const sumSoldB = productB
            .map((item) => item.sold)
            .reduce((acc, curr) => (curr += acc), 0);
          return sumSoldA - sumSoldB;
        });

      case "Price: Low to high":
        return sortedProducts.sort((a, b) => {
          const productA = dataService.getProductInventory(a.product_id);
          const productB = dataService.getProductInventory(b.product_id);
          const totalPriceA = productA
            .map((item) => item.list_price)
            .reduce((acc, curr) => (curr += acc), 0);
          const totalPriceB = productB
            .map((item) => item.list_price)
            .reduce((acc, curr) => (curr += acc), 0);
          return totalPriceA / productA.length - totalPriceB / productB.length;
        });

      case "Price: High to low":
        return sortedProducts.sort((a, b) => {
          const productA = dataService.getProductInventory(a.product_id);
          const productB = dataService.getProductInventory(b.product_id);
          const totalPriceA = productA
            .map((item) => item.list_price)
            .reduce((acc, curr) => (curr += acc), 0);
          const totalPriceB = productB
            .map((item) => item.list_price)
            .reduce((acc, curr) => (curr += acc), 0);
          return totalPriceB / productB.length - totalPriceA / productA.length;
        });
    }
  };

  const sortedProducts = useMemo(() => {
    if (!productsData?.products || !activeSortBy) {
      return productsData?.products || [];
    }
    return sortProducts(productsData.products, activeSortBy);
  }, [productsData?.products, activeSortBy]);

  function handleFilterClick() {
    setShowFilterMenu(!showFilterMenu);
  }

  const handleClickSort = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleClickSortOption = (option: string) => {
    setActiveSortBy(option);
    setDropDownOpen(!dropDownOpen);
  };

  // Function to fetch colors from the inventory API
  const fetchColors = async () => {
    try {
      if (import.meta.env.PROD) {
        // In production, use mock data consistently with the rest of the app
        const availableColors = getAvailableColorsFromProducts(
          mockData.products,
          mockData.inventory
        );
        setColors(availableColors.sort());
        return;
      }

      if (
        mockData.products &&
        mockData.inventory &&
        mockData.products.length > 0 &&
        mockData.inventory.length > 0
      ) {
        const availableColors = getAvailableColorsFromProducts(
          mockData.products,
          mockData.inventory
        );
        setColors(availableColors.sort());
        console.log("Using mock data colors:", availableColors.sort());
        return;
      }

      const [productsResponse, inventoryResponse] = await Promise.all([
        fetch("http://localhost:9000/products"),
        fetch("http://localhost:9000/inventory"),
      ]);

      const products = (await productsResponse.json()) as {
        products: Array<{ product_id: string }>;
      };
      const inventory = (await inventoryResponse.json()) as Array<{
        product_id: string;
        color: string;
      }>;

      const availableColors = getAvailableColorsFromProducts(
        products.products,
        inventory
      );
      setColors(availableColors.sort());
      console.log("Available colors from API:", availableColors.sort()); // Debug log
    } catch (error) {
      console.error("Error fetching colors:", error);

      if (
        mockData.products &&
        mockData.inventory &&
        mockData.products.length > 0 &&
        mockData.inventory.length > 0
      ) {
        const availableColors = getAvailableColorsFromProducts(
          mockData.products,
          mockData.inventory
        );
        setColors(availableColors.sort());
        console.log("Fallback to mock data colors:", availableColors.sort());
      }
    }
  };

  const getAvailableColorsFromProducts = (
    products: Array<{ product_id: string }>,
    inventory: Array<{ product_id: string; color: string }>
  ) => {
    const availableProductIds = new Set(
      products.map((product) => product.product_id)
    );
    console.log("Available product IDs:", Array.from(availableProductIds));

    const availableInventory = inventory.filter((item) =>
      availableProductIds.has(item.product_id)
    );
    console.log("Filtered inventory items:", availableInventory.length);

    const uniqueColors = [
      ...new Set(availableInventory.map((item) => item.color)),
    ];
    console.log("Available colors for products:", uniqueColors);

    return uniqueColors;
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        const newColors = prev.filter((c) => c !== color);
        console.log("Color deselected:", color, "Selected colors:", newColors);
        return newColors;
      } else {
        const newColors = [...prev, color];
        console.log("Color selected:", color, "Selected colors:", newColors);
        return newColors;
      }
    });
  };

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const handleCheckboxChange = (key: keyof typeof checkboxStates) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    if (showFilterMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showFilterMenu]);

  // Show loading state while products are loading
  if (productsLoading) {
    return <div className="pt-12 px-3 bg-white">Loading products...</div>;
  }

  return (
    <>
      <Header />
      <div className="pt-12 lg:p-[96px] px-3 bg-white overflow-y-auto">
        <div
          className={`flex ${!isDesktopOrLaptop ? "justify-between mb-8" : "justify-self-end justify-end w-[74%]"} relative`}
        >
          {!isDesktopOrLaptop && (
            <Button type="filter" onClick={handleFilterClick}>
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.25 0.444458V1.83335H12.5556L9.08333 7.04168V12.9445H4.91667V7.04168L1.44444 1.83335H0.75V0.444458H13.25ZM3.11368 1.83335L6.30556 6.62112V11.5556H7.69444V6.62112L10.8863 1.83335H3.11368Z"
                  fill="#171717"
                />
              </svg>
              Filter
            </Button>
          )}
          <Button onClick={handleClickSort} type="sort">
            {activeSortBy ? activeSortBy : "Sort by"}
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.99998 3.81347L8.43734 0.37616L9.41943 1.35825L4.99998 5.7777L0.580566 1.35825L1.56266 0.37616L4.99998 3.81347Z"
                fill="#171717"
              />
            </svg>
          </Button>
        </div>
        {dropDownOpen && (
          <div className="w-[170px] absolute top-[120px] right-[27px] flex flex-col gap-2 bg-white p-4 rounded-lg border border-solid border-neutral-200 justify-self-end">
            {sortingOptions.map((option) => (
              <button
                key={option}
                className={`w-full text-left ${option === activeSortBy ? "text-indigo-700" : "text-neutral-900"} cursor-pointer hover:bg-neutral-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1 transition-colors duration-200`}
                onClick={() => handleClickSortOption(option)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClickSortOption(option);
                  }
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Desktop Layout: Sidebar + Products */}
        {isDesktopOrLaptop ? (
          <div className="flex gap-16">
            {/* Filter Menu - Desktop Sidebar */}
            <div className="w-64 pb-6 pr-6 -mt-11 bg-white">
              {/* Filter Content */}
              <div className="pt-4 pr-4">
                <div
                  className={`flex justify-between items-center ${collapsedSections.has("Collections") ? "" : "pb-6"}`}
                >
                  <p className="font-medium text-base text-neutral-900">
                    Collections
                  </p>
                  <button
                    onClick={() => toggleSection("Collections")}
                    className="w-6 h-6 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1"
                    aria-label={`${collapsedSections.has("Collections") ? "Expand" : "Collapse"} Collections section`}
                  >
                    {collapsedSections.has("Collections") ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.1665 5.16669V0.166687H6.83317V5.16669H11.8332V6.83335H6.83317V11.8334H5.1665V6.83335H0.166504V5.16669H5.1665Z"
                          fill="#525252"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="12"
                        height="2"
                        viewBox="0 0 12 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
                          fill="#525252"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div
                  className={`flex flex-col gap-6 text-base text-neutral-600 pb-6 mb-6 border-b border-neutral-300 overflow-hidden transition-all duration-300 ease-in-out ${
                    collapsedSections.has("Collections")
                      ? "max-h-12 opacity-100"
                      : "max-h-96 opacity-100"
                  }`}
                >
                  {collapsedSections.has("Collections") ? (
                    <div className="p-0 text-center text-neutral-400">
                      {/* Content hidden when collapsed */}
                    </div>
                  ) : (
                    <>
                      <CustomCheckbox
                        checked={checkboxStates.latestArrivals}
                        onChange={() => handleCheckboxChange("latestArrivals")}
                        label="Latest arrivals"
                      />
                      <CustomCheckbox
                        checked={checkboxStates.urbanOasis}
                        onChange={() => handleCheckboxChange("urbanOasis")}
                        label="Urban Oasis"
                      />
                      <CustomCheckbox
                        checked={checkboxStates.cozyComfort}
                        onChange={() => handleCheckboxChange("cozyComfort")}
                        label="Cozy Comfort"
                      />
                      <CustomCheckbox
                        checked={checkboxStates.freshFusion}
                        onChange={() => handleCheckboxChange("freshFusion")}
                        label="Fresh Fusion"
                      />
                    </>
                  )}
                </div>
                <div
                  className={`flex justify-between items-center ${collapsedSections.has("Category") ? "" : "pb-6"}`}
                >
                  <p className="font-medium text-base text-neutral-900">
                    Category
                  </p>
                  <button
                    onClick={() => toggleSection("Category")}
                    className="w-6 h-6 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1"
                    aria-label={`${collapsedSections.has("Category") ? "Expand" : "Collapse"} Category section`}
                  >
                    {collapsedSections.has("Category") ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.1665 5.16669V0.166687H6.83317V5.16669H11.8332V6.83335H6.83317V11.8334H5.1665V6.83335H0.166504V5.16669H5.1665Z"
                          fill="#525252"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="12"
                        height="2"
                        viewBox="0 0 12 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
                          fill="#525252"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div
                  className={`flex flex-col gap-6 text-base text-neutral-600 pb-6 mb-6 border-b border-neutral-300 w-full overflow-hidden transition-all duration-300 ease-in-out ${
                    collapsedSections.has("Category")
                      ? "max-h-12 opacity-100"
                      : "max-h-96 opacity-100"
                  }`}
                >
                  {collapsedSections.has("Category") ? (
                    <div className="p-0 text-center text-neutral-400">
                      {/* Content hidden when collapsed */}
                    </div>
                  ) : (
                    <>
                      <CustomCheckbox
                        checked={checkboxStates.unisex}
                        onChange={() => handleCheckboxChange("unisex")}
                        label="Unisex"
                      />
                      <CustomCheckbox
                        checked={checkboxStates.women}
                        onChange={() => handleCheckboxChange("women")}
                        label="Women"
                      />
                      <CustomCheckbox
                        checked={checkboxStates.men}
                        onChange={() => handleCheckboxChange("men")}
                        label="Men"
                      />
                    </>
                  )}
                </div>
                <div className={`border-b border-neutral-300 pb-0 mb-6`}>
                  <div className="flex justify-between items-center pb-5">
                    <div className="flex items-center gap-2 ">
                      <p className="font-medium text-base text-neutral-900">
                        Colors
                      </p>
                      {selectedColors.length > 0 && (
                        <span className="text-sm text-neutral-500">
                          ({selectedColors.length} selected)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleSection("Colors")}
                      className="w-6 h-6 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1"
                      aria-label={`${collapsedSections.has("Colors") ? "Expand" : "Collapse"} Colors section`}
                    >
                      {collapsedSections.has("Colors") ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.1665 5.16669V0.166687H6.83317V5.16669H11.8332V6.83335H6.83317V11.8334H5.1665V6.83335H0.166504V5.16669H5.1665Z"
                            fill="#525252"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="12"
                          height="2"
                          viewBox="0 0 12 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
                            fill="#525252"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      collapsedSections.has("Colors")
                        ? "max-h-12 opacity-100"
                        : "max-h-96 opacity-100"
                    }`}
                  >
                    {collapsedSections.has("Colors") ? (
                      <div className="p-0 text-center text-neutral-400">
                        {/* Content hidden when collapsed */}
                      </div>
                    ) : (
                      <>
                        <ColorPicker
                          colors={colors}
                          selectedColor={null}
                          onColorSelect={handleColorChange}
                          size="sm"
                          gap="sm"
                          hideHeading={true}
                          multiSelect={true}
                          selectedColors={selectedColors}
                        />
                        {selectedColors.length > 0 && (
                          <button
                            onClick={() => setSelectedColors([])}
                            className="text-sm text-neutral-500 hover:text-neutral-700 underline mt-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1"
                          >
                            Clear all colors
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div
                  className={`border-b border-neutral-300 ${collapsedSections.has("Rating") ? "pb-0" : "pb-6"} mb-6`}
                >
                  <div className="flex justify-between items-center pb-6">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-base text-neutral-900">
                        Rating
                      </p>
                      {selectedRating && (
                        <span className="text-sm text-neutral-500">
                          ({selectedRating}+ stars)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleSection("Rating")}
                      className="w-6 h-6 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1"
                      aria-label={`${collapsedSections.has("Rating") ? "Expand" : "Collapse"} Rating section`}
                    >
                      {collapsedSections.has("Rating") ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.1665 5.16669V0.166687H6.83317V5.16669H11.8332V6.83335H6.83317V11.8334H5.1665V6.83335H0.166504V5.16669H5.1665Z"
                            fill="#525252"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="12"
                          height="2"
                          viewBox="0 0 12 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
                            fill="#525252"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      collapsedSections.has("Rating")
                        ? "max-h-12 opacity-100"
                        : "max-h-96 opacity-100"
                    }`}
                  >
                    {collapsedSections.has("Rating") ? (
                      <div
                        className={`${collapsedSections.has("Rating") ? "p-0" : "pb-6"} text-center text-neutral-400`}
                      ></div>
                    ) : (
                      <>
                        <StarRating
                          rating={5}
                          type="productsPage"
                          onRatingSelect={handleRatingSelect}
                          isSelected={selectedRating === 5}
                        />
                        <StarRating
                          rating={4}
                          type="productsPage"
                          onRatingSelect={handleRatingSelect}
                          isSelected={selectedRating === 4}
                        />
                        <StarRating
                          rating={3}
                          type="productsPage"
                          onRatingSelect={handleRatingSelect}
                          isSelected={selectedRating === 3}
                        />
                        <StarRating
                          rating={2}
                          type="productsPage"
                          onRatingSelect={handleRatingSelect}
                          isSelected={selectedRating === 2}
                        />
                        <StarRating
                          rating={1}
                          type="productsPage"
                          onRatingSelect={handleRatingSelect}
                          isSelected={selectedRating === 1}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid - Desktop */}
            <div className="flex-1">
              <ProductGrid
                showViewAllButton={false}
                maxProducts={12}
                products={sortedProducts}
                type="productsPage"
              />
            </div>
          </div>
        ) : (
          /* Mobile Layout: Products + Overlay Filter */
          <>
            <ProductGrid
              showViewAllButton={false}
              maxProducts={12}
              products={sortedProducts}
            />

            {/* Mobile Filter Menu - Sliding Overlay */}
            <div
              className={`fixed z-50 top-0 bg-white w-full p-6 left-0 h-full transform ${
                showFilterMenu ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 overflow-y-auto`}
            >
              {/* Filter Header - Mobile with close button */}
              <div className="text-xl flex justify-between text-neutral-900 pb-6 mb-6 pr-3 border-b border-neutral-300">
                <span>Filter</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="self-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm"
                  onClick={handleFilterClick}
                >
                  <path
                    d="M6.00058 4.82208L10.1253 0.697266L11.3038 1.87577L7.17908 6.00058L11.3038 10.1253L10.1253 11.3038L6.00058 7.17908L1.87577 11.3038L0.697266 10.1253L4.82208 6.00058L0.697266 1.87577L1.87577 0.697266L6.00058 4.82208Z"
                    fill="#525252"
                  />
                </svg>
              </div>

              {/* Filter Content */}
              <div>
                <div className="flex justify-between items-center pb-6">
                  <p className="font-medium text-base text-neutral-900">
                    Collections
                  </p>
                  <button
                    onClick={() => toggleSection("MobileCollections")}
                    className="w-6 h-6 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1"
                    aria-label={`${collapsedSections.has("MobileCollections") ? "Expand" : "Collapse"} Collections section`}
                  >
                    {collapsedSections.has("MobileCollections") ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.1665 5.16669V0.166687H6.83317V5.16669H11.8332V6.83335H6.83317V11.8334H5.1665V6.83335H0.166504V5.16669H5.1665Z"
                          fill="#525252"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="12"
                        height="2"
                        viewBox="0 0 12 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
                          fill="#525252"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div
                  className={`flex flex-col gap-6 text-base text-neutral-600 border-b border-neutral-300 overflow-hidden transition-all duration-300 ease-in-out ${
                    collapsedSections.has("MobileCollections")
                      ? "max-h-12 opacity-100"
                      : "max-h-96 opacity-100 pb-6"
                  }`}
                >
                  {collapsedSections.has("MobileCollections") ? (
                    <div className="p-0 text-center text-neutral-400">
                      {/* Content hidden when collapsed */}
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-3 items-center p-2">
                        <input
                          type="checkbox"
                          className="accent-indigo-600 focus:outline-none focus:border-2 focus:border-blue-500 rounded-sm"
                        />
                        <p>Latest arrivals</p>
                      </div>
                      <div className="flex gap-3 items-center p-2">
                        <input
                          type="checkbox"
                          className="accent-indigo-600 focus:outline-none focus:border-2 focus:border-blue-500 rounded-sm"
                        />
                        <p>Urban Oasis</p>
                      </div>
                      <div className="flex gap-3 items-center p-2">
                        <input
                          type="checkbox"
                          className="accent-indigo-600 focus:outline-none focus:border-2 focus:border-blue-500 rounded-sm"
                        />
                        <p>Cozy Comfort</p>
                      </div>
                      <div className="flex gap-3 items-center p-2">
                        <input
                          type="checkbox"
                          className="accent-indigo-600 focus:outline-none focus:border-2 focus:border-blue-500 rounded-sm"
                        />
                        <p>Fresh Fusion</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-between items-center py-6">
                  <p className="font-medium text-base text-neutral-900">
                    Category
                  </p>
                  <button
                    onClick={() => toggleSection("MobileCategory")}
                    className="w-6 h-6 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1"
                    aria-label={`${collapsedSections.has("MobileCategory") ? "Expand" : "Collapse"} Category section`}
                  >
                    {collapsedSections.has("MobileCategory") ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.1665 5.16669V0.166687H6.83317V5.16669H11.8332V6.83335H6.83317V11.8334H5.1665V6.83335H0.166504V5.16669H5.1665Z"
                          fill="#525252"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="12"
                        height="2"
                        viewBox="0 0 12 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
                          fill="#525252"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div
                  className={`flex flex-col gap-6 text-base text-neutral-600 mb-6 border-b border-neutral-300 overflow-hidden transition-all duration-300 ease-in-out ${
                    collapsedSections.has("MobileCategory")
                      ? "max-h-12 opacity-100"
                      : "max-h-96 opacity-100 pb-6"
                  }`}
                >
                  {collapsedSections.has("MobileCategory") ? (
                    <div className="p-0 text-center text-neutral-400">
                      {/* Content hidden when collapsed */}
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-3 items-center p-2">
                        <input
                          type="checkbox"
                          className="accent-indigo-600 focus:outline-none focus:border-2 focus:border-blue-500 rounded-sm"
                        />
                        <p>Unisex</p>
                      </div>
                      <div className="flex gap-3 items-center p-2">
                        <input
                          type="checkbox"
                          className="accent-indigo-600 focus:outline-none focus:border-2 focus:border-blue-500 rounded-sm"
                        />
                        <p>Women</p>
                      </div>
                      <div className="flex gap-3 items-center p-2">
                        <input
                          type="checkbox"
                          className="accent-indigo-600 focus:outline-none focus:border-2 focus:border-blue-500 rounded-sm"
                        />
                        <p>Men</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="border-b border-neutral-300">
                  <div className="flex justify-between items-center pb-6">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-base text-neutral-900">
                        Colors
                      </p>
                      {selectedColors.length > 0 && (
                        <span className="text-sm text-neutral-500">
                          ({selectedColors.length} selected)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleSection("MobileColors")}
                      className="w-6 h-6 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1"
                      aria-label={`${collapsedSections.has("MobileColors") ? "Expand" : "Collapse"} Colors section`}
                    >
                      {collapsedSections.has("MobileColors") ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.1665 5.16669V0.166687H6.83317V5.16669H11.8332V6.83335H6.83317V11.8334H5.1665V6.83335H0.166504V5.16669H5.1665Z"
                            fill="#525252"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="12"
                          height="2"
                          viewBox="0 0 12 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
                            fill="#525252"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      collapsedSections.has("MobileColors")
                        ? "max-h-12 opacity-100"
                        : "max-h-96 opacity-100"
                    }`}
                  >
                    {collapsedSections.has("MobileColors") ? (
                      <div className="p-0 text-center text-neutral-400">
                        {/* Content hidden when collapsed */}
                      </div>
                    ) : (
                      <>
                        <ColorPicker
                          colors={colors}
                          selectedColor={null}
                          onColorSelect={handleColorChange}
                          size="sm"
                          gap="sm"
                          hideHeading={true}
                          multiSelect={true}
                          selectedColors={selectedColors}
                        />
                        {selectedColors.length > 0 && (
                          <button
                            onClick={() => setSelectedColors([])}
                            className="text-sm text-neutral-500 hover:text-neutral-700 underline mt-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1"
                          >
                            Clear all colors
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div
                  className={`border-b border-neutral-300 ${collapsedSections.has("Rating") ? "pb-0" : "pb-6"} mb-6 pt-6`}
                >
                  <div className="flex justify-between items-center pb-6">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-base text-neutral-900">
                        Rating
                      </p>
                      {selectedRating && (
                        <span className="text-sm text-neutral-500">
                          ({selectedRating}+ stars)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleSection("Rating")}
                      className="w-6 h-6 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/12 rounded-sm p-1"
                      aria-label={`${collapsedSections.has("Rating") ? "Expand" : "Collapse"} Rating section`}
                    >
                      {collapsedSections.has("Rating") ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.1665 5.16669V0.166687H6.83317V5.16669H11.8332V6.83335H6.83317V11.8334H5.1665V6.83335H0.166504V5.16669H5.1665Z"
                            fill="#525252"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="12"
                          height="2"
                          viewBox="0 0 12 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
                            fill="#525252"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      collapsedSections.has("Rating")
                        ? "max-h-12 opacity-100"
                        : "max-h-96 opacity-100"
                    }`}
                  >
                    {collapsedSections.has("Rating") ? (
                      <div
                        className={`${collapsedSections.has("Rating") ? "p-0" : "pb-6"} text-center text-neutral-400`}
                      >
                        {/* Content hidden when collapsed */}
                      </div>
                    ) : (
                      <>
                        <StarRating
                          rating={5}
                          type="productsPage"
                          onRatingSelect={handleRatingSelect}
                          isSelected={selectedRating === 5}
                        />
                        <StarRating
                          rating={4}
                          type="productsPage"
                          onRatingSelect={handleRatingSelect}
                          isSelected={selectedRating === 4}
                        />
                        <StarRating
                          rating={3}
                          type="productsPage"
                          onRatingSelect={handleRatingSelect}
                          isSelected={selectedRating === 3}
                        />
                        <StarRating
                          rating={2}
                          type="productsPage"
                          onRatingSelect={handleRatingSelect}
                          isSelected={selectedRating === 2}
                        />
                        <StarRating
                          rating={1}
                          type="productsPage"
                          onRatingSelect={handleRatingSelect}
                          isSelected={selectedRating === 1}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Products;
