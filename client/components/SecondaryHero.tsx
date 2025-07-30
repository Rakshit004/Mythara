import { useEffect, useRef } from "react";

export default function SecondaryHero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !imageRef.current) return;

      const scrolled = window.pageYOffset;
      const heroRect = heroRef.current.getBoundingClientRect();
      const heroTop = heroRect.top + scrolled;
      const heroHeight = heroRect.height;

      // Only apply parallax when hero is in viewport
      if (scrolled < heroTop + heroHeight) {
        const parallaxSpeed = 0.3;
        const yPos = scrolled * parallaxSpeed;
        imageRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      <div className="bg-gray-800 h-96 md:h-[70vh] flex items-center justify-center relative">
        <img
          ref={imageRef}
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/secondary-hero-bg.jpg?width=1200"
          alt="MYTHARA Craftsmanship"
          className="w-full h-[120%] object-cover absolute top-0 left-0 will-change-transform"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            CRAFTED WITH PASSION
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-white mb-8">
            Every piece tells a story of excellence and dedication
          </h2>
          <a
            href="#"
            className="bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition duration-300"
          >
            DISCOVER OUR CRAFT
          </a>
        </div>
      </div>
    </section>
  );
}
