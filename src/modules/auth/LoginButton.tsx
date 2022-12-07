import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
// import { Button } from 'antd';
import Button from 'antd/es/button'

import { BaseProps } from '@modals/basePropsInterface'
import { useTranslation } from "react-i18next";

interface LoginButtonOwnProps extends BaseProps {
  onLogin: (token: string) => void
}

const LoginButton: React.FC<LoginButtonOwnProps> = (props: LoginButtonOwnProps) => {
  const useAuth0_ = useAuth0()
  const { isAuthenticated, user, getAccessTokenWithPopup, loginWithRedirect } = useAuth0_
  const [isTokenGenerated, setIsTokenGenerated] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setLoading] = useState<boolean | undefined>(false)

  const { t } = useTranslation();

//   useEffect(() => {
// console.log('user?.name', user?.name)    
//     if (user?.name) {
//       setLoading(true)
//       void getAccessTokenWithPopup({ scope: 'offline_access read:homeWidget read:supportWidget', audience: 'https://mufreact' })
//         .then(res => {
//           setLoading(false)
//           console.log('getAccessTokenWithPopup --> ', res)
//           setIsTokenGenerated(true)
//           props.onLogin(res)
//         }).catch(_error => {
//           setLoading(false)
//           setError('Something went wrong with Token Generation')
//         })
//     }
//   }, [user?.name])

  const attempLogin = () => {
    setLoading(true)
    void loginWithRedirect()
      .then((resLogin: any) => {
        console.log('Login popup opened', resLogin)
      }) 
  }

  return <Button
            onClick={attempLogin}
            loading={isLoading}>
              {t('label_login')}
          </Button>
}

export default LoginButton
