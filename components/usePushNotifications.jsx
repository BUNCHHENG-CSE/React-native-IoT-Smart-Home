import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";


export const usePushNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState();
  
  const [channels, setChannels] = useState([]);
  
  const notificationListener = useRef()
  const responseListener = useRef()

  async function registerForPushNotificationsAsync (){
    
  }
};
