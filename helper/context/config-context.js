import React from 'react';
import { storeGuest, storeCustomer, getGuest, getCustomer, removeUser, removeGuest  } from '../storage/user-storage';

export const ConfigContext = React.createContext();

class ConfigContexProvider extends React.Component{

    state = {
        api_url: null,
    }

    // setData
    setApiUrl = async (data) => {
        await this.setState({
            api_url: data
        });
    }

    render(){ 
		return(
            <ConfigContext.Provider 
                value={{ 
                    ...this.state, 
                    setApiUrl: this.setApiUrl
                }}
            >
				{ this.props.children }
			</ConfigContext.Provider>
		)
	}

}

export default ConfigContexProvider