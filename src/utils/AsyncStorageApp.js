import AsyncStorage from '@react-native-community/async-storage';

class AsyncStorageApp {
  static storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Error set item',error);
    }
  };

  static clearAll = async(key)=>{
  
      try {
          await AsyncStorage.removeItem(key);
          return true;
      }
      catch(exception) {
          return false;
      }
  
  }
  static _retrieveData = async (key, callback) => {

    try {
      const value = await AsyncStorage.getItem(key);

      if (value !== null) {
        console.log("value",value);
        
        callback(JSON.parse(value));
      } else {
        callback(undefined);
      }
    } catch (error) {
      callback(undefined);
      console.log('AsyncStorageApp', error);

    }
  };
}

export default AsyncStorageApp;