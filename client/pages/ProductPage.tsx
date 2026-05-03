import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Heart, Minus, Plus } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getProductByHandle, ProductVariant } from "../lib/shopify";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const TABS = ["Details & Description", "Care Instructions", "Shipping"] as const;
type Tab = (typeof TABS)[number];

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<Tab>("Details & Description");
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => getProductByHandle(handle ?? ""),
    enabled: !!handle,
  });

  const selectedVariant: ProductVariant | undefined = product?.variants.find((v) =>
    v.options.every((opt) => selectedOptions[opt.name] === opt.value),
  );

  const currentVariant = selectedVariant ?? product?.variants[0];

  function selectOption(name: string, value: string) {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAddToCart() {
    if (!currentVariant || !product) return;
    for (let i = 0; i < qty; i++) {
      await addToCart(currentVariant.id, product.title, product.images[0] ?? "", currentVariant.price);
    }
  }

  function handleBuyNow() {
    handleAddToCart();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="animate-pulse max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div className="grid grid-cols-[2fr_3fr] gap-3 h-[600px]">
            <div className="bg-gray-200 rounded row-span-2 h-full" />
            <div className="bg-gray-200 rounded h-[296px]" />
            <div className="bg-gray-200 rounded h-[296px]" />
          </div>
          <div className="space-y-4">
            <div className="bg-gray-200 h-8 rounded w-3/4" />
            <div className="bg-gray-200 h-6 rounded w-1/3" />
            <div className="flex gap-2 flex-wrap mt-4">
              {[1,2,3,4].map(i => <div key={i} className="bg-gray-200 h-10 w-20 rounded-full" />)}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="py-32 text-center text-gray-400">
          <p className="text-2xl font-bold tracking-widest mb-2">PRODUCT NOT FOUND</p>
          <p className="text-sm">This product may have been removed or doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"];

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">

          {/* ── Image Gallery ── */}
          <div className="flex gap-3">
            {/* Thumbnails column */}
            {images.length > 1 && (
              <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
                {images.slice(0, 6).map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 overflow-hidden border-2 transition-colors ${activeImage === i ? "border-black" : "border-transparent"}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main images grid - Bluorng style */}
            <div className="flex-1 grid grid-cols-[1fr_1fr] grid-rows-2 gap-2">
              {/* Large left image spans both rows */}
              <div className="row-span-2 overflow-hidden bg-gray-100">
                <img
                  src={images[activeImage] ?? images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "500px", maxHeight: "720px" }}
                />
              </div>
              {/* Top right image */}
              <div className="overflow-hidden bg-gray-100">
                <img
                  src={images[1] ?? images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "248px", maxHeight: "360px" }}
                />
              </div>
              {/* Bottom right image */}
              <div className="overflow-hidden bg-gray-100">
                <img
                  src={images[2] ?? images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "248px", maxHeight: "360px" }}
                />
              </div>
            </div>
          </div>

          {/* ── Product Details Panel ── */}
          <div className="lg:sticky lg:top-36 lg:self-start space-y-6">

            {/* Title + Wishlist */}
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold tracking-tight leading-snug">{product.title}</h1>
              <button
                onClick={() =>
                  wishlisted
                    ? removeFromWishlist(product.id)
                    : addToWishlist({
                        id: product.id,
                        variantId: currentVariant?.id ?? "",
                        name: product.title,
                        image: images[0],
                        price: currentVariant?.price ?? "",
                      })
                }
                className="shrink-0 mt-1"
                aria-label="Save to wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-black text-black" : "text-gray-400"}`} />
              </button>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold">{currentVariant?.price}</span>
              {currentVariant?.compareAtPrice && (
                <span className="text-gray-400 line-through text-base">{currentVariant.compareAtPrice}</span>
              )}
            </div>

            {/* Variant options */}
            {product.options.map((option) => (
              <div key={option.name}>
                <p className="text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">{option.name}</p>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const isSelected = selectedOptions[option.name] === value;
                    const matchingVariant = product.variants.find((v) =>
                      v.options.some((o) => o.name === option.name && o.value === value)
                    );
                    const unavailable = matchingVariant ? !matchingVariant.availableForSale : false;
                    return (
                      <button
                        key={value}
                        onClick={() => selectOption(option.name, value)}
                        disabled={unavailable}
                        className={`px-4 py-2 text-xs font-semibold tracking-wide border transition-colors rounded-sm
                          ${isSelected ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"}
                          ${unavailable ? "opacity-40 cursor-not-allowed line-through" : "cursor-pointer"}
                        `}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-500 mb-2">QUANTITY</p>
              <div className="flex items-center gap-4 border border-gray-300 w-fit px-4 py-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="hover:opacity-60 transition-opacity">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold w-4 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="hover:opacity-60 transition-opacity">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!currentVariant?.availableForSale}
                className="w-full border border-black py-3.5 text-xs font-bold tracking-widest hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {currentVariant?.availableForSale === false ? "OUT OF STOCK" : "ADD TO BAG"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!currentVariant?.availableForSale}
                className="w-full bg-black text-white py-3.5 text-xs font-bold tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                BUY NOW
              </button>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex border-b border-gray-200">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs font-semibold tracking-wide pb-3 mr-6 border-b-2 transition-colors ${
                      activeTab === tab ? "border-black text-black" : "border-transparent text-gray-400 hover:text-black"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="pt-4 text-sm text-gray-600 leading-relaxed">
                {activeTab === "Details & Description" && (
                  product.descriptionHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} className="prose prose-sm max-w-none" />
                  ) : (
                    <p className="text-gray-400 italic">Description coming soon.</p>
                  )
                )}
                {activeTab === "Care Instructions" && (
                  <ul className="space-y-1 list-disc list-inside text-gray-600">
                    <li>Store in a cool, dry place away from direct sunlight</li>
                    <li>Avoid contact with water, perfume, and chemicals</li>
                    <li>Clean gently with a soft dry cloth</li>
                    <li>Keep in the provided jewellery pouch when not in use</li>
                  </ul>
                )}
                {activeTab === "Shipping" && (
                  <ul className="space-y-1 list-disc list-inside text-gray-600">
                    <li>Free shipping on orders over ₹5,000</li>
                    <li>Standard delivery: 5–7 business days</li>
                    <li>Express delivery: 2–3 business days</li>
                    <li>All orders shipped with tracking</li>
                  </ul>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
