import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import GradientText from "../../../../components/GradientText";
import { useEMQXConnectionContext } from "../../../../context/EMQXConnectionProvider";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url_from_ow } from "../../../../components/BaseUrl";
import axios from "axios";
const index = () => {
  const { mqttPublish, payload } = useEMQXConnectionContext();
  const [data, setData] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [arrTemperature, setArrTemperature] = useState([]);
  const [tempDate, setTempDate] = useState([]);
  const [waterPumbToggle, setWaterPumbToggle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tempDataKey, setTempDataKey] = useState([]);
  const [tempDataValue, setTempDataValue] = useState([]);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  };
  const compareDates = (dateString1, dateString2) => {
    const date1 = dateString1;
    const date2 = dateString2;
    // console.log("Date1", date1);
    // console.log("Date2", date2);
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  };
  const formatDateNow = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split(" ");
    return `${month} ${day} ${year}`;
  };
  const formatTimeNow = (date) => {
    const options = { hour: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [hour] = formattedDate.split(" ");
    return `${hour}`;
  };
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    // // Fetch data using GET request
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
  
    // //console.log(formatDateNow(new Date(Date.now())));
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
