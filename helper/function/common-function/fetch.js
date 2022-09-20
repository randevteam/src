// import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';

/**
* SAVE DATA TO LOCAL
*/
const saveLocalData = (url, result) => {
    if (!url || !result) return;
    let wrapData = {
        resultData: result,
        update: new Date().getTime(),
    };
    // console.log(JSON.stringify(wrapData));
    // Save in the local database is a string, saving a string object error occurs
    AsyncStorage.setItem(url, JSON.stringify(wrapData), error => {
        // console.log(error);
    })
}

/**
* REMOVE EXPIRED DATA
*/
const removeExpiredData = (url) => {
    if (!url) return;
    // Save in the local database is a string, saving a string object error occurs
    AsyncStorage.removeItem(url, error => {
        // console.log(error);
    })
}

/**
* FIND DATA FROM LOCAL
*/
const getLocalData = (url) => {
    var promise = new Promise((resolve, reject) => {
        AsyncStorage.getItem(url, (error, result) => {
            if (error) {
                reject(error);
            } else {
                //Get from the local database is a string to build the object to build the string.
                try {
                    resolve(JSON.parse(result));
                } catch (e) {
                    reject(e);
                }
            }
        })
    });
    return promise;
}
/**
* COMPARE BETWEEN SAVING TIME AND ACTUAL TIME 
*/

const isUpdate = (saveTime) => {
    let currentDate = new Date();
    let saveDate = new Date()
    saveDate.setTime(saveTime);
    // More than or equal to a minute to request network data

    if (currentDate.getMinutes() - saveDate.getMinutes() <= 60) {
        return true;
    } else {
        return false;
    }
}
/**
* FETCHING DATA FROM NETWORK
*/

const GET = async (url) => {
    var promise = await fetch(url)
        .then((response) => response.json())
        .then((json) => {
            data = json,
                saveLocalData(url, json)
        }).catch((error) => {
            return error;
        });
    return promise;
}



//-------------------------------- POST --------------------------//
export const fetch_url_post = async (url, data) => {

    var body = JSON.stringify(data);
    var retour = null;
    await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    }).then((response) => response.json())
        .then((json) => {
            retour = json
        }).catch((error) => {
            return error;
        });
    if (retour) return retour;
}
//-------------------------------- POST --------------------------//



//-------------------------------- GET --------------------------//
export const fetch_url_get = async (url, data = null) => {

    var data = null;
    await fetch(url)
        .then((response) => response.json())
        .then((json) => {
            data = json;
            
        }).catch((error) => {
            return error;
        });
    
    if (data) {
        
        return data
    };

}

export const fetch_url_get_and_store = async (url, data = null) => {

        var dataToTest = await getLocalData(url)
        if (dataToTest != null) {
            /**
            * DATA NOT NULL CONDITION
            */
            if (isUpdate(dataToTest.update)) {
                /**
                * DATA UPTODATE CONDITION
                */
                return dataToTest.resultData;
            } else {
                /**
                * DATA NEED TO BE UPDATED CONDITION
                */
                await GET(url)
                var newdata = await getLocalData(url)
                return newdata.resultData;
            }
        } else {
            /**
             * DATA NULL CONDITION
             */
            await GET(url)
            var initdataApps = await getLocalData(url)
            return initdataApps.resultData;
        }
}


//-------------------------------- GET --------------------------//