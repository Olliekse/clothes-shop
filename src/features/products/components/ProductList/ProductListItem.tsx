import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/productHelpers";
import { Link } from "react-router";
import ColorPicker from "../../../../components/ColorPicker";
import { dataService, InventoryItem } from "../../../../api/dataService";

interface Product {
  product_id: string;
  name: string;
}

interface ProductImage {
  product_id: string;
  color: string;
  image_url: string;
}

function ProductListItem({
  product,
  productImage,
  inventoryItems,
}: {
  product: Product;
  productImage: ProductImage;
  inventoryItems: InventoryItem[];
}) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const uniqueColors = dataService.getProductColors(product.product_id);

  const defaultInventoryItem = inventoryItems[0];

  return (
    <div className="mb-8" key={product.product_id}>
      <Link to={`/product/${product.product_id}`}>
        <img
          className="cursor-pointer rounded-lg w-80 object-cover h-72 md:w-84 lg:w-72"
          src={productImage.image_url}
          alt={product.name}
        />
      </Link>

      <div className="mt-[16px] mx-0">
        <p className="text-sm text-neutral-600">
          {capitalizeFirstLetter(defaultInventoryItem.color)}
        </p>
        <Link to={`/product/${product.product_id}`}>
          <span className="cursor-pointer text-3xl xl:font-medium xl:text-lg">
            {product.name}
          </span>
        </Link>
        <div
          className="flex items-center gap-2 mt-3"
          aria-label="Price information"
        >
          <p className="text-lg text-neutral-500">
            $
            {defaultInventoryItem.list_price -
              (defaultInventoryItem.list_price / 100) *
                (defaultInventoryItem.discount_percentage ?? 0)}
          </p>
          {defaultInventoryItem.discount_percentage &&
            defaultInventoryItem.discount_percentage > 0 && (
              <p className="text-xs line-through text-neutral-600 align-bottom">
                ${defaultInventoryItem.list_price}
              </p>
            )}
        </div>
        <div className="pt-[16px] pb-[34px]">
          <ColorPicker
            colors={uniqueColors}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
            inventoryItems={inventoryItems}
            size="sm"
            gap="sm"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
