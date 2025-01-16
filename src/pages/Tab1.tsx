import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import ProductList from '../components/ProductList';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lista de Productos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ProductList />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
