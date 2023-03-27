import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import Reviews from './pages/reviews';
import ReviewDetails from './pages/reviews/details';
import NotFound from './pages/404';
import MissionOder from './pages/misson_oders';
import MissionOrdersDetails from './pages/misson_oders/details';
import MyMissionOrders from './pages/my_mission_orders';
import MyMissionOrdersDetails from './pages/my_mission_orders/details';
import Users from './pages/users';
import Redirect from './pages/redirect';
import Profile from './pages/profile';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/mo" replace /> },
        { path: 'reviews', element: <Reviews /> },
        { path: 'reviews/:id', element: <MissionOrdersDetails /> },
        { path: 'mo', element: <MissionOder /> },
        { path: 'mo/:id', element: <MissionOrdersDetails /> },
        { path: 'mmo', element: <MyMissionOrders /> },
        { path: 'mmo/:id', element: <MissionOrdersDetails /> },
        { path: 'users', element: <Users /> },
        {path: 'profile', element: <Profile />}
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/mo" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        {path: 'redirect',element: <Redirect />},
        { path: '*', element: <NotFound /> },
      ]
    },
  ]);
}
