import { ACT } from './orderHWAction'
import { setOrderHomeWidgetReducer, setOrderHomeWidgetErrorReducer, OrderHomeWidgetState } from './orderHWReducer'
import { BaseAction } from '@modals/redux/BaseAction'
import AppSate from '@modals/redux/BaseState'

export const initialState = {
  orderHWData: {
    totalOrder: 0,
    pendingOrder: 0,
    canceledOrder: 0
  }

} as OrderHomeWidgetState

export default (state: OrderHomeWidgetState = initialState, action: BaseAction): AppSate => {
  switch (action.type) {
    case ACT.SET_HOME_WIDGET_ORDERS:
      return setOrderHomeWidgetReducer(state, action)
    case ACT.SET_HOME_WIDGET_ORDERS_ERROR:
      return setOrderHomeWidgetErrorReducer(state, action)
    default:
      return state
  }
}
