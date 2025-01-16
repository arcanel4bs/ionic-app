import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {UsersService} from '../services/UsersService';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import './UserDetail.css';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const apiService = new UsersService();
    apiService.getUserDetails(parseInt(id))
    .then(
      (data) => {
        setUser(data.data);
      },
      (error) => {
        console.error('Error al obtener detalles del usuario:', error);
      }
    );
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles del Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {user && (
          <IonCard className="user-detail-card">
            <div className="user-avatar">
              <img src={user.avatar} alt={user.first_name} />
            </div>
            <IonCardHeader>
              <IonCardTitle>{user.first_name} {user.last_name}</IonCardTitle>
              <IonCardSubtitle>{user.email}</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UserDetails;