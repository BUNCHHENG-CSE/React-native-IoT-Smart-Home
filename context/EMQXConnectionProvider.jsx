import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client, Message } from "paho-mqtt";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
const EMQXConnectionContext = createContext();

export const useEMQXConnectionContext = () => useContext(EMQXConnectionContext);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const EMQXConnectionProvider = ({ children }) => {
  const [client, setClient] = useState();
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [options, setOptions] = useState({});
  const [subscribe, setSubscribe] = useState({});

  const [expoPushToken, setExpoPushToken] = useState("");
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
       // console.log("token: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }
  const sendNotification = async (t, b) => {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: t,
      body: b,
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: " exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const mqttConnect = (mqttOption) => {
    setConnectStatus("Connecting...");
    if (
      mqttOption.hostEMQX !== "" &&
      mqttOption.portEMQX !== "" &&
      mqttOption.clientIDEMQX !== ""
    ) {
      setOptions(mqttOption);
      setClient(
        new Client(
          mqttOption.hostEMQX,
          parseInt(mqttOption.portEMQX),
          mqttOption.clientIDEMQX
        )
      );
    } else {
      setConnectStatus("Connect");
    }
  };
  useEffect(() => {
    if (client) {
      client.connect({
        onSuccess: onSuccessTOEMQX,
        onFailure: onFailureTOEMQX,
        timeout: 30 * 1000,
        useSSL: true,
        userName: options.usernameEMQX,
        password: options.passwordEMQX,
      });
      client.onMessageArrived = onMessageArrived;
    }
  }, [client]);
// { "temperature": 35,"humidity": 58,"fire": "fire" } testing data
  const mqttDisconnect = () => {
    if (client) {
      try {
        client.disconnect();
        setClient(null);
        setConnectStatus("Connect");
        mqttUnSub(subscribe);
        console.log("disconnected successfully");
      } catch (error) {
        console.log("disconnect error:", error);
      }
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      let tempPayload = new Message(context.payload);
      tempPayload.destinationName = context.topic;
      tempPayload.qos = parseInt(context.qos);
      console.log(tempPayload);
      client.send(tempPayload);
    }
  };

  const mqttSub = (subscription) => {
    setSubscribe(subscription);
    if (client) {
      const { topic, qos } = subscription;
      try {
        client.subscribe(topic, { qos: parseInt(qos) });
        console.log(`Subscribe to topics: ${topic}`);
        setIsSub(true);
      } catch (error) {
        console.log("Subscribe to topics error", error);
        return;
      }
    }
  };

  const mqttUnSub = (subscription) => {
    setSubscribe(subscription);
    if (client) {
      const { topic } = subscription;
      try {
        client.unsubscribe(subscribe.topic);
        console.log(`unsubscribed topic: ${topic}`);
        setIsSub(false);
      } catch (error) {
        console.log("Unsubscribe to topics error", error);
        return;
      }
    }
  };
  function onSuccessTOEMQX() {
    setConnectStatus("Connected");
    console.log("connection successfull");
  }
  function onFailureTOEMQX(err) {
    console.error("Connection error: ", err);
    setConnectStatus("Connect");
    client.disconnect();
  }

  async function onMessageArrived(message) {
    let payload = message.payloadString;
    setPayload(payload);
    if (payload !== "") {
      let payloadJSONParse = Object.keys(JSON.parse(payload));
      if (payloadJSONParse.length >= 3) {
        if (payloadJSONParse[2] === "fire") {
          for (i = 0; i < 3; i++) {
            console.log("Fire!!!!!");
           sendNotification("Fire alert","Fire 🔥🔥🔥🔥🔥🔥")
            await sleep(5000);
          }
        }
      }
    }
  }
  return (
    <EMQXConnectionContext.Provider
      value={{
        mqttPublish,
        payload,
        mqttConnect,
        mqttDisconnect,
        connectStatus,
        mqttSub,
        isSubed,
        mqttUnSub,
      }}
    >
      {children}
    </EMQXConnectionContext.Provider>
  );
};
export default EMQXConnectionProvider;
