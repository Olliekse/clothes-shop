import { useQuery } from "@tanstack/react-query";

import ProductListItem from "../ProductListItem/ProductListItem";

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

interface InventoryItem {
  product_id: string;
  color: string;
  size: string;
  list_price: number;
}

function ProductList() {
  const { data: productsData, isLoading: productsLoading } =
    useQuery<ProductsResponse>({
      queryKey: ["products"],
      queryFn: async () => {
        const response = await fetch("http://localhost:9001/products");
        const data = await response.json();
        console.log("Products API response:", data);
        return data;
      },
    });

  const { data: productImages, isLoading: imagesLoading } = useQuery<
    ProductImage[]
  >({
    queryKey: ["product-images"],
    queryFn: async () => {
      const response = await fetch("http://localhost:9001/product-images");
      const data = await response.json();
      console.log("Product Images API response:", data);
      return data;
    },
  });

  const { data: inventoryData, isLoading: inventoryLoading } = useQuery<
    InventoryItem[]
  >({
    queryKey: ["inventory"],
    queryFn: async () => {
      const response = await fetch("http://localhost:9001/inventory");
      const data = await response.json();
      console.log("Inventory API response:", data);
      return data;
    },
  });

  if (productsLoading || imagesLoading || inventoryLoading)
    return <div>Loading...</div>;
  if (!productsData?.products || !productImages || !inventoryData)
    return <div>No data available</div>;

  return (
    <div className="flex flex-col gap-[16px] md:flex-row md:flex-wrap md:gap-[32px] md:justify-between">
      {productsData.products
        .filter((item, index) => index < 8)
        .map((product) => {
          const productImage = productImages.find(
            (img) => img.product_id === product.product_id
          );
          const inventoryItems = inventoryData.filter(
            (item) => item.product_id === product.product_id
          );

          if (!productImage || !inventoryItems.length) return null;

          return (
            <ProductListItem
              key={product.product_id}
              product={product}
              productImage={productImage}
              inventoryItems={inventoryItems}
              productImages={productImages}
            />
          );
        })}
    </div>
  );
}

export default ProductList;
