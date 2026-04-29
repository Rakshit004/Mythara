import { Heart, X, ShoppingBag } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistDrawer() {
  const { items, count, isOpen, closeWishlist, removeFromWishlist, moveToCart } =
    useWishlist();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeWishlist}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-base font-bold tracking-widest">
            WISHLIST ({count})
          </h2>
          <button
            onClick={closeWishlist}
            className="hover:opacity-60 transition-opacity"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <Heart className="w-12 h-12" />
              <p className="text-sm tracking-widest">YOUR WISHLIST IS EMPTY</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{item.price}</p>
                  <button
                    onClick={() => moveToCart(item)}
                    className="mt-2 flex items-center gap-1.5 text-xs font-bold tracking-widest border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    ADD TO CART
                  </button>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-gray-400 hover:text-black transition-colors mt-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
