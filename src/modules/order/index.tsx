import React from 'react'
import OrderHome from './OrderHome/OrderHome'
import './orderIndex.css'
import { useTranslation } from 'react-i18next'
import PageHeader from 'antd/lib/page-header'

const OrderIndex = (props: any) => {
  const { t } = useTranslation()

  return (<div className="orderIndex">
        <PageHeader ghost={false} title={t('order:pageTitle')} />
        <OrderHome />
      </div>)
}

export default OrderIndex
