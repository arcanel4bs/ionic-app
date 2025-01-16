import React, { useEffect, useState } from 'react';
import {UsersService} from '../services/UsersService';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/react';
import { Link } from 'react-router-dom';

const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("obteniendo usuarios");
    const apiService = new UsersService();
    apiService.getUsers()
    .then(
      (data) => {
        setUsers(data.data);
        setLoading(false);
      },
      (error) => {
        console.log("error" + error);
        console.error('Error al obtener usuarios:', error);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user: any) => (
              <li key={user.id} >
                <Link to={`/user/${user.id}`}>{user.first_name} {user.last_name}</Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default UserList;