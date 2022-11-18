import { combineReducers, Reducer } from 'redux'
import AppSate from '@modals/redux/BaseState'
import orderIndexReducer from '@modules/order/redux/reducers'
import servicesIndexReducer from '@modules/services/redux/indexReducers'

const staticReducers = {
  ...orderIndexReducer.staticReducers,
  ...servicesIndexReducer.staticReducers
  // ...orderIndexReducer.dynamicReducers
}

export const addModulesReducres = async (preLoadedDyanamicReducers: any, module: any) => {
  if (module) {
    let asynchReducers = {}
    if (module === 'order') {
      asynchReducers = await orderIndexReducer.getDynamicReducers()
    } else if (module === 'service') {
      asynchReducers = await servicesIndexReducer.getDynamicReducers()
    }

    return combineReducers({
      ...staticReducers,
      ...preLoadedDyanamicReducers,
      ...asynchReducers
    })
  }
}
export const rootReducer: Reducer<AppSate> = combineReducers<AppSate>(staticReducers)

// const createOrUpdateReducers: any = (module: string | undefined) => {
//     if(module){
//         let asynchReducers;
//         if(module === "order")
//             asynchReducers = orderIndexReducer.dynamicReducers
//         return combineReducers<AppSate>({
//             ...staticReducers.orders,
//             ...asynchReducers
//         })
//     }
//     else {
//         return combineReducers<AppSate>({
//             ...staticReducers.orders
//         })
//     }
// }

// export interface AppState = {

// }

// export default createOrUpdateReducers
