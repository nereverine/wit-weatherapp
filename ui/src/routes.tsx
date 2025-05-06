import { RouteObject, Navigate } from 'react-router-dom';
import SignUp from './auth/SignUp';
import { useAuth } from './auth/useAuth';
import Dashboard from './dashboard/dashboard';
import WeatherDisplay from './weather-display/WeatherDisplay';

const getRoutes = (): RouteObject[] => {
    const { user } = useAuth();

    return [
        {
            path: '/',
            element: <Navigate to="/signup" />,
        },
        {
            path: '/signup',
            element: <SignUp />,
        },
        {
            path: '/dashboard',
            element: user ? <Dashboard /> : <Navigate to="/signup" />,
        },
        {
            path: '/weather/:city',
            element: user ? <WeatherDisplay /> : <Navigate to="/signup" />,
        },
        {
            path: '*',
            element: <div>404 - Page Not Found</div>,
        },
    ];
};

export default getRoutes;
