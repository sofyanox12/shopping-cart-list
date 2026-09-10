import { memo } from 'react'
import { useCartItemIds } from '@/hooks/useCart'
import { CartItemRow } from '@/components/CartItemRow'

/**
 * Isolated cart items list component.
 * Re-renders only when items are added or removed, not on quantity modifications.
 */
export const CartItemList = memo(() => {
  const itemIds = useCartItemIds()

  if (itemIds.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-slate-400">
        <p className="text-sm">Your cart is currently empty.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <ul className="divide-y divide-slate-100">
        {itemIds.map((id) => (
          <CartItemRow key={id} productId={id} />
        ))}
      </ul>
    </div>
  )
})
