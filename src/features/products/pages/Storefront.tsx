import Collections from "../components/Collections/Collections";
import Commitments from "../components/Commitments/Commitments";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Newsletter from "../components/Newsletter/Newsletter";
import { ProductList } from "../components/ProductList";
import Footer from "../components/Footer/Footer";

function Storefront() {
  return (
    <>
      <Header />
      <Hero />
      <ProductList />
      <Collections />
      <Commitments />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Storefront;
