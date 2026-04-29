import { ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { items, total, checkoutUrl, count, isOpen, closeCart, removeFromCart } =
    useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeCart}
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
            YOUR CART ({count})
          </h2>
          <button onClick={closeCart} className="hover:opacity-60 transition-opacity">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <ShoppingBag className="w-12 h-12" />
              <p className="text-sm tracking-widest">YOUR CART IS EMPTY</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.lineId} className="flex gap-3 items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{item.price}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Qty: {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.lineId)}
                  className="text-gray-400 hover:text-black transition-colors mt-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t space-y-4">
            <div className="flex justify-between items-center font-bold text-sm tracking-widest">
              <span>SUBTOTAL</span>
              <span>{total}</span>
            </div>
            <a
              href={checkoutUrl}
              className="block w-full bg-black text-white text-center py-3 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors"
            >
              CHECKOUT
            </a>
          </div>
        )}
      </div>
    </>
  );
}
