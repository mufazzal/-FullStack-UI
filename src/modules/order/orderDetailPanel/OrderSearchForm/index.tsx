import React from 'react'
// import './orderList.scss';
import { BaseProps } from '@modals/basePropsInterface'
import { OrderSearchQuery } from '@modals/Order/order'
// import { Avatar, Button, List, Skeleton, Input } from 'antd';

import Avatar from 'antd/es/avatar'
import Button from 'antd/es/button'
import List from 'antd/es/list'
import Skeleton from 'antd/es/skeleton'
import Input from 'antd/es/input'

const { Search } = Input

interface OrderSearchFormOwnProps extends BaseProps {
  orderSearchQuery?: OrderSearchQuery
  onSearchQueryChange: (orderSearchQuery: OrderSearchQuery) => void
}

const OrderSearchForm: React.FC<OrderSearchFormOwnProps> = (props: OrderSearchFormOwnProps) => {
  const [searchedOrderId, setSearchedOrderId] = React.useState<string | undefined>(props.orderSearchQuery?.orderId)
  const onSearchOrderId = (value: string) => {
    setSearchedOrderId(value)
    props.onSearchQueryChange({ orderId: value })
  }

  return (
        <div>
            <Search
                defaultValue={searchedOrderId}
                placeholder="input Order ID"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearchOrderId}
            />
        </div>
  )
}
export default OrderSearchForm
