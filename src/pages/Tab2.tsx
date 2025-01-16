import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import RegistrationForm from '../components/RegistrationForm';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Registro</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RegistrationForm />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
