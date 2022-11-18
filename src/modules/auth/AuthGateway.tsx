import React, { useEffect, useState } from 'react'
import loadable from '@loadable/component'
import setupAxiosForAuthUser from '@utils/axiosSetup'

const UnAuthenticated = loadable(async () => await import('./UnAuthenticated'))
const Authenticated = loadable(async () => await import('./Authenticated'))

const AuthGateway = () => {
  const [isLogin, setLogin] = useState(false)

  const onLogin = (access_token: string) => {
    (window as any).access_token = access_token
    setLogin(true)
    setupAxiosForAuthUser(access_token)
  }
  const onLogout = () => {
    console.log('onLogout')
    setLogin(false)
  }

  const renderUnAuthenticated = () => {
    return <UnAuthenticated onLogin={onLogin}/>
  }

  const renderAuthenticated = () => {
    return <Authenticated onLogout={onLogout} />
  }

  if (isLogin) {
    return renderAuthenticated()
  } else {
    return renderUnAuthenticated()
  }
}

export default AuthGateway
