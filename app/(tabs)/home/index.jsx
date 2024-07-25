import React, { useEffect } from "react";
import { View, Text, Image,FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatureCard from "../../../components/FeatureCard";
import { icons } from "../../../constants";
import { images } from "../../../constants";

const home = () => {
  const features = [
    { id: 1, title: "Control Led 1 Floor", icon: icons.led },
    { id: 2, title: "Control Led 2 Floor", icon: icons.led },
    { id: 3, title: "Control Air Conditioner", icon: icons.airconditioner },
    { id: 4, title: "Control Door & Window", icon: icons.door },
    { id: 5, title: "Temperature", icon: icons.temperature },
    { id: 6, title: "Garden", icon: icons.garden },
  ];
  return (
    <>
      <SafeAreaView>
        <FlatList
          data={features}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <FeatureCard id={item.id} title={item.title} icon={item.icon} />
          )}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={() => (
            <View className="flex mt-6 mb-2 px-4 space-y-4 ">
              <View className="flex justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pextrabold text-2xl text-black">
                    IoT | Smart Home
                  </Text>
                  <Text className="text-sm font-psemibold text-gray-400 uppercase">
                  RUPP | Computer Science
                  </Text>
                </View>

                <View className="mt-1.5">
                  <Image
                    source={images.logo}
                    className="w-12 h-12"
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default home;
