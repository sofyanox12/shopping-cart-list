import { memo } from 'react'
import { useStore } from '@/store/useStore'
import { useCartTotal } from '@/hooks/useCart'

/**
 * Isolated cart footer component containing total calculation and checkout action.
 */
export const CartFooter = memo(() => {
  const totalPrice = useCartTotal()
  const isEmpty = useStore((state) => state.cart.length === 0)
  const isCheckingOut = useStore((state) => state.isCheckingOut)
  const checkout = useStore((state) => state.checkout)

  return (
    <footer className="border-t border-slate-200 bg-slate-50 p-6">
      <div className="flex items-center justify-between text-base font-semibold text-slate-900">
        <span>Total:</span>
        <span className="text-xl font-bold text-rose-600">
          ${totalPrice.toLocaleString()}
        </span>
      </div>

      <button
        type="button"
        onClick={checkout}
        disabled={isEmpty || isCheckingOut}
        className="mt-4 flex w-full items-center justify-center rounded-lg bg-rose-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isCheckingOut ? 'Processing checkout...' : 'Proceed to Checkout'}
      </button>
    </footer>
  )
})
