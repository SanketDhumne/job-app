import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// eslint-disable-next-line no-unused-vars
const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('myToken');

    if (token === undefined) {
      navigate('/login');
    }
  }, [navigate]);

  return <Component />;
};

export default ProtectedRoute;