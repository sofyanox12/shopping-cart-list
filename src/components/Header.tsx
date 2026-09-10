import { ChangeEvent, memo } from 'react'
import { useStore } from '@/store/useStore'
import { CartButton } from '@/components/CartButton'

/**
 * Top navigation header component with search bar and isolated cart trigger.
 */
export const Header = memo(() => {
  const searchQuery = useStore((state) => state.searchQuery)
  const setSearchQuery = useStore((state) => state.setSearchQuery)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">Store Showcase</h1>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white placeholder-slate-400 transition-colors focus:border-indigo-500 focus:outline-none sm:w-64"
          />

          <CartButton />
        </div>
      </div>
    </header>
  )
})
