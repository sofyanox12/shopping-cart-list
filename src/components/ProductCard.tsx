import { memo } from 'react'
import { Product } from '@/types/store'
import { useStore } from '@/store/useStore'

interface ProductCardProps {
  product: Product
}

/**
 * Product display card with price and add-to-cart action.
 * Memoized to prevent re-renders when parent list or siblings update.
 */
export const ProductCard = memo(({ product }: ProductCardProps) => {
  const addToCart = useStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-48 w-full items-center justify-center rounded-lg bg-slate-100 text-slate-400">
        <svg
          className="h-16 w-16 stroke-current opacity-60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-800">{product.name}</h2>
          <p className="mt-2 text-xl font-bold text-rose-500">
            ${product.price.toLocaleString()}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-4 flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
})
