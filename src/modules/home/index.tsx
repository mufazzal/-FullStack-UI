import React, { useContext } from 'react'
import OrderHomeWidget from '@modules/order/OrderWidget/OrderHomeWidget'
import AppContext from '@srcRoot/appContext/appContext'
import AppContextInt from '@modals/appContext'
import { useTranslation } from 'react-i18next'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from '@modules/auth/LogoutButton'

import { useNavigate, NavLink } from 'react-router-dom'
import Button from 'antd/lib/button'

const Home = (props: any) => {
  const appContext: AppContextInt = useContext<AppContextInt>(AppContext)
  const { user } = useAuth0()
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (<div className="Home_Order_widger">

    <div style={{ width: '200px', height: '50px' }}>
      Context: {appContext.tanentName}
      {t('welcomeMessage', { user: user?.name })}
      <LogoutButton onLogout={props.onLogout} />
    </div>

    <div style={{ width: '200px', height: '100px', margin: '36px 0 0 0' }}>
      <NavLink to="/routing_demo/abc/xyz?queryParam1=pqr&queryParam2=tuv"> Routing Demo </NavLink>

      <Button onClick={() => {
        navigate('/routing_demo/qaz/wsx?queryParam1=mju&queryParam2=rfv', { state: { stKey1: 'stValue1', stKey2: 'stValue2' } })
      } }>
          Routing Demo 1
      </Button>

    </div>

    <div style={{ width: '600px', height: '200px' }}>
      <OrderHomeWidget />
    </div>
  </div>)
}

export default Home
