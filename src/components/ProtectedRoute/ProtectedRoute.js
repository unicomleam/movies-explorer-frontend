import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  const { loggeIn } = useContext(CurrentUserContext);

  return (
    loggeIn ? <Component {...props} /> : <Navigate to="/" replace />
)};

export default ProtectedRouteElement;
