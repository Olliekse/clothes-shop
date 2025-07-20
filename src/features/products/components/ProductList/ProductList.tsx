import { useQuery } from "@tanstack/react-query";
import { mockData } from "../../../../api/mockData";
import ProductListItem from "./ProductListItem";
import Button from "../../../../components/Button";
import { dataService, InventoryItem } from "../../../../api/dataService";
import { useMemo } from "react";

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
  });

  const filteredProducts = useMemo(() => {
    if (!productsData?.products) return [];
    return productsData.products.filter((_, index) => index < 8);
  }, [productsData]);

  if (productsLoading || imagesLoading || inventoryLoading)
    return <div>Loading...</div>;
  if (!productsData?.products || !productImages || !inventoryData)
    return <div>No data available</div>;

  return (
    <div className="min-[375px]:px-[12px] min-[768px]:px-[16px] min-[375px]:py-[48px] min-[768px]:py-[64px] min-[1440px]:px-[96px] min-[1440px]:py-[104px]">
      <div className="flex flex-row justify-between pb-[32px]">
        <h1 className="font-semibold text-2xl text-neutral-900">
          Latest Arrivals
        </h1>
        <Button onClick={() => {}} type="viewAll">
          View all
        </Button>
      </div>
      <div className="flex flex-wrap justify-between">
        {filteredProducts.map((product) => {
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
        })}
      </div>
    </div>
  );
}

export default ProductList;
