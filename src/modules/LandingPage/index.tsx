import React, { useEffect } from 'react'
import LoginButton from '@modules/auth/LoginButton'
import { useTranslation } from 'react-i18next'

import { BaseProps } from '@modals/basePropsInterface'

interface LandingPageOwnProps extends BaseProps {
  onLogin: (token: string) => void
}

const LandingPage: React.FC<LandingPageOwnProps> = (props: LandingPageOwnProps) => {
  const { t } = useTranslation()

  return <div>

        <LoginButton onLogin={props.onLogin}/>

    </div>
}

export default LandingPage
