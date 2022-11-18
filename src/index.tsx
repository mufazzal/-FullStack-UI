import React from 'react'
import ReactDOM from 'react-dom/client'
import '../style/site.scss'
import App from './App'
import { ThemeProvider } from 'styled-components'
import darkTheme from '../style/styled-dark-theme'
import lightTheme from '../style/styled-light-theme'

import { Auth0Provider } from '@auth0/auth0-react'
import AppContext from './appContext/appContext'
import tanent1Context from './appContext/tanent1'
import ErrorBoundary from '@comp/ErrorBoundary/ErrorBoundary'

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
)
root.render(
    <ErrorBoundary>
      <ThemeProvider theme={lightTheme}>
        <Auth0Provider
          domain="dev-muf-school.auth0.com"
          clientId="yvkvjse4Wi4g1phDAf06Mp9vkslDlSSV"
          redirectUri={window.location.origin}>
            <AppContext.Provider value={tanent1Context}>
              <App />
            </AppContext.Provider>
        </Auth0Provider>,
      </ThemeProvider>
    </ErrorBoundary>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
