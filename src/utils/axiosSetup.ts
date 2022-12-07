import axios from 'axios'

const setupAxiosForAuthUser = () => {
  console.log('axios-->', localStorage.getItem('access_token'))
  axios.interceptors.request.use(function (config: any) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
    return config
  })
}

export default setupAxiosForAuthUser
