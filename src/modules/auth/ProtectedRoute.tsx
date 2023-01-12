import { Navigate, Outlet, NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Layout from 'antd/lib/layout'
import { useTranslation } from 'react-i18next'
const { Header } = Layout

export const ProtectedLayout = () => {
  const { user } = useAuth0()
  const { t } = useTranslation()

  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <div>
        <Header>
            <NavLink to="/home"> {t('label_home')} </NavLink>
            <NavLink to="/order"> {t('label_order')} </NavLink>
            <NavLink to="/Service"> {t('label_services')} </NavLink>
            <NavLink to="/support"> {t('label_support')} </NavLink>
            <NavLink to="/sale"> Sale </NavLink>
            <NavLink to="/uploadDemos"> UploadDemos </NavLink>
            <NavLink to="/useRef"> UseRef </NavLink>
            <NavLink to="/debounceDemo"> Debounce </NavLink>
            <NavLink to="/retryPromise"> Retry Promise </NavLink>

          </Header>
      <Outlet />
    </div>
  )
}
