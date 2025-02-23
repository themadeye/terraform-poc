import {useAuth} from './contexts/AuthContext.tsx';
import {Navigate, Outlet} from 'react-router-dom';


const ProtectedRoute = () => {
    const user = useAuth();
    if (!user?.token) return <Navigate to={'/login'}/>;
    return <Outlet />;
}

export default ProtectedRoute;