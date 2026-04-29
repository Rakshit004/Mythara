import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    type: 'video' as const,
    src: '/hero-vid-new.mp4',
    heading: 'EXTENSION OF YOUR EXPRESSION',
    subheading: 'NEW DROP — NOW LIVE',
    cta: 'SHOP NOW',
    ctaLink: '#',
  },
  {
    type: 'image' as const,
    src: '/placeholder.svg',
    heading: 'SLIDE 2 HEADING',
    subheading: 'Add your subtitle here',
    cta: 'EXPLORE',
    ctaLink: '#',
  },
  {
    type: 'image' as const,
    src: '/placeholder.svg',
    heading: 'SLIDE 3 HEADING',
    subheading: 'Add your subtitle here',
    cta: 'DISCOVER',
    ctaLink: '#',
  },
  {
    type: 'image' as const,
    src: '/placeholder.svg',
    heading: 'SLIDE 4 HEADING',
    subheading: 'Add your subtitle here',
    cta: 'SHOP NOW',
    ctaLink: '#',
  },
  {
    type: 'image' as const,
    src: '/placeholder.svg',
    heading: 'SLIDE 5 HEADING',
    subheading: 'Add your subtitle here',
    cta: 'VIEW ALL',
    ctaLink: '#',
  },
];

const INTERVAL = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setTimeout(next, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  const slide = SLIDES[current];

  return (
    <section className="relative h-screen overflow-hidden bg-black">

      {/* Slides */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {slide.type === 'video' ? (
          <video
            key={slide.src}
            src={slide.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            key={current}
            src={slide.src}
            alt={slide.heading}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Overlay + text */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex items-center justify-center">
        <div
          className={`text-center px-4 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            {slide.heading}
          </h1>
          <h2 className="text-lg md:text-2xl text-white mb-8 tracking-widest font-light">
            {slide.subheading}
          </h2>
          <a
            href={slide.ctaLink}
            className="bg-white text-black px-8 py-3 font-bold text-sm tracking-widest hover:bg-gray-200 transition-colors duration-300"
          >
            {slide.cta}
          </a>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black bg-opacity-40 hover:bg-opacity-70 flex items-center justify-center text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black bg-opacity-40 hover:bg-opacity-70 flex items-center justify-center text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white bg-opacity-50 hover:bg-opacity-80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
