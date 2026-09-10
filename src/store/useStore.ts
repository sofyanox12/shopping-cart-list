import { create } from 'zustand'
import { Product, StoreState } from '@/types/store'

/**
 * Initial mock product catalog converted to English.
 */
const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Bluetooth Headphones', price: 2999, image: 'headphones' },
  { id: 2, name: 'Smartwatch', price: 8999, image: 'smartwatch' },
  { id: 3, name: 'Portable Power Bank', price: 1299, image: 'powerbank' },
  { id: 4, name: 'Wireless Mouse', price: 899, image: 'mouse' },
  { id: 5, name: 'Mechanical Keyboard', price: 3999, image: 'keyboard' },
  { id: 6, name: 'HD Webcam', price: 2199, image: 'webcam' },
  { id: 7, name: 'USB Flash Drive', price: 599, image: 'usb' },
  { id: 8, name: 'Desktop Speaker', price: 1599, image: 'speaker' },
]

/**
 * Global application store managed with Zustand.
 */
export const useStore = create<StoreState>((set, get) => ({
  products: [],
  cart: [],
  isLoadingProducts: false,
  isCheckingOut: false,
  isCartOpen: false,
  searchQuery: '',
  notification: null,

  loadProducts: async () => {
    set({ isLoadingProducts: true })
    // ponytail: minimal mock async network latency simulation
    await new Promise((resolve) => setTimeout(resolve, 600))
    set({ products: INITIAL_PRODUCTS, isLoadingProducts: false })
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },

  addToCart: (product: Product) => {
    const { cart } = get()
    const existingIndex = cart.findIndex((item) => item.product.id === product.id)

    if (existingIndex > -1) {
      const updatedCart = cart.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      )
      set({
        cart: updatedCart,
        notification: { message: `Added another "${product.name}" to your cart.`, type: 'success' },
      })
      return
    }

    set({
      cart: [...cart, { product, quantity: 1 }],
      notification: { message: `"${product.name}" added to your cart.`, type: 'success' },
    })
  },

  removeFromCart: (productId: number) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    }))
  },

  updateQuantity: (productId: number, delta: number) => {
    set((state) => {
      const target = state.cart.find((item) => item.product.id === productId)
      if (!target) return state

      const newQuantity = target.quantity + delta
      if (newQuantity <= 0) {
        return {
          cart: state.cart.filter((item) => item.product.id !== productId),
        }
      }

      return {
        cart: state.cart.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        ),
      }
    })
  },

  toggleCart: () => {
    set((state) => ({ isCartOpen: !state.isCartOpen }))
  },

  setIsCartOpen: (open: boolean) => {
    set({ isCartOpen: open })
  },

  checkout: async () => {
    const { cart } = get()
    if (cart.length === 0) return

    set({ isCheckingOut: true })
    // ponytail: minimal mock checkout network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    set({
      cart: [],
      isCheckingOut: false,
      isCartOpen: false,
      notification: {
        message: 'Order completed successfully! Thank you for your purchase.',
        type: 'success',
      },
    })
  },

  clearNotification: () => {
    set({ notification: null })
  },
}))
