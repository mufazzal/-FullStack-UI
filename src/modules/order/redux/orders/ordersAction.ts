import { OrderModal } from '@modals/Order/order'
import { BaseAction } from '@modals/redux/BaseAction'
import { Dispatch } from 'react'

export const ACT = {
  SET_ORDERS: '@orders/SET_ORDERS'
}

export interface SetOrdersAction extends BaseAction {
  orders: OrderModal[]
  payload: {
    orders: OrderModal[]
    lastStatusTime: string
  }
}

export const fetchOrders = () => {
  return (dispatch: Dispatch<any>, getState: any) => {
    void fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => {
        dispatch(setOrdersAction([
          {
            productDesc: '3M Cleaner ---',
            orderId: 'sbg6sdfd',
            orderDate: '20.09.2022'
          },
          {
            productDesc: 'Car Duster',
            orderId: 'gfbvcrt798',
            orderDate: '20.09.2022'
          },
          {
            productDesc: 'Unity Gel',
            orderId: 'fgd454',
            orderDate: '20.09.2022'
          },
          {
            productDesc: undefined,
            orderId: 'fgd454',
            orderDate: '20.09.2022'
          },
          {
            productDesc: 'Side mirror',
            orderId: 'fgbfdf67',
            orderDate: '20.09.2022'
          }]))
      })
  }
}

export const setOrdersAction = (orders: OrderModal[]) => {
  return {
    type: ACT.SET_ORDERS,
    payload: {
      orders,
      lastStatusTime: new Date().toString()
    }
  } as SetOrdersAction
}

// export const setOrders = createAction<number, string>('orders/setOrders')
