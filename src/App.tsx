import React, { useEffect } from 'react'
import AuthGateway from '@modules/auth/AuthGateway'
import PageHeader from 'antd/lib/page-header'
import LangChange from '@modules/LangChange'
import { useTranslation } from 'react-i18next'
import '../i18n/i18n'

const App = () => {
  const { t } = useTranslation()

  return <div>
    <React.Suspense fallback="Loading..">
      <PageHeader ghost={false} title={t('siteName')}
        extra={[
          <LangChange key="1"/>
        ]}
      />
      ttttter
      <AuthGateway />
    </React.Suspense>
  </div>
}

export default App
