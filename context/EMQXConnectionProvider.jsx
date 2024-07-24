import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client, Message } from "paho-mqtt";
const EMQXConnectionContext = createContext();

export const useEMQXConnectionContext = () => useContext(EMQXConnectionContext);

const EMQXConnectionProvider = ({ children }) => {
  const [client, setClient] = useState();
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState("Connect");
  //const [payloadDataKey, setPayloadDataKey] = useState([]);
  const [options, setOptions] = useState({});
  const [subscribe, setSubscribe] = useState({});

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
      const { topic} = subscription;
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
    // toast.info("Connect successfull to EMQX Platform ", {
    //   position: "top-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    //   font: "Poppins",
    // });
  }
  function onFailureTOEMQX(err) {
    console.error("Connection error: ", err);
    setConnectStatus("Connect");
    client.disconnect();
  }
  function onMessageArrived(message) {
    setPayload(message.payloadString);
    // if (payload.topic) {
    //   setPayloadDataKey(Object.keys(JSON.parse(payload.message)));
    //  // setPayloadDataValue(Object.values(JSON.parse(payload.message)));
    //   if (payloadDataKey[2] === "fire") {
    //     for (i = 0; i < 3; i++) {
    //       toast.error("Fire !!!", {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //         font: "Poppins",
    //       });
    //     }
    //     setTempDataValue([]);
    //     setTempDataKey([]);
    //   }
    // }
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
