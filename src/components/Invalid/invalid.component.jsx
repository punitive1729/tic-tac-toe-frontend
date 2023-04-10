import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Invalid = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
  }, []);
};

export default Invalid;
