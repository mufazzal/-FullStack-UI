import { ACT } from './ordersAction'
import { setOrdersReducer, OrdersState } from './ordersReducer'
import { BaseAction } from '@modals/redux/BaseAction'
import AppSate from '@modals/redux/BaseState'

// [ACT.SET_ORDERS] = setOrdersReducer

export const initialState = {
  orders: [],
  lastStatusTime: undefined
} as OrdersState

export default (state: OrdersState = initialState, action: BaseAction): AppSate => {
  switch (action.type) {
    case ACT.SET_ORDERS:
      return setOrdersReducer(state, action)
    default:
      return state
  }
}
