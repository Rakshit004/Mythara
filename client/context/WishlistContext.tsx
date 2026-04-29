import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useCart } from "./CartContext";

export interface WishlistItem {
  id: string;
  variantId: string;
  name: string;
  image: string;
  price: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  count: number;
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  moveToCart: (item: WishlistItem) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCart();

  const addToWishlist = useCallback((item: WishlistItem) => {
    setItems((prev) =>
      prev.find((i) => i.id === item.id) ? prev : [...prev, item],
    );
    setIsOpen(true);
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isWishlisted = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items],
  );

  const moveToCart = useCallback(
    async (item: WishlistItem) => {
      await addToCart(item.variantId, item.name, item.image, item.price);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setIsOpen(false);
    },
    [addToCart],
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        isOpen,
        openWishlist: () => setIsOpen(true),
        closeWishlist: () => setIsOpen(false),
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
