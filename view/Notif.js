import PushNotification from 'react-native-push-notification';
import {api_get_all_notif } from '../helper/api_url';

import { fetch_url_get } from '../helper/function/common-function/fetch';
class Notif{
    constructor(){
        PushNotification.configure({
            onRegister: function(token){
                // console.log('Token', token)
            },
            onNotification : function(notification){
                console.log('NOTIFICATION',notification)
            },
            popInitialNotification : true,
            requestPermissions: false,
        })
        PushNotification.createChannel(
            {
                channelId: 'reminders',
                channelName:'Task reminder notifications',
                channelDescription: 'Reminder for any request',
            },
            ()=>{},
        )
        PushNotification.getScheduledLocalNotifications(rn=>{
            console.log('SN ----',rn)
        })

        this.state = {
           
            notifa : null,
        }
    }
    getNotif = async () => {
        
        var notif = await fetch_url_get(api_get_all_notif);
        this.setState({
            notifa: notif
        });

    }
    async componentDidMount(){
        
        this.getNotif();
    }
    async localNotifications(){
        PushNotification.localNotificationSchedule({
            channelId: 'reminders',
            title: 'Passion Campagne',
            message : 'e lorem ipsum est, en imprimerie, une suite de mots sans signification utilis\u00e9e \u00e0 titre provisoire pour',
            largeIcon : "https://www.ow.randev.ovh//8880-home_default//bretelles-extra-larges-a-pinces-carl-eric-harkila.jpg" ,
            picture : "https://www.ow.randev.ovh//8880-home_default//bretelles-extra-larges-a-pinces-carl-eric-harkila.jpg" ,
            date: new Date(Date.now() + 10 * 1000),

        })
        const resp = await fetch("https://www.ow.randev.ovh/mobile_data/root_url.php?type=notification");
        const data = await resp.json();
        var i = 0;
        var nofObj = {id:"",desc: "",image}
        data.forEach(element => {
            if(i==11){
                nofObj.id = element.id
                nofObj.desc = element.description
                nofObj.image = element.media
            }
            console.log('Voici les listes'+element.id)
            i++
        });
        
    }
    
    scheduledNotifications(){
        PushNotification.localNotificationSchedule({
            channelId : 'reminders',
            title : ' Reminders ',
            message : 'You have set this reminder',
            date: new Date(Date.now() + 10 * 1000),
            
        })
    }
}
export default new Notif();