import { useQuery } from "@tanstack/react-query";
import { mockData } from "../../../../api/mockData";
import ProductGridItem from "./ProductGridItem";
import Button from "../../../../components/Button";
import { dataService, InventoryItem } from "../../../../api/dataService";
import React, { useMemo, useCallback, useEffect } from "react";
import { queryClient } from "../../../../lib/queryClient";
import { useNavigate } from "react-router";

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

interface ProductGridProps {
  title?: string;
  showViewAllButton?: boolean;
  maxProducts?: number;
  className?: string;
  products: [];
  type?: string;
}

function ProductGrid({
  title,
  showViewAllButton = true,
  maxProducts = 8,
  className = "",
  products,
  type,
}: ProductGridProps) {
  const { isLoading: productsLoading } = useQuery<ProductsResponse>({
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

  const navigate = useNavigate();

  function handleClick() {
    navigate("/products");
  }

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

    staleTime: 15 * 60 * 1000,
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
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const prefetchData = async () => {
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

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((_, index) => index < maxProducts);
  }, [products, maxProducts]);

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
        <ProductGridItem
          key={product.product_id}
          product={product}
          productImage={productImage}
          inventoryItems={inventoryItems}
          showViewAllButton={true}
        />
      );
    },
    [productImages]
  );

  if (productsLoading || imagesLoading || inventoryLoading)
    return <div>Loading...</div>;
  if (!products || !productImages || !inventoryData)
    return <div>No data available</div>;

  return (
    <div
      className={`${type === "productsPage" ? "lg:py-8" : "sm:px-[12px] md:px-[16px] sm:py-[48px] md:py-[64px] xl:p-[96px]"}  bg-white ${showViewAllButton ? "px-3" : "px-0"} ${className}`}
    >
      {(title || showViewAllButton) && (
        <div className="flex flex-row justify-between pb-[32px] items-center">
          {title && (
            <h1 className="font-semibold text-2xl text-neutral-900">{title}</h1>
          )}
          {showViewAllButton && (
            <Button onClick={handleClick} type="viewAll">
              View all
            </Button>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
        {filteredProducts.map(renderProduct)}
      </div>
    </div>
  );
}

export default React.memo(ProductGrid);
