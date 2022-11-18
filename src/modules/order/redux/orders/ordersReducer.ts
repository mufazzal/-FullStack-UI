import { OrderModal } from '@modals/Order/order'
// import { BaseAction } from '@modals/redux/BaseAction';
// import { BaseReducer } from '@modals/redux/baeReducer';
// import { createReducer } from '@reduxjs/toolkit'
import AppState from '@modals/redux/BaseState'
import { Reducer, Action } from 'redux'
import { SetOrdersAction } from './ordersAction'
import { initialState } from './main'

export interface OrdersState extends AppState {
  orders: OrderModal[]
  lastStatusTime: string | undefined
}

export const setOrdersReducer: Reducer<OrdersState> = (state: OrdersState = initialState, action: Action) => {
  const _action = action as SetOrdersAction
  return {
    ...state,
    orders: _action.payload.orders,
    lastStatusTime: _action.payload.lastStatusTime
  }
}

// export default (state: OrdersState = initialState, action: SetOrdersAction) => {
//     return
// }
