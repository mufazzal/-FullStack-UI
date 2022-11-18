import React, { useContext } from 'react'
import OrderHomeWidget from '@modules/order/OrderWidget/OrderHomeWidget'
import AppContext from '@srcRoot/appContext/appContext'
import AppContextInt from '@modals/appContext'

const Home = (props: any) => {
  const appContext: AppContextInt = useContext<AppContextInt>(AppContext)

  return (<div className="Home_Order_widger">
      Context: {appContext.tanentName}
      <OrderHomeWidget />
    </div>)
}

export default Home
