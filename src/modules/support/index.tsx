import React from 'react'
import LiveTicketWidget from './liveTicketWidget'
import PageHeader from 'antd/lib/page-header'
import { useTranslation } from 'react-i18next'

const SupportIndex = (props: any) => {
  const { t } = useTranslation()

  return (<div className="supportIndex">
      <PageHeader ghost={false} title={t('support:pageTitle')} />
        <LiveTicketWidget />
      </div>)
}

export default SupportIndex
