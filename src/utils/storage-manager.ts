 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Result } from "../domain";

export class StorageManager {
  static getItem = async (key: string): Promise<Result<string | null>> => {
    try {
      const value = await AsyncStorage.getItem(key);

      return Result.success(value);
    } catch (error: any) {
      return Result.failure(`${error.message}`);
    }
  };

  static setItem = async (key: string, value: string): Promise<Result<void>> => {
    try {
      await AsyncStorage.setItem(key, value);

      return Result.success();
    } catch (error: any) {
      return Result.failure(`${error.message}`);
    }
  };

  static removeItem = async (key: string): Promise<Result<void>> => {
    try {
      await AsyncStorage.removeItem(key);

      return Result.success();
    } catch (error: any) {
      return Result.failure(`${error.message}`);
    }
  };
}