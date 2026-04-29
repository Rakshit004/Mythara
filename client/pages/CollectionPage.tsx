import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { getProductsByCollection } from "../lib/shopify";



const COLLECTION_LABELS: Record<string, string> = {
  // Collections
  emerald: "Emerald Collection",
  ruby: "Ruby Collection",
  "yellow-sapphire": "Yellow Sapphire Collection",
  sapphire: "Sapphire Collection",
  "blue-sapphire": "Blue Sapphire Collection",
  pearl: "Pearl Collection",
  "celestial-dreams": "Celestial Dreams",
  "mythical-creatures": "Mythical Creatures",
  // Jewellery types
  earrings: "Earrings",
  rings: "Rings",
  lockets: "Lockets",
  // Accessories
  cufflinks: "Cufflinks",
  bracelets: "Bracelets",
  brooches: "Brooches",
  "tie-pins": "Tie Pins",
  "belt-buckles": "Belt Buckles",
};

export default function CollectionPage() {
  const { handle, gender, type } = useParams<{ handle?: string; gender?: string; type?: string }>();

  const collectionHandle = gender && type ? `${gender}-${type}` : (handle ?? "");
  const labelKey = type ? type : (handle ?? "");
  const label = gender
    ? `${gender.toUpperCase()} — ${COLLECTION_LABELS[type ?? ""] ?? (type ?? "").replace(/-/g, " ").toUpperCase()}`
    : (COLLECTION_LABELS[labelKey] ?? labelKey.replace(/-/g, " ").toUpperCase());

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["collection", collectionHandle],
    queryFn: () => getProductsByCollection(collectionHandle),
    enabled: !!collectionHandle,
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Collection Banner */}
      <div className="bg-black text-white py-16 px-4 text-center mt-0">
        <p className="text-xs tracking-[0.3em] mb-3 text-gray-400 uppercase">
          MYTARA & CO
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {label}
        </h1>
      </div>

      {/* Product Grid */}
      {!isLoading && products.length === 0 ? (
        <div className="py-32 text-center text-gray-400">
          <p className="text-2xl font-bold mb-3 tracking-widest">COMING SOON</p>
          <p className="text-sm">
            Products for this collection are on their way.
          </p>
        </div>
      ) : (
        <ProductGrid
          title=""
          products={products}
          isLoading={isLoading}
        />
      )}

      <Footer />
    </div>
  );
}
