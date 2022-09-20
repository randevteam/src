import AsyncStorage from '@react-native-async-storage/async-storage';

// store as guest
export const storeGuest = async (data) => {
    try {
        await AsyncStorage.setItem('guest', JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
}

// store as customer
export const storeCustomer = async (data) => {
    try {
        await AsyncStorage.setItem('customer', JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
}

// get data as guest
export const getGuest = async () => {
    try{
        const guest = await AsyncStorage.getItem('guest');
        if(guest){
            return guest;
        }
    }catch(e){
        console.log(e);
    }
}

// get data as customer
export const getCustomer = async () => {
    try{
        const customer = await AsyncStorage.getItem('customer');
        if(customer){
            return customer;
        }
    }catch(e){
        console.log(e);
    } 
}

// remove user data on storage
export const removeGuest = async () => {
    try{
        await AsyncStorage.removeItem('guest');
    }catch(e){
        console.log(e);
    }
}

// remove user data on storage
export const removeCustomer = async () => {
    try{
        await AsyncStorage.removeItem('customer');
    }catch(e){
        console.log(e);
    }
}

// remove user data on storage
export const removeUser = async () => {
    try{
        await AsyncStorage.removeItem('guest');
        await AsyncStorage.removeItem('customer');
    }catch(e){
        console.log(e);
    }
}

// store adress
export const storeAdress = async (data) => {
    try {
        await AsyncStorage.setItem('idAdress', JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
}

// get adress
export const getAdress = async () => {
    try{
        const adress = await AsyncStorage.getItem('idAdress');
        if(adress){
            return adress;
        }
    }catch(e){
        console.log(e);
    } 
}

// remove adress on storage
export const removeAdress = async () => {
    try{
        await AsyncStorage.removeItem('idAdress');
    }catch(e){
        console.log(e);
    }
}
