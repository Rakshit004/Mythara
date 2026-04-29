import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Gem, Sparkles, Crown, Heart } from "lucide-react";

const FEATURES = [
  {
    Icon: Star,
    label: "Astrological Heritage",
    subheading: "Rooted in Ancient Wisdom",
    description:
      "Each Mythara piece is inspired by the ancient science of Jyotish — Vedic astrology. We channel the energy of celestial bodies into wearable art, connecting you to the cosmos.",
    image: "/placeholder.svg",
  },
  {
    Icon: Gem,
    label: "Certified Gemstones",
    subheading: "Only the Finest, Certified Stones",
    description:
      "We source exclusively natural, certified gemstones from trusted origins. Every stone is hand-selected for its clarity, colour, and energetic quality before it ever becomes a Mythara piece.",
    image: "/placeholder.svg",
  },
  {
    Icon: Sparkles,
    label: "Master Craftsmanship",
    subheading: "Handcrafted by Master Artisans",
    description:
      "Our artisans bring decades of craft to every piece — blending centuries-old goldsmithing traditions with contemporary design. No two pieces are identical.",
    image: "/placeholder.svg",
  },
  {
    Icon: Crown,
    label: "Statement Designs",
    subheading: "Designed to Be Remembered",
    description:
      "Mythara pieces are not quiet jewellery. They are bold, intentional, and unmistakable — designed to make you feel like the universe is wearing you.",
    image: "/placeholder.svg",
  },
  {
    Icon: Heart,
    label: "Your Expression",
    subheading: "Extension of Your Expression",
    description:
      "Every Mythara piece carries your story. Wear the cosmos, express your soul, and let the universe speak through you. This is jewellery that means something.",
    image: "/placeholder.svg",
  },
];

export default function WhyMythara() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? FEATURES.length - 1 : i - 1));
  const next = () => setActive((i) => (i === FEATURES.length - 1 ? 0 : i + 1));

  const current = FEATURES[active];

  return (
    <section style={{ backgroundColor: "#f2f2f2" }} className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Mobile heading */}
        <h2 className="text-2xl font-bold text-center mb-8 md:hidden">
          Why Choose MYTARA & CO?
        </h2>

        {/* Thumb tabs */}
        <div className="flex justify-center gap-6 mb-10 overflow-x-auto pb-2">
          {FEATURES.map((f, i) => {
            const Icon = f.Icon;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex flex-col items-center gap-2 min-w-[72px] transition-all ${
                  active === i ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                    active === i
                      ? "border-black bg-black text-white"
                      : "border-gray-400 bg-white text-gray-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-center leading-tight font-medium w-20">
                  {f.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Slide content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <h2 className="hidden md:block text-3xl font-bold mb-4">
              Why Choose MYTARA & CO?
            </h2>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              {current.subheading}
            </h3>
            <p className="text-gray-600 leading-relaxed">{current.description}</p>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 relative">
            <img
              key={active}
              src={current.image}
              alt={current.subheading}
              className="w-full aspect-square object-cover rounded animate-fade-in"
            />
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
