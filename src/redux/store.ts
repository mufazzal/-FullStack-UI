// import rootReducer from './rootReducer'
import { rootReducer, addModulesReducres } from './rootReducer'

import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import thunk from 'redux-thunk'

import logger from 'redux-logger'

const middleware = [logger, thunk]

const store = configureStore({
  reducer: rootReducer,
  middleware
}) as any

store.dynamicReducers = {}
store.injectModuleReducers = async (module: string | undefined) => {
  const newReducers = await addModulesReducres(store.dynamicReducers, module)

  store.replaceReducer(newReducers)
}

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch()
// export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store
