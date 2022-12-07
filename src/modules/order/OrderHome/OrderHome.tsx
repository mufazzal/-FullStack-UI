import React, { Dispatch } from 'react'
// import './OrderHome.css';
// import { Button, Col, Row, Badge, Descriptions } from 'antd';

import Button from 'antd/es/button'
import Col from 'antd/es/col'
import Row from 'antd/es/row'
import Descriptions from 'antd/es/descriptions'

import SearchOutlined from '@ant-design/icons/SearchOutlined'
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined'
import OrderListIndex from '../OrderList'
import OrderEditor from '../OrderEditor'
import { BaseProps } from '@modals/basePropsInterface'
import { OrderModal } from '@modals/Order/order'
import { connect } from 'react-redux'
import AppSate from '@modals/redux/BaseState'
import { setOrdersAction, fetchOrders } from '@modules/order/redux/orders/ordersAction'

interface OrderHomeStateProps {
  orderList: OrderModal[]
}
interface OrderHomeDispatchProps {
  fetchOrders?: () => void
}
interface OrderHomeState {
  showOrderEditor: boolean
}

interface OrderHomeProps extends OrderHomeStateProps, OrderHomeDispatchProps, BaseProps {}

class OrderHome extends React.Component<OrderHomeProps, OrderHomeState> {
  constructor (props: OrderHomeProps) {
    super(props)
    this.state = {
      showOrderEditor: false
    } as OrderHomeState
  }

  onCreateOrderClick () {
    console.log(this)
    this.setState({ showOrderEditor: true })
  }

  onEditorClose () {
    console.log(this)
    this.setState({ showOrderEditor: false })
  }

  UNSAFE_componentWillMount () {
    (this.props.fetchOrders != null) && this.props.fetchOrders()
    // fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => {
    // this.props.setOrders && this.props.setOrders(
    // )
    // this.setState({
    //   orderList: [
    //     {
    //       productDesc: "3M Cleaner",
    //       orderId: "sbg6sdfd",
    //       orderDate: "20.09.2022"
    //     },
    //     {
    //       productDesc: "Car Duster",
    //       orderId: "gfbvcrt798",
    //       orderDate: "20.09.2022"
    //     },
    //     {
    //       productDesc: "Unity Gel",
    //       orderId: "fgd454",
    //       orderDate: "20.09.2022"
    //     },
    //     {
    //       productDesc: undefined,
    //       orderId: "fgd454",
    //       orderDate: "20.09.2022"
    //     },
    //     {
    //       productDesc: "Side mirror",
    //       orderId: "fgbfdf67",
    //       orderDate: "20.09.2022"
    //     },]
    // })
    // })
  }

  render () {
    return (<div className="OrderHome">

      <Row>
        <Col md={15} lg={18}>
          <Descriptions size="small" bordered>
            <Descriptions.Item label="Total Order">{this.props.orderList ? this.props.orderList.length : '-'}</Descriptions.Item>
            <Descriptions.Item label="Pending Order">10</Descriptions.Item>
            <Descriptions.Item label="Confirmed Order">10</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col md={9} lg={6}>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => this.onCreateOrderClick()} />
          {/* this.onCreateOrderClick.bind(this) */}
          <Button
            type="primary"
            icon={<SearchOutlined />} />
        </Col>
      </Row>

      {this.state.showOrderEditor
        ? <OrderEditor onEditorClose={this.onEditorClose.bind(this)} />
        : <OrderListIndex orderList={this.props.orderList} />
      }

    </div>)
  }
}

const mapStateToProps = (state: AppSate) => {
  return {
    orderList: (state as any)?.orderList?.orders
  }
}

const mapDispatchToProps: Dispatch<any> = (dispatch: Dispatch<any>) => {
  return {
    // setOrders: (orders: OrderModal[]) => { dispatch(setOrdersAction(orders))},
    fetchOrders: () => { dispatch(fetchOrders()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHome)
// export default OrderHome
