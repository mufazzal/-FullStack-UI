import { Navigate, Outlet, NavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react'
import Layout from 'antd/es/layout'
const { Header } = Layout
import { useTranslation } from "react-i18next";

export const ProtectedLayout = () => {
    const { user } = useAuth0()
    const { t } = useTranslation();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
        <Header>
            <NavLink to="/home"> {t('label_home')} </NavLink>
            <NavLink to="/order"> {t('label_order')} </NavLink>
            <NavLink to="/Service"> {t('label_services')} </NavLink>
            <NavLink to="/support"> {t('label_support')} </NavLink>
          </Header>
      <Outlet />
    </div>
  )
}
