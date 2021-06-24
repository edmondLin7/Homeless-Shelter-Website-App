import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import Dashboard1 from 'src/pages/Dashboard1';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import SheltersList from 'src/pages/SheltersList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import Finder from 'src/pages/Finder';
import AboutUs from 'src/pages/AboutUs';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'dashboard1', element: <Dashboard1 /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'shelters', element: <SheltersList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'finder', element: <Finder /> },
      { path: 'aboutus', element: <AboutUs /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
