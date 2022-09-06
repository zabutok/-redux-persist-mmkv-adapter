import { MMKV } from 'react-native-mmkv';
import { MMKVConfiguration } from "react-native-mmkv/lib/typescript/MMKV";
interface Storage {
  getItem(key: string): Promise<string | undefined>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  getAllKeys(): Promise<Array<string>>;
  clear(): Promise<void>;
}
export class MMKVAdapter implements Storage {
  storage: MMKV;
  configuration = {
    id: 'redux.persist.mmkv'
  }
  constructor(configuration?: MMKVConfiguration) {
    this.storage = new MMKV({
        ...this.configuration,
        ...configuration
    });
  }
  getItem(key: string) {
    return Promise.resolve(this.storage.getString(key));
  }
  removeItem(key: string) {
    this.storage.delete(key);
    return Promise.resolve();
  }
  setItem(key: string, value: any) {
    this.storage.set(key, value);
    return Promise.resolve();
  }
  getAllKeys() {
    return Promise.resolve(this.storage.getAllKeys());
  }
  clear() {
    return Promise.resolve(this.storage.clearAll());
  }
}
