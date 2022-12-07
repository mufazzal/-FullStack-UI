import React, { useContext } from 'react'
import OrderHomeWidget from '@modules/order/OrderWidget/OrderHomeWidget'
import AppContext from '@srcRoot/appContext/appContext'
import AppContextInt from '@modals/appContext'
import { useTranslation } from "react-i18next";
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from '@modules/auth/LogoutButton';

const Home = (props: any) => {
  const appContext: AppContextInt = useContext<AppContextInt>(AppContext)
  const { user } = useAuth0()
  const { t } = useTranslation();

  return (<div className="Home_Order_widger">
        Context: {appContext.tanentName}
        {t('welcomeMessage', {user: user?.name})}
        <LogoutButton onLogout={props.onLogout} />

      <OrderHomeWidget />
    </div>)
}

export default Home
