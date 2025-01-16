import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonModal,
  IonInput,
  IonImg,
  IonTextarea
} from '@ionic/react';
import { StorageService } from '../services/StorageService';
import './ProductList.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    const loadProducts = async () => {
      const storage = new StorageService();
      const savedProducts = await storage.get('products');
      if (savedProducts) {
        setProducts(savedProducts);
      }
    };
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price) {
      const newProducts = [...products, {
        id: Date.now(),
        name: newProduct.name,
        description: newProduct.description || '',
        price: Number(newProduct.price),
        image: newProduct.image || 'default-image.jpg'
      }];
      
      const storage = new StorageService();
      await storage.set('products', newProducts);
      setProducts(newProducts);
      setNewProduct({});
      setIsModalOpen(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="product-list">
        <IonButton className="add-button" expand="block" onClick={() => setIsModalOpen(true)}>
          Agregar Producto
        </IonButton>
        
        <IonList>
          {products.map(product => (
            <IonItem className="product-item" key={product.id}>
              <IonImg className="product-image" src={product.image} slot="start" />
              <IonLabel>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <h3>${product.price}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nuevo Producto</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              <IonInput
                value={newProduct.name}
                onIonChange={e => setNewProduct({...newProduct, name: e.detail.value!})}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea
                value={newProduct.description}
                onIonChange={e => setNewProduct({...newProduct, description: e.detail.value!})}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Precio</IonLabel>
              <IonInput
                type="number"
                value={newProduct.price}
                onIonChange={e => setNewProduct({...newProduct, price: e.detail.value!})}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">URL de Imagen</IonLabel>
              <IonInput
                value={newProduct.image}
                onIonChange={e => setNewProduct({...newProduct, image: e.detail.value!})}
              />
            </IonItem>
            <IonButton expand="block" onClick={handleAddProduct}>
              Guardar Producto
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ProductList;