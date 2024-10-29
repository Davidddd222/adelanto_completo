import React, { useEffect } from 'react';
import './AccountManage.css';
import AccountDetails from '../../components/AccountDetails/AccountDetails'; // Asegúrate de que la ruta sea correcta
import OrderHistory from '../../components/OrderHistory/OrderHistory'; // Asegúrate de que la ruta sea correcta
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountManage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/Login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return null; 
  }

  return (
    <div className='account-manage__container'>
      <div className='account-manage-title__container'>
        <h1 className='account-title'>Gestionar Cuenta</h1>
      </div>
      <AccountDetails />
      <OrderHistory />
    </div>
  );
};

export default AccountManage;
