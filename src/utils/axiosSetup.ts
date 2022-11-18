import axios from 'axios'

const setupAxiosForAuthUser = (access_token: string) => {
  console.log('axios-->', access_token)
  axios.interceptors.request.use(function (config: any) {
    config.headers.Authorization = 'Bearer ' + access_token
    return config
  })
}

export default setupAxiosForAuthUser
