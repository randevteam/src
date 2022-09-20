import PushNotification from 'react-native-push-notification';
import React from 'react';
import { Linking } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {api_get_all_notif} from '../helper/api_url';
import { fetch_url_get } from '../helper/function/common-function/fetch';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      route: null,
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

  
  // navigation = (param) => {
  //   this.setState({
  //     route: param,
  //   })
  // }

  configure = (param) => {
    PushNotification.configure({
      largeIcon: 'ic_launcher_adaptive_fore',
      smallIcon: 'ic_launcher',
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        
        console.log('NOTIFICATION:', notification);
      //Linking.openURL(param);
        // this.props.navigation.navigate('Notifications');
      
        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
       
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
      requestPermissions: Platform.OS === 'ios',
    });
  };

  buatchannel = channel => {
    PushNotification.createChannel(
      {
        channelId: channel, // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        //importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  kirimNotification = (channel, title, body) => {
    PushNotification.localNotification({
      channelId: channel,
      title: title, // (optional)
      message: body, // (required)
    });
  };

  kirimNotificationJadwal = (channel, title, body, img) => {
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      channelId: channel,
      message: body, // (required)
      bigPictureUrl: img,
      userInfo: {
        image: img,
      },
      date: new Date(Date.now() + 20 * 1000), // in 60 sec
      title: title,
    });
  };
}

export const notification = new Notification();
