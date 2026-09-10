import { memo } from 'react'
import { useStore } from '@/store/useStore'
import { CartItemList } from '@/components/CartItemList'
import { CartFooter } from '@/components/CartFooter'

/**
 * Slide-out cart drawer shell.
 * Subscribes only to open/close state to avoid re-rendering on cart changes.
 */
export const CartSidebar = memo(() => {
  const isCartOpen = useStore((state) => state.isCartOpen)
  const toggleCart = useStore((state) => state.toggleCart)
  const setIsCartOpen = useStore((state) => state.setIsCartOpen)

  const handleBackdropClick = () => {
    setIsCartOpen(false)
  }

  return (
    <>
      {isCartOpen && (
        <div
          role="presentation"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-800">Shopping Cart</h2>
          <button
            type="button"
            onClick={toggleCart}
            aria-label="Close shopping cart"
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </header>

        <CartItemList />
        <CartFooter />
      </aside>
    </>
  )
})
