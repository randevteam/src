import React from 'react';
import { Text, View, FlatList, ScrollView, TouchableOpacity , ActivityIndicator,Image, Linking} from 'react-native';
import { api_get_all_notif } from '../helper/api_url';
import { fetch_url_get } from '../helper/function/common-function/fetch';
import {notification} from '../notification/Notification';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  get_notif = async () => {
    try {
      const response = await fetch_url_get(api_get_all_notif);
      const json = await response;
        this.setState({
            data: json,
        });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false});
    }
  };
  componentDidMount() {
    this.get_notif();
  }
    render() {
      const {data, isLoading} = this.state;

    return (
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{backgroundColor: '#efe4d0', margin: '1%'}}
                onPress={() => {
                  Linking.openURL(item.lien);
                }}>
                <Text style={{fontSize: 14, fontWeight: 'bold', padding: '1%'}}>
                  {item.titre}
                </Text>
                <Text>{item.description}</Text>

                <Image
                  style={{height: 100, width: 100}}
                  source={{uri: item.media}}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }
}

export default Notifications;
