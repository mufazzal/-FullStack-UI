import { CollectiveReducers } from '@modals/redux/collectiveReducers'

const staticReducers = {
}

const servicesIndexReducer: CollectiveReducers = {
  staticReducers,
  getDynamicReducers: async () => {
    const dynamicReducers = {
      serviceList: (await import('@modules/services/redux/serviceList/serviceListSlice')).default
    }
    return dynamicReducers
  }
}

export default servicesIndexReducer
