/**
 * Product item representation.
 */
export interface Product {
  id: number
  name: string
  price: number
  image: string
}

/**
 * Item in the shopping cart with quantity.
 */
export interface CartItem {
  product: Product
  quantity: number
}

/**
 * Global notification message state.
 */
export interface NotificationState {
  message: string
  type: 'success' | 'info' | 'error'
}

/**
 * Zustand store state and actions contract.
 */
export interface StoreState {
  products: Product[]
  cart: CartItem[]
  isLoadingProducts: boolean
  isCheckingOut: boolean
  isCartOpen: boolean
  searchQuery: string
  debouncedSearchQuery: string
  notification: NotificationState | null
  loadProducts: () => Promise<void>
  setSearchQuery: (query: string) => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, delta: number) => void
  toggleCart: () => void
  setIsCartOpen: (open: boolean) => void
  checkout: () => Promise<void>
  clearNotification: () => void
}
