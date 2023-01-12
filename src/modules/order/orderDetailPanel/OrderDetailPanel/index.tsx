import React from 'react'
import OrderDetail from '../OrderDetail'
import { BaseProps } from '@modals/basePropsInterface'
import { OrderModal, OrderSearchQuery } from '@modals/Order/order'
import OrderSearchForm from '../OrderSearchForm'
// import { Modal, Divider } from 'antd';

import Modal from 'antd/lib/modal'
import Divider from 'antd/lib/divider'

interface OrderDetailPanelOwnProps extends BaseProps {
  order: OrderModal
  onModalClose?: () => void
}

const OrderDetailPanel: React.FC<OrderDetailPanelOwnProps> = (props: OrderDetailPanelOwnProps) => {
  const initSearchQuery = props.order ? { orderId: props.order.orderId } : undefined
  const [orderSearchQuery, setOrderSearchQuery] = React.useState<OrderSearchQuery | undefined>(initSearchQuery as OrderSearchQuery)

  const handleOk = () => {
    (props.onModalClose != null) && props.onModalClose()
  }
  const onSearchQueryChange = (query: OrderSearchQuery) => {
    setOrderSearchQuery({ orderId: query.orderId })
  }

  return (
        <Modal title="Basic Modal" open={true} onOk={handleOk} style={{ top: 20 }} width={1000}>
            <OrderSearchForm
                orderSearchQuery={orderSearchQuery}
                onSearchQueryChange={onSearchQueryChange} />
            <Divider orientation='left'> Detail </Divider>
            {orderSearchQuery?.orderId
              ? <OrderDetail orderId={orderSearchQuery?.orderId} />
              : 'Input Some Search term'
            }
        </Modal>
  )
}
export default OrderDetailPanel
