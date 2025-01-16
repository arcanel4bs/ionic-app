import { Storage } from '@ionic/storage';

export class StorageService {
  private storage: Storage;

  constructor() {
    this.init();
  }

  async init() {
    this.storage = new Storage();
    await this.storage.create();
  }

  async set(key: string, value: any) {
    try {
      await this.storage.set(key, value);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }

  async get(key: string) {
    try {
      return await this.storage.get(key);
    } catch (error) {
      console.error('Error retrieving data:', error);
      throw error;
    }
  }

  async remove(key: string) {
    try {
      await this.storage.remove(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  }
} 