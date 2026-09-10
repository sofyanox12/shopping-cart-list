import { memo } from 'react'
import { useStore } from '@/store/useStore'
import { useCartItem } from '@/hooks/useCart'

interface CartItemRowProps {
  productId: number
}

/**
 * Isolated row representing an individual cart item.
 * Re-renders only when its own item data changes.
 */
export const CartItemRow = memo(({ productId }: CartItemRowProps) => {
  const item = useCartItem(productId)
  const updateQuantity = useStore((state) => state.updateQuantity)

  if (!item) return null

  const handleDecrement = () => updateQuantity(productId, -1)
  const handleIncrement = () => updateQuantity(productId, 1)

  return (
    <li className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-slate-100 text-xs text-slate-400">
        IMG
      </div>

      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-semibold text-slate-800">{item.product.name}</p>
        <p className="text-sm font-bold text-rose-500">${item.product.price.toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrement}
          aria-label={`Decrease quantity of ${item.product.name}`}
          className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          -
        </button>
        <span className="w-5 text-center text-sm font-medium text-slate-800">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          aria-label={`Increase quantity of ${item.product.name}`}
          className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          +
        </button>
      </div>
    </li>
  )
})
