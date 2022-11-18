// import { Breadcrumb, Layout, Menu } from 'antd';
import Layout from 'antd/es/layout'

import React, { useEffect } from 'react'
// import OrderIndex from './modules/order/index'
// import SupportIndex from './modules/support';
import Home from '@modules/home'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import loadable from '@loadable/component'
import store from '../../redux/store'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './LogoutButton'
import { BaseProps } from '@modals/basePropsInterface'
import { Provider } from 'react-redux'
import builConfig from '../../../appConfig/buildConfig'
const { Header, Content, Footer } = Layout
import { useTranslation } from "react-i18next";
import { loadModuleTxFile } from '../../../i18n/i18n'

// import OrderIndex from '@modules/order/index'
// import SupportIndex from '@modules/support/index'
// import ServiceIndex from '@modules/services'

const OrderIndex = loadable(async () => {
  const fff = await store.injectModuleReducers('order')
  await loadModuleTxFile('order')
  return await import('@modules/order/index')
})

const ServiceIndex = loadable(async () => {
  const fff = await store.injectModuleReducers('service')
  return await import('@modules/services')
})

const SupportIndex = loadable(async () => {
  await loadModuleTxFile('support')
  return await import('@modules/support/index')
})

interface AuthenticatedOwnProps extends BaseProps {
  onLogout: () => void
}

const Authenticated: React.FC<AuthenticatedOwnProps> = (props: AuthenticatedOwnProps) => {
  const { user } = useAuth0()
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <Layout className="layout">
        {t('welcomeMessage', {user: user?.name})}
        <LogoutButton onLogout={props.onLogout} />
        <BrowserRouter>
          <Header>
            <NavLink to="/"> {t('label_home')} </NavLink>
            <NavLink to="/order"> {t('label_order')} </NavLink>
            <NavLink to="/Service"> {t('label_services')} </NavLink>
            <NavLink to="/support"> {t('label_support')} </NavLink>
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/order" element={<OrderIndex />} />
              <Route path="/service" element={<ServiceIndex />} />
              <Route path="/support" element={<SupportIndex />} />
            </Routes>
          </Content>
        </BrowserRouter>
        <Footer>
          {
            `${builConfig.STAGE} | ${builConfig.VERSION} | ${builConfig.IS_NODE_PRODUCTION} | ${builConfig.BUILD}`
          }
        </Footer>
      </Layout>
    </Provider>
  )
}

export default Authenticated
