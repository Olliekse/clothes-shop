import Header from "../Header/Header";

import ProductList from "../ProductList/ProductList";

export default function App() {
  return (
    <div className="px-[28px] flex mt-[48px] justify-center align-center flex-col lg:px-[96px]">
      <Header text="Latest Arrivals" />
      <ProductList />
    </div>
  );
}
