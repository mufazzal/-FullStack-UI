import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ServiceItemModal } from '@modals/services/serviceItem'
import { Dispatch } from 'react'

interface Services {
  services: ServiceItemModal[]
  lastStatusUpdateTime: string
  loading: boolean
  error: string | undefined
}

interface SetServicesPayload {
  services: ServiceItemModal[]
  lastStatusUpdateTime: string
}

const initialState = {
  services: [],
  lastStatusUpdateTime: '',
  loading: false,
  error: undefined
} as Services

const fetchServiceList = createAsyncThunk(
  'fetchServiceList',
  async (p1, p2) => {
    const result = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => {
        return {
          lastStatusUpdateTime: new Date().toString(),
          services: [{
            serviceId: 'sd',
            serviceName: 'scdcsdcd',
            startDate: 'dddd'
          }, {
            serviceId: 'cxc',
            serviceName: 'cass',
            startDate: 'rtyuj'
          }]
        }
      })
    return result
  }
)

const counterServicesSlice = createSlice({
  name: 'serviceListState',
  initialState,
  reducers: {
    setServices (state, action: PayloadAction<SetServicesPayload>) {
      state.services = action.payload.services
      state.lastStatusUpdateTime = action.payload.lastStatusUpdateTime
    }
    // decrement(state) {
    //   state.value--
    // },
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload
    // },
  },
  extraReducers: {
    [fetchServiceList.pending.type]: (state, action) => {
      state.loading = true
    },
    [fetchServiceList.fulfilled.type]: (state, action) => {
      state.loading = false
      state.services = action.payload.services
      state.lastStatusUpdateTime = action.payload.lastStatusUpdateTime
      state.error = undefined
    },
    [fetchServiceList.rejected.type]: (state, action) => {
      state.loading = false
      state.error = 'someting wrong'
    }
  }
})

// const fetchServiceList = () => {
//   return (dispatch: Dispatch<any>, getState: any) => {
//     fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(res => {
//         dispatch(setServices({
//           lastStatusUpdateTime: new Date().toString(),
//           services: [{
//               serviceId: "sd",
//               serviceName: "asd",
//               startDate: "dddd"
//             },{
//               serviceId: "cxc",
//               serviceName: "cass",
//               startDate: "rtyuj"
//             }]
//           }))
//     })
//   }
// }

const { setServices } = counterServicesSlice.actions
export { setServices, fetchServiceList }
export default counterServicesSlice.reducer
