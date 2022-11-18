import { AnyAction } from 'redux'

export interface BaseAction extends AnyAction {
  payload: Object
  type: string
}
