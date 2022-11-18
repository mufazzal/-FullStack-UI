import React from 'react'
import './orderDetail.scss'
import { BaseProps } from '@modals/basePropsInterface'
import { OrderDetailModal, OrderTrackingDetailModal, OrderedProductDetailModal, OrderPaymentDetailModal } from '@modals/Order/order'
// import { Descriptions, Spin, Row, Col } from 'antd';

import Descriptions from 'antd/es/descriptions'
import Spin from 'antd/es/spin'
import Row from 'antd/es/row'
import Col from 'antd/es/col'

import PaymentMethodes from '@modals/common/paymentMethodes'
import OrderStatuses from '@modals/common/OrderStatus'
import OrderTrackingStatuses from '@modals/common/OrderTrackStatus'

interface OrderDetailOwnProps extends BaseProps {
  orderId: string // Array<OrderModal> // [OrderModal]
}

const OrderDetail: React.FC<OrderDetailOwnProps> = (props: OrderDetailOwnProps) => {
  const [orderDetail, setOrderDetail] = React.useState<OrderDetailModal | undefined>(undefined)
  const [orderedProductDetail, setOrderedProductDetail] = React.useState<OrderedProductDetailModal | undefined>(undefined)
  const [orderTrackingDetail, setOrderTrackingDetail] = React.useState<OrderTrackingDetailModal | undefined>(undefined)
  const [orderPaymentDetail, setOrderPaymentDetail] = React.useState<OrderPaymentDetailModal | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    console.log('in the effect')
    setLoading(true)
    const promises: Array<Promise<OrderDetailModal | OrderTrackingDetailModal | OrderedProductDetailModal | OrderPaymentDetailModal>> = []
    const promise_order: Promise<OrderDetailModal> =
            fetch('https://jsonplaceholder.typicode.com/todos/1')
              .then(res => {
                return ({
                  orderId: props.orderId,
                  latestOrderStatus: OrderStatuses.CONFIRMED,
                  orderDate: `20.09.2008_${props.orderId}`
                } as OrderDetailModal)
              })
    promises.push(promise_order)
    const promise_order_product: Promise<OrderedProductDetailModal> =
            fetch('https://jsonplaceholder.typicode.com/todos/1')
              .then(res => {
                return ({
                  productId: `product_id_${props.orderId}`,
                  productName: `product_name_${props.orderId}`
                } as OrderedProductDetailModal)
              })
    promises.push(promise_order_product)
    const promise_order_track: Promise<OrderTrackingDetailModal> =
            fetch('https://jsonplaceholder.typicode.com/todos/1')
              .then(res => {
                return ({
                  trackId: props.orderId,
                  latestTrackStatus: OrderTrackingStatuses.IN_TRANSIT
                } as OrderTrackingDetailModal)
              })
    promises.push(promise_order_track)
    const promise_order_payment: Promise<OrderPaymentDetailModal> =
            fetch('https://jsonplaceholder.typicode.com/todos/1')
              .then(res => {
                return ({
                  payMentMode: PaymentMethodes.CREDIT_CARD,
                  paymentUid: `paymentUid_${props.orderId}`
                } as OrderPaymentDetailModal)
              })
    promises.push(promise_order_payment)

    void Promise.all(promises)
      .then(res => {
        console.log(res)
        const [orderDetail,
          orderedProductDetail,
          orderTrackingDetail,
          orderPaymentDetail] = res
        setOrderDetail(orderDetail as OrderDetailModal)
        setOrderedProductDetail(orderedProductDetail as OrderedProductDetailModal)
        setOrderTrackingDetail(orderTrackingDetail as OrderTrackingDetailModal)
        setOrderPaymentDetail(orderPaymentDetail as OrderPaymentDetailModal)
        setLoading(false)
      })

    return () => {
      console.log('Destroying Orderdetail')
    }
  }, [props.orderId])

  console.log('in the render')

  return (
        <Spin spinning={loading}>

            <h3>{orderDetail?.orderId}</h3>

            <Row gutter={[4, 4]}>
                <Col span="8">
                    <Descriptions title="Tracking Detail" bordered={true} column={1}>
                        <Descriptions.Item label="TrackId">{orderTrackingDetail?.trackId}</Descriptions.Item>
                        <Descriptions.Item label="Status">{orderTrackingDetail?.latestTrackStatus}</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span="8">
                    <Descriptions title="Product Detail" bordered={true} column={1}>
                        <Descriptions.Item label="Product Id">{orderedProductDetail?.productId}</Descriptions.Item>
                        <Descriptions.Item label="Product Name">{orderedProductDetail?.productName}</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span="8">
                    <Descriptions title="Payment Detail" bordered={true} column={1}>
                        <Descriptions.Item label="Mode">{orderPaymentDetail?.payMentMode}</Descriptions.Item>
                        <Descriptions.Item label="Payment Id">{orderPaymentDetail?.paymentUid}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>

            {/* <p>TrackId: {trackingDetail?.trackId}</p>
            <p>Latest Status: {trackingDetail?.latestStatus}</p>
            <p>Commnet: {trackingDetail?.commnet}</p>
            <p>
                {trackingDetail?.coveredCheckPoint?.map((trackItem: TrackingCheckPoint, index) => {
                    return <span key={index}>{trackItem.milestoneName}</span>
                })}
            </p> */}

        </Spin>
  )
}
export default OrderDetail
