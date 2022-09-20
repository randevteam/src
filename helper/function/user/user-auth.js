import { api_login_url, api_register_url } from '../../api_url';
import { fetch_url_post } from '../common-function/fetch';

export const login = async (data) => {
    var result = null;
    await fetch_url_post(api_login_url, data).then((json) => {
        result = json.response;
    }).catch((error) => { return error });

    if(result) return result;
}

export const register = async (data) => {
    var result = null;
    await fetch_url_post(api_register_url, data).then((json) => {
        result = json.response;
    }).catch((error) => { return error });
    if(result) return result;
}