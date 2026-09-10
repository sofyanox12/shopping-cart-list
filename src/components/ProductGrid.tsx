import { useStore } from '@/store/useStore'
import { ProductCard } from '@/components/ProductCard'

/**
 * Grid container rendering available products or empty/loading feedback.
 */
export const ProductGrid = () => {
  const products = useStore((state) => state.products)
  const isLoading = useStore((state) => state.isLoadingProducts)
  const searchQuery = useStore((state) => state.searchQuery)

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-rose-500" />
        <p className="mt-4 text-sm font-medium text-slate-500">Loading catalog items...</p>
      </div>
    )
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredProducts = normalizedQuery
    ? products.filter((item) => item.name.toLowerCase().includes(normalizedQuery))
    : products

  if (filteredProducts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <p className="text-base font-semibold text-slate-700">No products found</p>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your search criteria.</p>
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
