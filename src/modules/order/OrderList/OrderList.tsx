import React from 'react'
import './orderList.scss'
import { BaseProps } from '@modals/basePropsInterface'
import { OrderModal } from '@modals/Order/order'
// import { Avatar, Button, List, Skeleton } from 'antd';

import Avatar from 'antd/lib/avatar'
import List from 'antd/lib/list'
import Skeleton from 'antd/lib/skeleton'

import OrderDetailPanel from '../orderDetailPanel/OrderDetailPanel'

interface OrderListOwnProps extends BaseProps {
  orderList: OrderModal[] // Array<OrderModal> // [OrderModal]
}

const OrderList: React.FC<OrderListOwnProps> = (props: OrderListOwnProps) => {
  // const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = React.useState<boolean>(false)
  const [orderForOrderDetail, setOrderForOrderDetail] = React.useState<OrderModal | undefined>(undefined)

  const onOrderDetailModalClose = () => {
    setOrderForOrderDetail(undefined)
  }
  const onClickOrderDetail = (order: OrderModal) => {
    setOrderForOrderDetail(order)
  }
  return (
    <div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={props.orderList}
        renderItem={(item: OrderModal) => (
          <List.Item
            actions={[<a key="list-loadmore-edit" onClick={() => onClickOrderDetail(item)}>Detail</a>]}>
            <Skeleton avatar title={false} loading={!item.productDesc} active>
              <List.Item.Meta
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                avatar={<Avatar src={`https://dummyimage.com/300.png/09f/fff&text=${item.productDesc}`} />}
                title={<a href="#">{item.productDesc}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </Skeleton>
          </List.Item>
        )}
      />
      {(orderForOrderDetail != null)
        ? <OrderDetailPanel
          order={orderForOrderDetail}
          onModalClose={onOrderDetailModalClose}/>
        : ''}
    </div>
  )
}
export default OrderList
