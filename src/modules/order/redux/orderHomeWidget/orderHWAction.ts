import { OrderModal } from '@modals/Order/order'
import { BaseAction } from '@modals/redux/BaseAction'
import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'react'

export const ACT = {
  SET_HOME_WIDGET_ORDERS: '@orders/SET_HOME_WIDGET_ORDERS',
  SET_HOME_WIDGET_ORDERS_ERROR: '@orders/SET_HOME_WIDGET_ORDERS_ERROR'
}

export interface SetOrderHomeWidgetAction extends BaseAction {
  payload: {
    totalOrder: number
    pendingOrder: number
    canceledOrder: number
    lastStatusTime: string | undefined
  }
}

export interface SetOrderHomeWidgetErrorAction extends BaseAction {
  payload: {
    errorMsg: string | undefined
    err: any | undefined
  }
}

/*eslint-disable */
export const fetchOrderHWData = () => {
  return (dispatch: Dispatch<any>, getState: any) => {
    axios.get('http://localhost:3010/api/homeWidget', { headers: { Authorization: 'Bearer ' + window.access_token } })
      .then((res: AxiosResponse) => {
        dispatch(setOrderHomeWidgetErrorAction(undefined, undefined))
        dispatch(setOrderHomeWidgetAction(res.data.totalOrder, res.data.pendingOrder, res.data.canceledOrder, new Date().getTime() + ''))
      }).catch(err => {
        console.log(err)
        dispatch(setOrderHomeWidgetErrorAction(err, typeof err === 'string' ? err : 'Something went wrong'))
      })

    // fetch('http://localhost:3010/api/homeWidget', {headers: {Authorization: 'Bearer ' + window.access_token}})
    // .then(res => res.json())
    // .then(res => {
    //     //res = {totalOrder: 10, pendingOrder: 3, canceledOrder: 7}
    //     dispatch(setOrderHomeWidgetAction(res.totalOrder, res.pendingOrder, res.canceledOrder, new Date().getTime()+""))
    // }).catch(err => {
    //     dispatch(setOrderHomeWidgetErrorAction(err, typeof err === 'string' ? err :  "Something went wrong"))
    // })
  }
}

export const setOrderHomeWidgetErrorAction = (err: any, errorMsg: string | undefined) => {
  return {
    type: ACT.SET_HOME_WIDGET_ORDERS_ERROR,
    payload: {
      errorMsg,
      err: err ? err.toString() : undefined
    }
  } as SetOrderHomeWidgetErrorAction
}

export const setOrderHomeWidgetAction = (totalOrder: number, pendingOrder: number, canceledOrder: number, statusTime: string) => {
  // console.log("acccc->", totalOrder, pendingOrder, canceledOrder)

  return {
    type: ACT.SET_HOME_WIDGET_ORDERS,
    payload: {
      totalOrder,
      pendingOrder,
      canceledOrder,
      lastStatusTime: statusTime
    }
  } as SetOrderHomeWidgetAction
}

// export const setOrders = createAction<number, string>('orders/setOrders')
