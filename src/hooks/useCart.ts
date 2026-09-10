import { useShallow } from 'zustand/react/shallow'
import { useStore } from '@/store/useStore'
import { CartItem } from '@/types/store'

/**
 * Hook to retrieve a single cart item by product ID with minimal re-renders.
 */
export const useCartItem = (productId: number): CartItem | undefined => {
  return useStore((state) => state.cart.find((item) => item.product.id === productId))
}

/**
 * Hook to retrieve cart item IDs with shallow array equality check.
 */
export const useCartItemIds = (): number[] => {
  return useStore(useShallow((state) => state.cart.map((item) => item.product.id)))
}

/**
 * Hook to retrieve the total price of all items in cart.
 */
export const useCartTotal = (): number => {
  return useStore((state) =>
    state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )
}

/**
 * Hook to retrieve total count of all items in cart.
 */
export const useCartCount = (): number => {
  return useStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  )
}

/**
 * Hook to retrieve stable cart manipulation actions.
 */
export const useCartActions = () => {
  const addToCart = useStore((state) => state.addToCart)
  const updateQuantity = useStore((state) => state.updateQuantity)
  const removeFromCart = useStore((state) => state.removeFromCart)

  return { addToCart, updateQuantity, removeFromCart }
}
