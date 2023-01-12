import { useRef } from 'react'

function useFuntionDebounce (callback: (data: any) => void, debouceIntervalTime: number) {
  const timeOutHandler = useRef<any>(undefined)

  const attemptCall = (data: any) => {
    if (timeOutHandler.current) {
      clearTimeout(timeOutHandler.current)
    }
    timeOutHandler.current = setTimeout(() => { callback(data) }, debouceIntervalTime)
  }

  return [attemptCall]
}

export default useFuntionDebounce
