import AsyncStorage from 'react-native';

// store category
export const storeCategories = async (data) => {
    try {
        await AsyncStorage.setItem('categories', JSON.stringify(data.guest));
    } catch (e) {
        console.log(e);
    }
}
// get category
export const getCategories = async () => {
    try {
        const categories = await AsyncStorage.getItem('categories');
        if (categories) {
            const jsonvalue = JSON.parse(categories);
            return jsonvalue;
        }
    } catch (e) {
        console.log(e);
    }
}
