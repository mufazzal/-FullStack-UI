import { Reducer } from 'redux'

export interface BaseReducer {
  name: string
  initialState: Object
  reducers: Object

}
