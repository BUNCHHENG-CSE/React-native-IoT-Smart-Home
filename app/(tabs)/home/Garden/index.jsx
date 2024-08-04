import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import GradientText from "../../../../components/GradientText";
import { useEMQXConnectionContext } from "../../../../context/EMQXConnectionProvider";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const index = () => {
  const { mqttPublish, payload } = useEMQXConnectionContext();
  const [temperature, setTemperature] = useState(0);
  const [waterPumbToggle, setWaterPumbToggle] = useState("");
  const [tempDataKey, setTempDataKey] = useState([]);
  const [tempDataValue, setTempDataValue] = useState([]);
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("water")
      .then((value) => {
        if (value !== null) {
          setWaterPumbToggle(value);
        } else {
          AsyncStorage.setItem("water", "OFF")
            .then(() => {
              setWaterPumbToggle("OFF");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });
  }, []);
  useEffect(() => {
    if (Object.keys(payload).length !== 0) {
      let tempKey = Object.keys(JSON.parse(payload));
      let tempValue = Object.values(JSON.parse(payload));
      if (tempKey[0] == "temperature") {
        setTemperature(tempValue[0]);

        setTempDataValue([]);
        setTempDataKey([]);
      }
    } else {
      return;
    }
  }, [payload]);

  return (
    <View className="mt-5 mx-2">
      <View>
        <View className="flex flex-row">
          <Text className=" font-pblack text-[30px] text-black">IoT</Text>
          <Text> </Text>
          <GradientText className="text-[30px] font-pblack">
            Smart Home
          </GradientText>
        </View>
        <Text className="font-pmedium text-[15px] text-gray-700">Garden</Text>
      </View>
      <ScrollView>
        <View className="mb-24 flex items-center">
          <View
            className={`self-center mb-7 w-[92%] h-fit px-10 py-7 rounded-2xl mt-4 shadow-2xl shadow-zinc-800   transition-all bg-[#30fffa]`}
          >
            <View className="flex flex-row items-center justify-between">
              <View className="mr-5">
                <Text className="text-[20px] font-pextrabold text-white">
                  Temperature
                </Text>
                <Text className="text-[18px] font-psemibold text-white">
                  {temperature} &#8451;
                </Text>
              </View>
              <View className="icon">
                <View className=" p-2 rounded-full text-black text-3xl ">
                  <FontAwesome6
                    name="temperature-low"
                    size={32}
                    color="black"
                  />
                </View>
              </View>
            </View>
          </View>
          <Pressable
            className=" col-span-1 h-max w-[92%] px-10 py-7 rounded-2xl mt-4 shadow-lg bg-white shadow-zinc-800  "
            onPress={() =>
              setWaterPumbToggle(
                waterPumbToggle === "OFF" ? "ON" : "OFF",
                mqttPublish({
                  topic: "esp32/smarthome",
                  qos: 0,
                  payload: JSON.stringify({
                    garden: waterPumbToggle === "OFF" ? "ON" : "OFF",
                  }),
                }),
                storeData("water", waterPumbToggle === "OFF" ? "ON" : "OFF")
              )
            }
          >
            <View className="flex items-center flex-col">
              <View className="">
                <Text className=" font-pextrabold text-[20px]">Water Pumb</Text>
              </View>
              <View>
                <View>
                  {waterPumbToggle === "OFF" ? (
                    <Ionicons name="water-outline" size={56} color="black" />
                  ) : (
                    <Ionicons name="water" size={56} color="black" />
                  )}
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
