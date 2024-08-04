import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEMQXConnectionContext } from "../../../../context/EMQXConnectionProvider";
import GradientText from "../../../../components/GradientText";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const index = () => {
  const { mqttPublish } = useEMQXConnectionContext();

  const [gateToggle, setGateToggle] = useState("");
  const [doorToggle, setDoorToggle] = useState("");
  const [garageToggle, setGarageToggle] = useState("");
  const [windowToggle, setWindowToggle] = useState("");
  const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("door1")
      .then((value) => {
        if (value !== null) {
          setGateToggle(value);
        } else {
          AsyncStorage.setItem("door1", "OFF1")
            .then(() => {
              setGateToggle("OFF1");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("door2")
      .then((value) => {
        if (value !== null) {
          setDoorToggle(value);
        } else {
          AsyncStorage.setItem("door2", "OFF2")
            .then(() => {
              setDoorToggle("OFF2");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("door3")
      .then((value) => {
        if (value !== null) {
          setGarageToggle(value);
        } else {
          AsyncStorage.setItem("door3", "OFF3")
            .then(() => {
              setGarageToggle("OFF3");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("window")
      .then((value) => {
        if (value !== null) {
          setWindowToggle(value);
        } else {
          AsyncStorage.setItem("window", "OFF")
            .then(() => {
              setWindowToggle("OFF");
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

  const doorLists = [
    {
      id: 1,
      name: "Gate",
      value: gateToggle,
      setv: setGateToggle,
    },
    {
      id: 2,
      name: "House",
      value: doorToggle,
      setv: setDoorToggle,
    },
    {
      id: 3,
      name: "Garage",
      value: garageToggle,
      setv: setGarageToggle,
    },
  ];

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
        <Text className="font-pmedium text-[15px] text-gray-700">
          Control Door and Window
        </Text>
      </View>
      <ScrollView>
        <View className="flex items-center">
          {doorLists.map((d) => (
            <Pressable
              key={d.id}
              className="h-lg w-72 px-10 py-7 rounded-3xl mt-4 shadow-lg bg-white shadow-zinc-800 transition-all duration-300 ease "
              onPress={() =>
                d.setv(
                  d.value === "OFF" + d.id ? "ON" + d.id : "OFF" + d.id,
                  mqttPublish({
                    topic: "esp32/smarthome",
                    qos: 0,
                    payload: JSON.stringify({
                      door:
                        d.value === "OFF" + d.id ? "ON" + d.id : "OFF" + d.id,
                    }),
                  }),
                  storeData(
                    "door" + d.id,
                    d.value === "OFF" + d.id ? "ON" + d.id : "OFF" + d.id
                  )
                )
              }
            >
              <View className="flex items-center flex-col">
                <View className="">
                  <Text className="mt-4 mb-1 text-[20px] font-pextrabold">
                    {d.name}
                  </Text>
                </View>
                <View>
                  {d.value === "OFF" + d.id ? (
                    <FontAwesome6 name="door-closed" size={56} color="black" />
                  ) : (
                    <FontAwesome6 name="door-open" size={56} color="black" />
                  )}
                </View>
              </View>
            </Pressable>
          ))}
        </View>
        <View className="mb-24 flex items-center">
          <Pressable
            className="h-lg w-72 px-10 py-7 rounded-3xl mt-4 shadow-lg bg-white shadow-zinc-800 transition-all duration-300 ease "
            onPress={() =>
              setWindowToggle(
                windowToggle === "OFF" ? "ON" : "OFF",
                mqttPublish({
                  topic: "esp32/smarthome",
                  qos: 0,
                  payload: JSON.stringify({
                    window: windowToggle === "OFF" ? "ON" : "OFF",
                  }),
                }),
                storeData("window", windowToggle === "OFF" ? "ON" : "OFF")
              )
            }
          >
            <View className="flex items-center flex-col">
              <View className="">
                <Text className="mt-4 mb-1 text-[20px] font-pextrabold">
                  Window
                </Text>
              </View>
              <View>
                {windowToggle === "OFF" ? (
                  <MaterialCommunityIcons
                    name="window-closed-variant"
                    size={56}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="window-open-variant"
                    size={56}
                    color="black"
                  />
                )}
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
