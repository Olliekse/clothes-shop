import { useNavigate } from "react-router";

function ProductCard({ product }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/product/${product.id}`);
  }

  return <div onClick={handleClick}>PRODUCT DETAILS</div>;
}

export default ProductCard;
