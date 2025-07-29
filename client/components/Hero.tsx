export default function Hero() {
  return (
    <section className="relative">
      <div className="bg-blue-500 h-96 md:h-screen flex items-center justify-center">
        <img 
          src="https://bluorng.com/cdn/shop/files/rwfdeccsx.jpg?v=1732202045&width=1500" 
          alt="MYTHARA Collection" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
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
