import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const Guest = () => {
  return (
    <SafeAreaView>
      <ScrollView className="mt-5">
        <View className="w-full">
          <Text className="text-black text-xl font-pbold text-center">
            Welcome to Our IoT Project{" "}
          </Text>
          <View className="py-6 bg-inherit ">
            <View>
              {/* <View className="flex flex-col items-center justify-center mx-auto p-10"> */}
              <Text className="p-2 text-sm font-medium tracking-wider text-center uppercase">
                Project Members
              </Text>
              <Text className="text-lg font-bold text-center leading-normal uppercase">
                {" "}
                The people behind the project
              </Text>
              <View className="flex flex-col justify-center mt-8 items-center">
                <View className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md  ">
                  <Image
                    className="self-center w-24 h-24 -mt-12 bg-center bg-cover rounded-full "
                    source={images.member1}
                  />
                  <View className="flex-1 my-4">
                    <Text className="text-xl font-psemibold leading-snug text-center">
                      Keo Sivphanchart
                    </Text>
                    <Text className=" text-base text-center font-pmedium">
                      <Text className=" font-psemibold">Leader</Text> | Hardware
                      & Software
                    </Text>
                  </View>
                </View>
                <View className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md  ">
                  <Image
                    className="self-center  w-24 h-24 -mt-12 bg-center bg-cover rounded-full "
                    source={images.member2}
                  />
                  <View className="flex-1 my-4">
                    <Text className="text-xl font-psemibold leading-snug text-center">
                      Houy Norin
                    </Text>
                    <Text className=" text-base text-center font-pmedium">
                      <Text className=" font-psemibold">Co-Leader</Text> | Design
                      Home Template
                    </Text>
                  </View>
                </View>
                <View className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md  ">
                  <Image
                    className="self-center  w-24 h-24 -mt-12 bg-center bg-cover rounded-full "
                    source={images.member3}
                  />
                  <View className="flex-1 my-4">
                    <Text className="text-xl font-psemibold leading-snug text-center">
                      Chhean Silapin
                    </Text>
                    <Text className=" text-base text-center font-pmedium">
                      <Text className=" font-psemibold">Member</Text> | Design
                      Home Template
                    </Text>
                  </View>
                </View>
                <View className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md">
                  <Image
                    alt=""
                    className="self-center  w-24 h-24 -mt-12 bg-center bg-cover rounded-full  "
                    source={images.member4}
                  />
                  <View className="flex-1 my-4">
                    <Text className="text-xl font-psemibold leading-snug text-center">
                      Kea Sorvan
                    </Text>
                    <Text className=" text-base text-center font-pmedium">
                      <Text className=" font-psemibold">Member</Text> | Design
                      Home Template
                    </Text>
                  </View>
                </View>
                <View className="flex flex-col justify-center items-center w-full px-8 mx-6 my-12 text-center rounded-md ">
                  <Image
                    className="self-center w-24 h-24 -mt-12 bg-center bg-cover rounded-full "
                    source={images.member5}
                  />
                  <View className=" my-4">
                    <Text className="text-xl font-psemibold leading-snug text-center">
                      Hang Bunchheng
                    </Text>
                    <Text className=" text-base text-center font-pmedium">
                      <Text className=" font-psemibold">Member</Text> | Software
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Guest;
