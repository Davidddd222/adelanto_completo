import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';
import './AccountDetail.css';

const AccountDetails = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({ nombre: '', apellido: '', correo: '' });
  const [password, setPassword] = useState(''); // Para almacenar la contraseña
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // Para verificar si la contraseña es correcta

  useEffect(() => {
    // Se simula la obtención de datos del usuario sin hacer una llamada a la API
    if (user) {
      setUserData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        correo: user.correo || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const verifyPassword = () => {
    // Simula la verificación de la contraseña con la que se tiene en el objeto `user`
    if (user.password === password) {
      setIsPasswordVerified(true);
      alert('Contraseña verificada correctamente');
    } else {
      alert('Contraseña incorrecta');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordVerified) {
      alert('Debes verificar tu contraseña antes de actualizar los datos');
      return;
    }

    // Aquí puedes agregar la lógica para guardar los datos en el estado o en otro lugar
    alert('Datos actualizados con éxito: ' + JSON.stringify(userData));
  };

  return (
    <div className='account-details__container'>
      {!isPasswordVerified ? (
        <div>
          <h2>Verificación de Contraseña</h2>
          <label>
            Introduce tu contraseña para realizar cambios:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button onClick={verifyPassword}>Verificar Contraseña</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={userData.nombre}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              value={userData.apellido}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={userData.correo}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default AccountDetails;
