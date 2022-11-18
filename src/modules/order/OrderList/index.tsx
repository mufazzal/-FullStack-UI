import React from 'react'
import OrderList from './OrderList'
import { BaseProps } from '@modals/basePropsInterface'
import { OrderModal } from '@modals/Order/order'

interface OrderListIndexOwnFormProps extends BaseProps {
  orderList: OrderModal[]
}

const OrderListIndex: React.FC<OrderListIndexOwnFormProps> = (props: OrderListIndexOwnFormProps) => {
  // const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  return (<div className='OrderEditorWrapper'>

    <OrderList orderList={props.orderList}/>

  </div>)
}
export default OrderListIndex
