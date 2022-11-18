import React, { Dispatch } from 'react'
import { BaseProps } from '@modals/basePropsInterface'
import { SupportSnapshot } from '@modals/support/support'
// import { Card, Descriptions, PageHeader } from 'antd';

import Descriptions from 'antd/es/descriptions'
import Card from 'antd/es/card'
import PageHeader from 'antd/es/page-header'

import AppSate from '@modals/redux/BaseState'
import { connect } from 'react-redux'
import { fetchOrderHWData } from '@modules/order/redux/orderHomeWidget/orderHWAction'
import { OrderHWData } from '@modals/Order/orderHWData'
import OrderHomeWidgetHeder from './OrderHomeWidgetHeder'

// import StylishDescription from './CaseStyleWidgt';

interface OrderHomeWidgetStateProps {
  orderHWData?: OrderHWData
  errorMessage?: string
}
interface OrderHomeWidgetDispatchProps {
  fetchOrderHWData?: () => void
}

interface OrderHomeWidgetProps extends OrderHomeWidgetStateProps, OrderHomeWidgetDispatchProps, BaseProps { }

const OrderHomeWidget: React.FC<OrderHomeWidgetProps> = (props: OrderHomeWidgetProps) => {
  console.log('----In Render----', props.orderHWData?.lastStatusTime)

  React.useEffect(() => {
    console.log('----In useEffect----')
    ;(props.fetchOrderHWData != null) && props.fetchOrderHWData()
  }, [])

  const expensiveValue = React.useMemo(() => {
    return new Date(props.orderHWData?.lastStatusTime ? props.orderHWData?.lastStatusTime * 1000 : 0).toString()
  }, [props.orderHWData?.lastStatusTime])

  // React.useEffect(() => {
  //     console.log('----In use effect----', props.orderHWData?.lastStatusTime)
  //     props.fetchOrderHWData && props.fetchOrderHWData()
  // }, [props.orderHWData?.lastStatusTime]) // ---> Infinite call

  // React.useEffect(() => {
  //     console.log('----In use effect----', props.orderHWData?.lastStatusTime)
  //     props.fetchOrderHWData && props.fetchOrderHWData()
  // }, [props.orderHWData]) // ---> Infinite call

  const onRefreshClick = () => {
    (props.fetchOrderHWData != null) && props.fetchOrderHWData()
  }

  return (<div className={'sd'}>

        <div data-testid="sectiontitle">Order</div>
        <OrderHomeWidgetHeder
            onRefreshClick={onRefreshClick}
            lastStatusTime={expensiveValue}/>
        {props.errorMessage ? <div data-testid="error">{props.errorMessage}</div> : ''}
        {(props.orderHWData != null)
          ? <div data-testid="order_items_list_wrap"><Card title="Order Items" data-testid="order_items_list_title">
                <Descriptions bordered={true} column={1}>
                    <Descriptions.Item label="Total Order" data-testid="order_items_list_total">{props.orderHWData.totalOrder}</Descriptions.Item>
                    <Descriptions.Item label="Pending" data-testid="order_items_list_pending">{props.orderHWData.pendingOrder}</Descriptions.Item>
                    <Descriptions.Item label="Cancel" data-testid="order_items_list_cancel">{props.orderHWData.canceledOrder}</Descriptions.Item>
                </Descriptions>
            </Card></div>
          : <div data-testid="order_item_loading">
                <div data-testid="loading">Loading..</div>
            </div>
        }

    </div>)
}

const mapStateToProps = (state: AppSate) => {
  return {
    orderHWData: (state as any)?.orderHomeWidget?.orderHWData,
    errorMessage: (state as any)?.orderHomeWidget?.errorMessage
  }
}

const mapDispatchToProps: Dispatch<any> = (dispatch: Dispatch<any>) => {
  return {
    fetchOrderHWData: () => dispatch(fetchOrderHWData())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHomeWidget)
