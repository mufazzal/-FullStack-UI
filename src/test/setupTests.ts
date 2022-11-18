import '@testing-library/jest-dom/extend-expect'
import fetchMock_ from 'jest-fetch-mock'
import '@babel/polyfill'
import '@testing-library/react/dont-cleanup-after-each'

const init = () => {
  // @ts-expect-error
  global.IS_REACT_ACT_ENVIRONMENT = true
  // @ts-expect-error
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  // @ts-expect-error
  self.IS_REACT_ACT_ENVIRONMENT = true
  // @ts-expect-error
  window.IS_REACT_ACT_ENVIRONMENT = true
  // @ts-expect-error
  // this.IS_REACT_ACT_ENVIRONMENT = true

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })

  global.console = {
    ...console,
    // uncomment to ignore a specific log level
    // log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }
  fetchMock_.enableMocks()
  global.fetch = fetch as any
}

init()
