import { useState, useEffect } from 'react'

const useSafeFetch: any = (url: string, callNow: boolean, options: any) => {
  let isMounted = true
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState<any>(undefined)

  /*eslint-disable */
  useEffect(() => {
    isMounted = true
    if (callNow) { fetchSafely() }
    return () => {
      isMounted = false
    }
  }, [])
  
  const fetchSafely: () => Promise<Response> = async () => {
    setLoading(true)
    // const accessToken: string = (window as any).access_token
    return await fetch(url, { ...options, headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
      .then(async (out: Response) => {
        // await new Promise((r,rj) => {setTimeout(()=>r("ok"), 2000)})

        return await out.json()
      }).then(res => {
        if (!isMounted) {
          console.log('Component has been ummounted, abandoning response of ', url)
          return
        }
        //                res = ____badProxy(url)
        setLoading(false)
        setResponse(res)
        return res
      }).catch(err => {
        if (!isMounted) {
          console.log('Component has been ummounted, abandoning response of ', url)
          return
        }

        console.log(err)
        setLoading(false)
        setError({
          error: err
        })
        return err
      })
  }

  const ____badProxy = (url: string) => {
    if (url.includes('supportWidget')) {
      return {
        totalNumberOfTicket: 10,
        totalOpenTicket: 3,
        totalInWaitTicket: 5,
        totalCloseTicket: 2,
        time: new Date().toLocaleString()
      }
    }
  }

  return [fetchSafely, loading, response, error]
}

export default useSafeFetch
