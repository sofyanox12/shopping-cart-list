import { memo } from 'react'
import { useStore } from '@/store/useStore'
import { useCartCount } from '@/hooks/useCart'

/**
 * Isolated cart button component displaying total item count badge.
 * Re-renders only when total cart item quantity changes.
 */
export const CartButton = memo(() => {
  const totalItems = useCartCount()
  const toggleCart = useStore((state) => state.toggleCart)

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={`Shopping cart with ${totalItems} items`}
      className="relative flex shrink-0 items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 focus:outline-none"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span>Cart</span>
      {totalItems > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-rose-600">
          {totalItems}
        </span>
      )}
    </button>
  )
})
