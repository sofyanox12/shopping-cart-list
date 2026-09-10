export type DebouncedFn<TArgs extends unknown[]> = ((...args: TArgs) => void) & {
  cancel: () => void
}

/**
 * Creates a debounced function that delays invocation until after wait ms.
 */
export const debounce = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number = 300
): DebouncedFn<TArgs> => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: TArgs) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      callback(...args)
      timeoutId = null
    }, delayMs)
  }

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return debounced
}
