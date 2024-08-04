import { View, Text, ScrollView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useEMQXConnectionContext } from "../../../../context/EMQXConnectionProvider";
import GradientText from "../../../../components/GradientText";
import { MaterialIcons } from "@expo/vector-icons";

const index = () => {
  const { mqttPublish } = useEMQXConnectionContext();
  
  const [kledToggle, setKLedToggle] = useState("");
  const [lviledToggle, setLviLedToggle] = useState("");
  const [ba1ledToggle, setBa1LedToggle] = useState("");
  const [gledToggle, setGLedToggle] = useState("");
  const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("led1")
      .then((value) => {
        if (value !== null) {
          setKLedToggle(value);
        } else {
          AsyncStorage.setItem("led1", "OFF1")
            .then(() => {
              setKLedToggle("OFF1");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

      AsyncStorage.getItem("led2")
      .then((value) => {
        if (value !== null) {
          setLviLedToggle(value);
        } else {
          AsyncStorage.setItem("led2", "OFF2")
            .then(() => {
              setLviLedToggle("OFF2");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

      AsyncStorage.getItem("led3")
      .then((value) => {
        if (value !== null) {
          setBa1LedToggle(value);
        } else {
          AsyncStorage.setItem("led3", "OFF3")
            .then(() => {
              setBa1LedToggle("OFF3");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

      AsyncStorage.getItem("led4")
      .then((value) => {
        if (value !== null) {
          setGLedToggle(value);
        } else {
          AsyncStorage.setItem("led4", "OFF4")
            .then(() => {
              setGLedToggle("OFF4");
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
  const ledLists = [
    {
      id: 1,
      name: "Kitchen",
      value: kledToggle,
      setv: setKLedToggle,
      floor: "1",
    },
    {
      id: 2,
      name: " Living Room",
      value: lviledToggle,
      setv: setLviLedToggle,
      floor: "1",
    },
    {
      id: 3,
      name: "Bathroom",
      value: ba1ledToggle,
      setv: setBa1LedToggle,
      floor: "2",
    },
    {
      id: 4,
      name: "Garage",
      value: gledToggle,
      setv: setGLedToggle,
      floor: "1",
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
          Control LED Ground Floor
        </Text>
      </View>
      <ScrollView>
        <View className="mb-24 flex items-center">
          {ledLists.map((led) => (
            <Pressable
              key={led.id}
              className="h-lg w-72 px-10 py-7 rounded-3xl mt-4 shadow-lg bg-white shadow-zinc-800 transition-all duration-300 ease "
              onPress={() =>
                led.setv(
                  led.value === "OFF" + led.id ? "ON" + led.id : "OFF" + led.id,
                  mqttPublish({
                    topic: "esp32/smarthome",
                    qos: 0,
                    payload: JSON.stringify({
                      led:
                        led.value === "OFF" + led.id
                          ? "ON" + led.id
                          : "OFF" + led.id,
                    }),
                  }),
                  storeData(
                    "led" + led.id,
                    led.value === "OFF" + led.id
                      ? "ON" + led.id
                      : "OFF" + led.id
                  )
                )
              }
            >
              <View className="flex items-center flex-col">
                <View className="">
                  <Text className="mt-4 mb-1 text-[20px] font-pextrabold">
                    {led.name}
                  </Text>
                </View>
                <View>
                  {led.value === "OFF" + led.id ? (
                    <MaterialIcons
                      name="lightbulb-outline"
                      size={64}
                      color="black"
                    />
                  ) : (
                    <MaterialIcons name="lightbulb" size={64} color="black" />
                  )}
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default index;
