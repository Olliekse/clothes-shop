import Collections from "../components/Collections/Collections";
import Commitments from "../components/Commitments/Commitments";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Newsletter from "../components/Newsletter/Newsletter";
import { ProductGrid } from "../components/ProductGrid";
import Footer from "../components/Footer/Footer";

function Storefront() {
  return (
    <>
      <Header />
      <Hero />
      <ProductGrid
        title="Latest Arrivals"
        showViewAllButton={true}
        maxProducts={8}
      />
      <Collections />
      <Commitments />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Storefront;
