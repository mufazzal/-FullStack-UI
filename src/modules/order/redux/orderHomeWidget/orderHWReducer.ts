import { OrderModal } from '@modals/Order/order'
// import { BaseAction } from '@modals/redux/BaseAction';
// import { BaseReducer } from '@modals/redux/baeReducer';
// import { createReducer } from '@reduxjs/toolkit'
import AppState from '@modals/redux/BaseState'
import { Reducer, Action } from 'redux'
import { SetOrderHomeWidgetAction, SetOrderHomeWidgetErrorAction } from './orderHWAction'
import { initialState } from './main'
import { OrderHWData } from '@modals/Order/orderHWData'

export interface OrderHomeWidgetState extends AppState {
  orderHWData: OrderHWData
  errorMessage: string | undefined
}

export const setOrderHomeWidgetErrorReducer: Reducer<OrderHomeWidgetState> = (state: OrderHomeWidgetState = initialState, action: Action) => {
  const _action = action as SetOrderHomeWidgetErrorAction

  return {
    ...state,
    errorMessage: _action.payload.errorMsg
  }
}

export const setOrderHomeWidgetReducer: Reducer<OrderHomeWidgetState> = (state: OrderHomeWidgetState = initialState, action: Action) => {
  const _action = action as SetOrderHomeWidgetAction
  // console.log("redddd->", _action.payload.totalOrder, _action.payload.pendingOrder, _action.payload.canceledOrder)

  return {
    ...state,
    orderHWData: {
      totalOrder: _action.payload.totalOrder,
      pendingOrder: _action.payload.pendingOrder,
      canceledOrder: _action.payload.canceledOrder,
      lastStatusTime: _action.payload.lastStatusTime
    }
  }
}

// export default (state: OrdersState = initialState, action: SetOrdersAction) => {
//     return
// }
