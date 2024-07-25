import { View, Text, ScrollView, SectionList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";
import { useEMQXConnectionContext } from "../../context/EMQXConnectionProvider";

const Connect = () => {
  const { mqttConnect, mqttDisconnect, connectStatus } =useEMQXConnectionContext();
  const [connection, setConnection] = useState({
    protocol: "",
    host: "",
    port: "8084",
    clientID: "emqx_react_native_" + Math.random().toString(16).substring(2, 8),
    username: "",
    password: "",
  });
  const protocolList = [
    { key: "1", value: "wss" },
    { key: "2", value: "ws" },
  ];
  const connect = () => {
    let hostEMQX = connection.host
    let portEMQX = connection.port
    let clientIDEMQX = connection.clientID;
    let usernameEMQX = connection.username;
    let passwordEMQX = connection.password;
    const options = {
      hostEMQX,
      portEMQX,
      clientIDEMQX,
      usernameEMQX,
      passwordEMQX,
    };
    mqttConnect( options);
  };
  const disconnect = () => {
    mqttDisconnect();
    setConnection({
      protocol: "",
      host: "",
      port: "8084",
      clientID:
        "emqx_react_native_" + Math.random().toString(16).substring(2, 8),
      username: "",
      password: "",
    });
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View className="w-full flex justify-center h-full px-4 mt-2 mb-6">
            <Text className="text-xl font-pextrabold text-black mt-10 ">
              Connect to EMQX
            </Text>
            <View className={`space-y-2 mt-7`}>
              <Text className="text-base text-gray-600 font-psemibold">
                Protocol
              </Text>
              <SelectList
                setSelected={(val) =>
                  setConnection({ ...connection, protocol: val })
                }
                data={protocolList}
                save="value"
                fontFamily="Poppins-SemiBold"
                search={false}
                dropdownTextStyles={{
                  color: "#7B7B8B",
                  fontSize: 16,
                  lineHeight: 24,
                  borderColor: "#00cec9",
                }}
                boxStyles={{ marginTop: 6, borderColor: "#d1d5db" }}
                inputStyles={{ fontSize: 16, color: "#111827" }}
              />
            </View>
            <FormField
              title="Host"
              value={connection.host}
              
              placeholder="g64819f1.ala.asia-southeast1.emqxsl.com"
              handleChangeText={(e) =>
                setConnection({ ...connection, host: e })
              }
              otherStyles="mt-3"
            />
            <FormField
              title="Port"
              value={connection.port}
              placeholder="8084"
              handleChangeText={(e) =>
                setConnection({ ...connection, port: e })
              }
              otherStyles="mt-3"
            />
            <FormField
              title="Client ID"
              value={connection.clientID}
              placeholder="emqx_react_native_118ec8"
              handleChangeText={(e) =>
                setConnection({ ...connection, clientID: e })
              }
              otherStyles="mt-3"
            />
            <FormField
              title="Username"
              value={connection.username}
              placeholder="admin"
              handleChangeText={(e) =>
                setConnection({ ...connection, username: e })
              }
              otherStyles="mt-3"
            />
            <FormField
              title="Password"
              value={connection.password}
              handleChangeText={(e) =>
                setConnection({ ...connection, password: e })
              }
              otherStyles="mt-3"
            />

            <CustomButton
              title={`${connectStatus}`}
              handlePress={connect}
              containerStyles="mt-4 bg-blue-600"
              textStyles="text-white"
            />

            <CustomButton
              title="Disconnect"
              handlePress={disconnect}
              containerStyles="mt-2 mb-5 bg-red-600 "
              textStyles="text-white"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Connect;
