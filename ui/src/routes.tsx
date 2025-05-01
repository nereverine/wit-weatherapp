import { RouteObject, Navigate } from 'react-router-dom';
import SignUp from './auth/SignUp';
import { useAuth } from './auth/useAuth';
import Dashboard from './dashboard/dashboard';

const getRoutes = (): RouteObject[] => {
    const { user } = useAuth();

    return [
        {
            path: '/signup',
            element: <SignUp />,
        },
        {
            path: '/dashboard',
            element: user ? <Dashboard /> : <Navigate to="/signup" />,
        },
        {
            path: '*',
            element: <div>404 - Page Not Found</div>,
        },
    ];
};

export default getRoutes;
