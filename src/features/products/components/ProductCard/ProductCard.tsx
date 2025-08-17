import { useNavigate } from "react-router";
import { Product } from "../../../../api/dataService";

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/products/${product.product_id}`);
  }

  return <div onClick={handleClick}>PRODUCT DETAILS</div>;
}

export default ProductCard;
