import { useEffect } from 'react'
import { useStore } from '@/store/useStore'

/**
 * Toast feedback notification rendered upon user interactions.
 */
export const NotificationToast = () => {
  const notification = useStore((state) => state.notification)
  const clearNotification = useStore((state) => state.clearNotification)

  useEffect(() => {
    if (!notification) return

    const timer = setTimeout(() => {
      clearNotification()
    }, 3000)

    return () => clearTimeout(timer)
  }, [notification, clearNotification])

  if (!notification) return null

  return (
    <div
      key={notification.message}
      className="animate-float-down fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-xl sm:bottom-auto sm:right-auto sm:top-6 sm:left-1/2 sm:-translate-x-1/2"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      <span>{notification.message}</span>
      <button
        type="button"
        onClick={clearNotification}
        className="ml-2 text-slate-400 hover:text-white"
      >
        &times;
      </button>
    </div>
  )
}
