import { useEffect } from 'react'
import { Header } from '@/components/Header'
import { ProductGrid } from '@/components/ProductGrid'
import { CartSidebar } from '@/components/CartSidebar'
import { NotificationToast } from '@/components/NotificationToast'
import { useStore } from '@/store/useStore'

/**
 * Root application container component.
 */
export const App = () => {
  const loadProducts = useStore((state) => state.loadProducts)

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductGrid />
      </main>
      <CartSidebar />
      <NotificationToast />
    </div>
  )
}
