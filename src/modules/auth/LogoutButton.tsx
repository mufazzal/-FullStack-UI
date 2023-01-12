import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { BaseProps } from '@modals/basePropsInterface'
// import { Button } from 'antd';
import Button from 'antd/lib/button'
import { useTranslation } from 'react-i18next'

interface LogoutButtonOwnProps extends BaseProps {
  onLogout: () => void
}

const LogoutButton: React.FC<LogoutButtonOwnProps> = (props: LogoutButtonOwnProps) => {
  const { logout } = useAuth0()
  const { t } = useTranslation()

  const onLogout = () => {
    logout({ returnTo: window.location.origin })
    props.onLogout()
  }

  return (
    <Button
      onClick={onLogout}>
      {t('label_logout')}
    </Button>
  )
}

export default LogoutButton
