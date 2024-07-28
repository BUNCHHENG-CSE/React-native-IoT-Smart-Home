import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useEMQXConnectionContext } from "../../context/EMQXConnectionProvider";

const subscribe = () => {
  const { mqttSub, isSubed, mqttUnSub } = useEMQXConnectionContext();
  const [subscribe, setSubscribe] = useState({
    topic: "esp32/smarthome",
    qos: 0,
  });
  const handleSubcribe = () => {
    mqttSub({ topic: subscribe.topic, qos: subscribe.qos });
  };
  const handleUnSubcribe = () => {
    mqttUnSub({ topic: subscribe.topic });
    setSubscribe({
      topic: "esp32/smarthome",
      qos: 0,
    });
  };
  return (
    <>
      <SafeAreaView className="h-full">
        <ScrollView className="bg-slate-50">
          <View className="w-full flex justify-center h-full px-4 my-6">
            <Text className="text-xl font-pextrabold text-black mt-10 ">
              Connect To EMQX Subscribe
            </Text>
            <FormField
              title="Topic"
              value={subscribe.topic}
              placeholder="yourTopic/something..."
              handleChangeText={(e) => setSubscribe({ ...subscribe, topic: e })}
              otherStyles="mt-7"
            />
            <FormField
              title="Qos"
              value={subscribe.qos}
              placeholder="0"
              handleChangeText={(e) => setSubscribe({ ...subscribe, qos: e })}
              otherStyles="mt-5"
            />
            <CustomButton
              title={isSubed ? "Subcribed" : "Subcribe"}
              handlePress={handleSubcribe}
              containerStyles="mt-7 bg-blue-600"
              textStyles="text-white"
            />
            <CustomButton
              title="Unsubscribe"
              handlePress={handleUnSubcribe}
              containerStyles="mt-7 bg-red-600"
              textStyles="text-white"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default subscribe;
