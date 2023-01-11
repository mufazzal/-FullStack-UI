import React, { useEffect, useState } from 'react'
import loadable from '@loadable/component'
import setupAxiosForAuthUser from '@utils/axiosSetup'
import { useAuth0 } from '@auth0/auth0-react'
import Spin from 'antd/es/spin'

const UnAuthenticated = loadable(async () => await import('./UnAuthenticated'))
const Authenticated = loadable(async () => await import('./Authenticated'))


const AuthGateway = () => {
  const [ isLogin, setLogin ] = useState(false)
  const { isAuthenticated, user, getAccessTokenWithPopup, loginWithRedirect } = useAuth0()
  const [isLoading, setLoading] = useState<boolean | undefined>(false)
  const [error, setError] = useState<string | undefined>(undefined)

  
  useEffect(() => {
    console.log('user?.name-->', user?.name)
    if (user?.name) {
      setLoading(true)
      console.log('Requestingtoken for user ', user?.name)

      void getAccessTokenWithPopup({ scope: 'offline_access apiAccessViaFrontEnd read:homeWidget read:supportWidget', audience: 'https://mufreact' })
        .then((res: any) => {
          setLoading(false)
          setError(undefined)
          console.log('Token received --> ', res)
          // setIsTokenGenerated(true)
          onLogin(res)
        }).catch((_error: any) => {
          setLoading(false)
          setError('Something went wrong with Token Generation')
        })
    }
  }, [user?.name])

  const onLoginAttempted = () => {
    console.log('onLoginAttempted')
  }

  const onLogin = (access_token: string) => {
    localStorage.setItem('access_token', access_token);
    // (window as any).access_token = access_token
    setLogin(true)
    setupAxiosForAuthUser()
  }
  const onLogout = () => {
    console.log('onLogout')
    localStorage.removeItem('access_token')
    setLogin(false)
  }

  const renderUnAuthenticated = () => {
    //return <UnAuthenticated onLogin={onLogin}/>
    return <Authenticated onLogout={onLogout} onLogin={onLogin}/>
  }

  const renderAuthenticated = () => {
    return  <Spin spinning={isLoading}>
        <Authenticated onLogout={onLogout} onLogin={onLoginAttempted}/>
      </Spin>
  }

  if (isLogin) {
    return renderAuthenticated()
  } else {
    return renderUnAuthenticated()
  }
}

export default AuthGateway
