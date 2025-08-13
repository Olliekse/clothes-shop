import { useQuery } from "@tanstack/react-query";
import { mockData } from "../../../../api/mockData";
import ProductListItem from "./ProductListItem";
import Button from "../../../../components/Button";
import { dataService, InventoryItem } from "../../../../api/dataService";
import React, { useMemo, useCallback, useEffect } from "react";
import { queryClient } from "../../../../lib/queryClient";

interface Product {
  product_id: string;
  name: string;
}

interface ProductImage {
  product_id: string;
  color: string;
  image_url: string;
}

interface ProductsResponse {
  products: Product[];
}

function ProductList() {
  const { data: productsData, isLoading: productsLoading } =
    useQuery<ProductsResponse>({
      queryKey: ["products"],
      queryFn: async () => {
        if (import.meta.env.PROD) {
          return { products: mockData.products };
        }
        const response = await fetch("http://localhost:9000/products");
        const data = await response.json();
        return data;
      },
      // Keep this data fresh for longer since it rarely changes
      staleTime: 10 * 60 * 1000, // 10 minutes
    });

  const { data: productImages, isLoading: imagesLoading } = useQuery<
    ProductImage[]
  >({
    queryKey: ["product-images"],
    queryFn: async () => {
      if (import.meta.env.PROD) {
        return mockData.productImages;
      }
      const response = await fetch("http://localhost:9000/product-images");
      const data = await response.json();
      return data;
    },
    // Keep image data fresh for longer
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  const { data: inventoryData, isLoading: inventoryLoading } = useQuery<
    InventoryItem[]
  >({
    queryKey: ["inventory"],
    queryFn: async () => {
      if (import.meta.env.PROD) {
        return mockData.inventory;
      }
      const response = await fetch("http://localhost:9000/inventory");
      const data = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Prefetch data when component mounts to improve navigation performance
  useEffect(() => {
    const prefetchData = async () => {
      // Prefetch related data that might be needed on other pages
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: ["products"],
          queryFn: async () => {
            if (import.meta.env.PROD) {
              return { products: mockData.products };
            }
            const response = await fetch("http://localhost:9000/products");
            const data = await response.json();
            return data;
          },
        }),
        queryClient.prefetchQuery({
          queryKey: ["product-images"],
          queryFn: async () => {
            if (import.meta.env.PROD) {
              return mockData.productImages;
            }
            const response = await fetch(
              "http://localhost:9000/product-images"
            );
            const data = await response.json();
            return data;
          },
        }),
      ]);
    };

    prefetchData();
  }, []);

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    if (!productsData?.products) return [];
    return productsData.products.filter((_, index) => index < 8);
  }, [productsData]);

  // Memoize the product rendering function to prevent unnecessary re-renders
  const renderProduct = useCallback(
    (product: Product) => {
      if (!Array.isArray(productImages)) {
        console.error("productImages is not an array:", productImages);
        return null;
      }

      const productImage = productImages.find(
        (img) => img.product_id === product.product_id
      );
      const inventoryItems = dataService.getProductInventory(
        product.product_id
      );

      if (!productImage || !inventoryItems.length) return null;

      return (
        <ProductListItem
          key={product.product_id}
          product={product}
          productImage={productImage}
          inventoryItems={inventoryItems}
        />
      );
    },
    [productImages]
  );

  if (productsLoading || imagesLoading || inventoryLoading)
    return <div>Loading...</div>;
  if (!productsData?.products || !productImages || !inventoryData)
    return <div>No data available</div>;

  return (
    <div className="sm:px-[12px] md:px-[16px] sm:py-[48px] md:py-[64px] xl:p-[96px] bg-white">
      <div className="flex flex-row justify-between pb-[32px] items-center">
        <h1 className="font-semibold text-2xl text-neutral-900">
          Latest Arrivals
        </h1>
        <Button onClick={() => {}} type="viewAll">
          View all
        </Button>
      </div>
      <div className="flex flex-wrap md:gap-[32px] xl:grid xl:grid-cols-4">
        {filteredProducts.map(renderProduct)}
      </div>
    </div>
  );
}

export default React.memo(ProductList);
