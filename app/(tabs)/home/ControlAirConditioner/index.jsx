import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEMQXConnectionContext } from "../../../../context/EMQXConnectionProvider";
import GradientText from "../../../../components/GradientText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const index = () => {
  const { mqttPublish } = useEMQXConnectionContext();
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };
  useEffect(() => {
    spin();
  }, []);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const [ac1Toggle, setAC1Toggle] = useState("");
  const [ac2Toggle, setAC2Toggle] = useState("");
  const [ac3Toggle, setAC3Toggle] = useState("");
  const [ac4Toggle, setAC4Toggle] = useState("");
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  const acLists = [
    {
      id: 1,
      name: "Living Room ",
      value: ac1Toggle,
      setv: setAC1Toggle,
    },
    {
      id: 2,
      name: "Bedroom 1 ",
      value: ac2Toggle,
      setv: setAC2Toggle,
    },
    {
      id: 3,
      name: "Bedroom 2 ",
      value: ac3Toggle,
      setv: setAC3Toggle,
    },
    {
      id: 4,
      name: "Office ",
      value: ac4Toggle,
      setv: setAC4Toggle,
    },
  ];

  useEffect(() => {
    AsyncStorage.getItem("ac1")
      .then((value) => {
        if (value !== null) {
          setAC1Toggle(value);
        } else {
          AsyncStorage.setItem("ac1", "OFF1")
            .then(() => {
              setAC1Toggle("OFF1");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("ac2")
      .then((value) => {
        if (value !== null) {
          setAC2Toggle(value);
        } else {
          AsyncStorage.setItem("ac2", "OFF2")
            .then(() => {
              setAC2Toggle("OFF2");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("ac3")
      .then((value) => {
        if (value !== null) {
          setAC3Toggle(value);
        } else {
          AsyncStorage.setItem("ac3", "OFF3")
            .then(() => {
              setAC3Toggle("OFF3");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving data: ", error);
      });

    AsyncStorage.getItem("ac4")
      .then((value) => {
        if (value !== null) {
          setAC4Toggle(value);
        } else {
          AsyncStorage.setItem("ac4", "OFF4")
            .then(() => {
              setAC4Toggle("OFF4");
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
          Control Air Conditioner
        </Text>
      </View>
      <ScrollView>
        <View className="mb-24 flex items-center">
          {acLists.map((ac) => (
            <Pressable
              key={ac.id}
              className="h-lg w-72 px-10 py-7 rounded-3xl mt-4 shadow-lg bg-white shadow-zinc-800 transition-all duration-300 ease "
              onPress={() =>
                ac.setv(
                  ac.value === "OFF" + ac.id ? "ON" + ac.id : "OFF" + ac.id,
                  
                  mqttPublish({
                    topic: "esp32/smarthome",
                    qos: 0,
                    payload: JSON.stringify({
                      fan:
                        ac.value === "OFF" + ac.id
                          ? "ON" + ac.id
                          : "OFF" + ac.id,
                    }),
                  }),
                  storeData(
                    "ac" + ac.id,
                    ac.value === "OFF" + ac.id ? "ON" + ac.id : "OFF" + ac.id
                  ),
                )
              }
            >
              <View className="flex items-center flex-col">
                <View className="">
                  <Text className="mt-4 mb-1 text-[20px] font-pextrabold">
                    {ac.name}
                  </Text>
                </View>
                <View>
                  {ac.value === "OFF" + ac.id ? (
                    <MaterialCommunityIcons
                      name="fan"
                      size={64}
                      color="black"
                    />
                  ) : (
                    <Animated.View style={{ transform: [{ rotate }] }}>
                      <MaterialCommunityIcons
                        name="fan"
                        size={64}
                        color="black"
                      />
                    </Animated.View>
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
