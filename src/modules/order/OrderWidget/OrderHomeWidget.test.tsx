import { render, screen, within, waitFor, cleanup, fireEvent } from '@testing-library/react'
import OrderHomeWidget from './OrderHomeWidget'
import reduxConnectedCompRender from '@_test/reduxConnectedCompRender'
import { act } from 'react-dom/test-utils'

// beforeAll(() => {
//   init()
// });

// screen.debug()

/*eslint-disable */
beforeEach(() => {
  console.log('-----beforeEach: file level------')
  fetch.resetMocks()
})
afterEach(() => {
  console.log('-----afterEach: file level------')
  // cleanup()
})

describe('Testing Order Home widget Success', () => {
  const orderHomeWidgetReduxState = {
    orderHomeWidget: {
      // totalOrder: 10,
      // pendingOrder: 5,
      // canceledOrder: 5
    }
  }

  beforeAll(() => {
    console.log('--------beforeAll: in describe 1---------')

    fetch.mockResponse(JSON.stringify({ totalOrder: 100, pendingOrder: 75, canceledOrder: 25 }))
    reduxConnectedCompRender(<><OrderHomeWidget /></>, orderHomeWidgetReduxState, {})
  })

  it('Shoud display Page Title', async () => {
    console.log('--------it: in first 1---------')

    const sectiontitle = await screen.findByTestId(/sectiontitle/i)
    expect(sectiontitle).toBeInTheDocument()
  })
  it('Shoud display all values of API', async () => {
    console.log('--------it: in second---------')

    const items_list_wrap = await screen.findByTestId(/order_items_list_wrap/i)
    expect(items_list_wrap).toBeInTheDocument()

    const order_item_total = within(items_list_wrap).getByText('100')
    expect(order_item_total).toBeInTheDocument()

    const order_item_pending = within(items_list_wrap).getByText('75')
    expect(order_item_pending).toBeInTheDocument()

    const order_item_cancel = within(items_list_wrap).getByText('25')
    expect(order_item_cancel).toBeInTheDocument()
  })

  it('Shoud updare UI on click refresh', async () => {
    console.log('--------it: in third---------')
    fetch.mockResponse(JSON.stringify({ totalOrder: 507567, pendingOrder: 35, canceledOrder: 15 }))

    fireEvent.click(screen.getByTestId('refresh'))
    const newTotalVal = await screen.findByText('507567')
    expect(newTotalVal).toBeInTheDocument()
  })

  afterAll(() => {
    console.log('--------afterAll: in describe 1---------')
    cleanup()
  })
})

describe('Testing Order Home widget API Fail', () => {
  const orderHomeWidgetReduxState = {
    orderHomeWidget: {
    }
  }
  beforeAll(() => {
    console.log('--------beforeAll: in describe 2---------')

    fetch.mockReject('fake error message')
    reduxConnectedCompRender(<><OrderHomeWidget /></>, orderHomeWidgetReduxState, {})
  })

  it('should show error message', async () => {
    const sectiontitle = await screen.findByTestId(/sectiontitle/i)
    expect(sectiontitle).toBeInTheDocument()

    await waitFor(() => expect(screen.getByTestId(/error/i)).toBeInTheDocument())

    expect(screen.getByText('fake error message')).toBeInTheDocument()
  })

  afterAll(() => {
    console.log('--------afterAll: in describe 2---------')
    cleanup()
  })
})