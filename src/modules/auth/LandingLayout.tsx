import { Navigate, Outlet, NavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react'
import Layout from 'antd/es/layout'
const { Header } = Layout

const LandingLayout = () => {
    const { user } = useAuth0();
  
    if (user) {
      return <Navigate to="/home" />;
    }
  
    return (
      <div>
       <Header>
          <NavLink to="/">Landing</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </Header>
        <Outlet />
      </div>
    )
  };
  
  export default LandingLayout