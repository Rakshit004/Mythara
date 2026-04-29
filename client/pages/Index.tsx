import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import GoAstroDrawer from "../components/GoAstroDrawer";
import WhyMythara from "../components/WhyMythara";
import { getProducts } from "../lib/shopify";

export default function Index() {
  const [isGoAstroOpen, setIsGoAstroOpen] = useState(false);

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: () => getProducts(8),
  });

  const latestDrop = allProducts.slice(0, 4);
  const moreFromMythara = allProducts.slice(4, 8);

  return (
    <div className="min-h-screen bg-white">
      <Header onGoAstroClick={() => setIsGoAstroOpen(true)} />

      <main>
        <Hero />
        <Marquee />

        <ProductGrid
          title="LATEST DROP"
          products={latestDrop}
          isLoading={isLoading}
        />

        <ProductGrid
          title="MORE FROM MYTARA & CO"
          products={moreFromMythara}
          backgroundColor="bg-gray-50"
          isLoading={isLoading}
        />

        <WhyMythara />
      </main>

      <Footer />

      <GoAstroDrawer
        isOpen={isGoAstroOpen}
        onClose={() => setIsGoAstroOpen(false)}
      />
    </div>
  );
}
