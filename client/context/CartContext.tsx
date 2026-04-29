import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  addLineToCart,
  createCart,
  removeLineFromCart,
  type CartLine,
  type ShopifyCart,
} from "../lib/shopify";

interface CartContextType {
  items: CartLine[];
  total: string;
  checkoutUrl: string;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    variantId: string,
    name: string,
    image: string,
    price: string,
  ) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cartId) return cartId;
    const newCart = await createCart();
    setCartId(newCart.id);
    setCart(newCart);
    return newCart.id;
  }, [cartId]);

  const addToCart = useCallback(
    async (variantId: string) => {
      const id = await ensureCart();
      const updated = await addLineToCart(id, variantId);
      setCart(updated);
      setIsOpen(true);
    },
    [ensureCart],
  );

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      const updated = await removeLineFromCart(cartId, lineId);
      setCart(updated);
    },
    [cartId],
  );

  return (
    <CartContext.Provider
      value={{
        items: cart?.lines ?? [],
        total: cart?.total ?? "₹0",
        checkoutUrl: cart?.checkoutUrl ?? "",
        count: (cart?.lines ?? []).reduce((sum, l) => sum + l.quantity, 0),
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
