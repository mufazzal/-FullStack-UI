import React, { useEffect } from 'react'
import LandingPage from '@modules/LandingPage'

import { BaseProps } from '@modals/basePropsInterface'

interface UnAuthenticatedOwnProps extends BaseProps {
  onLogin: (token: string) => void
}

const UnAuthenticated: React.FC<UnAuthenticatedOwnProps> = (props: UnAuthenticatedOwnProps) => {
  return <LandingPage onLogin={props.onLogin}/>
}

export default UnAuthenticated
