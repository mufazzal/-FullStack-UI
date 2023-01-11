export const formatUserName = (username: string): string => {
  return '@' + username
}

export const delayedPromise = (delay: number, dummyData?: any) => {
  return new Promise((res, rej) => {
    if(dummyData) 
      console.log(typeof dummyData === 'object' ? JSON.stringify(dummyData) : dummyData)
    setTimeout(()=>{res('Done')}, delay)
  })
}
