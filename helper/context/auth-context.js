import React from 'react';
import { storeGuest, storeCustomer, getGuest, getCustomer, removeUser, removeGuest  } from '../storage/user-storage';

export const AuthContext = React.createContext();

class AuthContextProvider extends React.Component{

    state = {
        guest: null,
        customer: null,
    }

    login = async (data) => {
        await storeCustomer(data).then(() => {
            this.setState({
                customer: data.customer ? data.customer : null,
            });
        }); 
    }

    logout = async () => {
        await removeUser().then(() => {
            this.setState({
                guest: null, 
                customer: null
            });
        });
    }

    // setData
    setData = async (data) => {
        await this.setState({
            guest: data.guest ? data.guest : null,
            customer: data.customer ? data.customer : null,
        });
    }

    render(){ 
		return(
            <AuthContext.Provider 
                value={{ 
                    ...this.state, 
                    login: this.login, 
                    logout: this.logout, 
                    storeGuest: storeGuest ,
                    getGuest: getGuest,
                    getCustomer: getCustomer,
                    setData: this.setData,
                    removeGuest: removeGuest
                }}
            >
				{ this.props.children }
			</AuthContext.Provider>
		)
	}

}

export default AuthContextProvider