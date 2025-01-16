import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/react';
import { Storage } from '@ionic/storage';
import './RegistrationForm.css';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Nombre validation
    if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingrese un email válido';
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, incluyendo números y letras';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const storage = new Storage();
        await storage.create();
        await storage.set('userData', formData);
        alert('Registro exitoso!');
      } catch (error) {
        console.error('Error al guardar datos:', error);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput
              value={formData.name}
              onIonChange={e => setFormData({...formData, name: e.detail.value || ''})}
              onIonBlur={() => validateForm()}
            />
            {errors.name && <IonText color="danger"><p>{errors.name}</p></IonText>}
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={formData.email}
              onIonChange={e => setFormData({...formData, email: e.detail.value || ''})}
              onIonBlur={() => validateForm()}
            />
            {errors.email && <IonText color="danger"><p>{errors.email}</p></IonText>}
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonInput
              type="password"
              value={formData.password}
              onIonChange={e => setFormData({...formData, password: e.detail.value || ''})}
              onIonBlur={() => validateForm()}
            />
            {errors.password && <IonText color="danger"><p>{errors.password}</p></IonText>}
          </IonItem>

          <IonButton expand="block" onClick={handleSubmit} className="ion-margin">
            Registrar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegistrationForm;
