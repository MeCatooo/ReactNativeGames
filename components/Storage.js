import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,

});

const saveStore = async (key, data) =>
{
    try
    {
        const store = JSON.stringify(data).match(/.{1,1000000}/g);
        console.log(store.length)
        store.forEach((part, index) => { AsyncStorage.setItem((key + index), part); });
        AsyncStorage.setItem(key, ("" + store.length));
    }
    catch (error)
    {
        console.log("Could not save store : ");
        console.log(error.message);
    }
};

const getStore = async (key) =>
{
    try
    {
        let store = "";
        let numberOfParts = await AsyncStorage.getItem(key);
        if(typeof(numberOfParts) === 'undefined' || numberOfParts === null)
            return null;
        else
            numberOfParts = parseInt(numberOfParts);
        for (let i = 0; i < numberOfParts; i++) { store += await AsyncStorage.getItem(key + i); }
        if(store === "")
            return null;
        console.log(JSON.parse(store).slice(0, 100))
        return JSON.parse(store);
    }
    catch (error)
    {
        console.log("Could not get [" + key + "] from store.");
        console.log(error);
        return null;
    }
};

const clearStore = async (key) =>
{
    try
    {
        console.log("Clearing store for [" + key + "]");
        let numberOfParts = await AsyncStorage.getItem(key);
        if(typeof(numberOfParts) !== 'undefined' && numberOfParts !== null)
        {
            numberOfParts = parseInt(numberOfParts);
            for (let i = 0; i < numberOfParts; i++) { AsyncStorage.removeItem(key + i); }
            AsyncStorage.removeItem(key);
        }
    }
    catch (error)
    {
        console.log("Could not clear store : ");
        console.log(error.message);
    }
};

export default storage;
export { saveStore, getStore, clearStore };