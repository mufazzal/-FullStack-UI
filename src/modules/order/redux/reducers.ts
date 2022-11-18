import { CollectiveReducers } from '@modals/redux/collectiveReducers'
// import orderListReducer from '@modules/order/redux/orders/main'
import orderHomeWidgetReducer from '@modules/order/redux/orderHomeWidget/main'

const staticReducers = {
  orderHomeWidget: orderHomeWidgetReducer
}

const dynamicReducers = {
  // orderList: import('@modules/order/redux/orders/main')
}

const orderIndexReducer: CollectiveReducers = {
  staticReducers,
  getDynamicReducers: async () => {
    const dynamicReducers = {
      orderList: (await import('@modules/order/redux/orders/main')).default
    }
    return dynamicReducers
  }
}

export default orderIndexReducer
