export const formatUserName = (username: string): string => {
  return '@' + username
}

export const delayedPromise = async (delay: number, dummyData?: any) => {
  return await new Promise((resolve, reject) => {
    if (dummyData) { console.log(typeof dummyData === 'object' ? JSON.stringify(dummyData) : dummyData) }
    setTimeout(() => { resolve('Done') }, delay)
  })
}
