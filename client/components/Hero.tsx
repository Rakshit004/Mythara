import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null); // Changed from imageRef to videoRef

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !videoRef.current) return;

      const scrolled = window.pageYOffset;
      const heroRect = heroRef.current.getBoundingClientRect();
      const heroTop = heroRect.top + scrolled;
      const heroHeight = heroRect.height;

      // Only apply parallax when hero is in viewport
      if (scrolled < heroTop + heroHeight) {
        const parallaxSpeed = 0.5; // Adjust this value to control parallax intensity
        // Calculate yPos relative to the top of the hero section
        const yPos = (scrolled - heroTop) * parallaxSpeed;
        videoRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef} // Attach the ref to the video element
          src="/hero-vid.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[120%] object-cover object-center absolute top-0 left-0 will-change-transform" // Increased height to allow for parallax movement
          style={{ transform: 'translate3d(0, 0, 0)' }} // Initial transform for smooth transitions
        ></video>
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