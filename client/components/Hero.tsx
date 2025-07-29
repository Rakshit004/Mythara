import { useEffect, useRef } from 'react';

export default function Hero() {
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
        const parallaxSpeed = 0.5;
        const yPos = scrolled * parallaxSpeed;
        imageRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      <div className="bg-blue-500 h-96 md:h-screen flex items-center justify-center relative">
        <img
          ref={imageRef}
          src="https://bluorng.com/cdn/shop/files/rwfdeccsx.jpg?v=1732202045&width=1500"
          alt="MYTHARA Collection"
          className="w-full h-[120%] object-cover absolute top-0 left-0 will-change-transform"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            EXTENSION OF YOUR EXPRESSION
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
            NEW DROP - NOW LIVE
          </h2>
          <a
            href="#"
            className="bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition duration-300"
          >
            SHOP NOW
          </a>
        </div>
      </div>
    </section>
  );
}
