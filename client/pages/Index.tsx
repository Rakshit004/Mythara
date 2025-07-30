import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import ProductGrid, {
  latestDropProducts,
  moreFromMytharaProducts,
} from "../components/ProductGrid";
import SecondaryHero from "../components/SecondaryHero";
import StoriesSection from "../components/StoriesSection";
import Footer from "../components/Footer";
import GoAstroDrawer from "../components/GoAstroDrawer";

export default function Index() {
  const [isGoAstroOpen, setIsGoAstroOpen] = useState(false);

  const openGoAstro = () => setIsGoAstroOpen(true);
  const closeGoAstro = () => setIsGoAstroOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onGoAstroClick={openGoAstro} />

      <main>
        <Hero />
        <Marquee />

        <ProductGrid title="LATEST DROP" products={latestDropProducts} />

        <ProductGrid
          title="MORE FROM MYTHARA"
          products={moreFromMytharaProducts}
          backgroundColor="bg-gray-50"
        />

        <SecondaryHero />
        <StoriesSection />
      </main>

      <Footer />

      <GoAstroDrawer isOpen={isGoAstroOpen} onClose={closeGoAstro} />

      {/* Go Astro Trigger - we'll add this functionality to the header component */}
      <style jsx global>{`
        .nav-link[href="#"]:last-child {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
