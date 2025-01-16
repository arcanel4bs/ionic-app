import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonCardContent,
  IonImg,
  IonSpinner,
} from '@ionic/react';
import { Storage } from '@ionic/storage';
import './UserProfile.css';

interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
}

const UserProfile: React.FC = () => {
  const [randomUser, setRandomUser] = useState<RandomUser | null>(null);
  const [registeredUser, setRegisteredUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRandomUser(data.results[0]);
    } catch (error) {
      console.error('Error fetching random user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storage = new Storage();
        await storage.create();
        const userData = await storage.get('userData');
        if (userData) {
          setRegisteredUser(userData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    fetchRandomUser();
    loadUserData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="profile-container">
        {registeredUser && (
          <IonCard className="profile-card">
            <IonCardHeader>
              <IonCardTitle>Datos de Registro</IonCardTitle>
              <IonCardContent>
                <p>Nombre: {registeredUser.name}</p>
                <p>Email: {registeredUser.email}</p>
              </IonCardContent>
            </IonCardHeader>
          </IonCard>
        )}

        {randomUser && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Usuario Aleatorio</IonCardTitle>
            </IonCardHeader>
            <IonImg src={randomUser.picture.large} alt="User" />
            <IonCardContent>
              <h2>{randomUser.name.first} {randomUser.name.last}</h2>
              <p>{randomUser.email}</p>
            </IonCardContent>
          </IonCard>
        )}

        <IonButton expand="block" onClick={fetchRandomUser} disabled={isLoading}>
          {isLoading ? <IonSpinner name="crescent" /> : 'Recargar Usuario Aleatorio'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
