import React from 'react'
import { render, act } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { rootReducer } from '../redux/rootReducer'
import AppState from '../interfaces/redux/BaseState'

const reduxConnectedCompRender = async (ui: React.ReactElement, reduxState: AppState, { ...renderOptions }): any => {
  const store = configureStore({ reducer: rootReducer, preloadedState: reduxState })

  const Wrapper = ({ children }: { children: any }) => (
        <Provider store={store}>{children}</Provider>
  )
  // const oo =  (await act( async () => render(ui, { wrapper: Wrapper, ...renderOptions })));
  // return oo;
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export default reduxConnectedCompRender
