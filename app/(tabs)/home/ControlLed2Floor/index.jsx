import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState,useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEMQXConnectionContext } from "../../../../context/EMQXConnectionProvider";
import GradientText from "../../../../components/GradientText";
import { MaterialIcons } from "@expo/vector-icons";

const index = () => {
  const { mqttPublish } = useEMQXConnectionContext();

  const [be1ledToggle, setBe1LedToggle] = useState("");
  const [ba1ledToggle, setBa1LedToggle] = useState("");
  const [wwledToggle, setWWLedToggle] = useState("");
  const [be2ledToggle, setBe2LedToggle] = useState("");
  const [ba2ledToggle, setBa2LedToggle] = useState("");
  const [offledToggle, setOffLedToggle] = useState("");
  const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("led5")
      .then((value) => {
        if (value !== null) {
          setBe1LedToggle(value);
        } else {
          AsyncStorage.setItem("led5", "OFF5")
            .then(() => {
              setBe1LedToggle("OFF5");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("led6")
      .then((value) => {
        if (value !== null) {
          setBa1LedToggle(value);
        } else {
          AsyncStorage.setItem("led6", "OFF6")
            .then(() => {
              setBa1LedToggle("OFF6");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("led7")
      .then((value) => {
        if (value !== null) {
          setWWLedToggle(value);
        } else {
          AsyncStorage.setItem("led7", "OFF7")
            .then(() => {
              setWWLedToggle("OFF7");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("led8")
      .then((value) => {
        if (value !== null) {
          setBe2LedToggle(value);
        } else {
          AsyncStorage.setItem("led8", "OFF8")
            .then(() => {
              setBe2LedToggle("OFF8");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("led9")
      .then((value) => {
        if (value !== null) {
          setBa2LedToggle(value);
        } else {
          AsyncStorage.setItem("led9", "OFF9")
            .then(() => {
              setBa2LedToggle("OFF9");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("led10")
      .then((value) => {
        if (value !== null) {
          setOffLedToggle(value);
        } else {
          AsyncStorage.setItem("led10", "OFF10")
            .then(() => {
              setOffLedToggle("OFF10");
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
      id: 5,
      name: "Bedroom",
      value: be1ledToggle,
      setv: setBe1LedToggle,
      floor: "2",
    },
    {
      id: 6,
      name: "Bathroom",
      value: ba1ledToggle,
      setv: setBa1LedToggle,
      floor: "2",
    },
    {
      id: 7,
      name: "Walkway",
      value: wwledToggle,
      setv: setWWLedToggle,
      floor: "2",
    },
    {
      id: 8,
      name: "Bedroom",
      value: be2ledToggle,
      setv: setBe2LedToggle,
      floor: "2",
    },
    {
      id: 9,
      name: "Bathroom",
      value: ba2ledToggle,
      setv: setBa2LedToggle,
      floor: "2",
    },
    {
      id: 10,
      name: "Office",
      value: offledToggle,
      setv: setOffLedToggle,
      floor: "2",
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
          Control LED First Floor
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
