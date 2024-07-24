import { StatusBar } from "expo-status-bar";
import { Redirect, Link, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";
import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";
import GradientText from "../components/GradientText";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="h-full">
      <Loader isLoading={loading} />
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <View className="flex flex-row relative mt-5">
            <Text className=" font-pblack text-[30px] text-black text-center">
              IoT |{" "}
            </Text>
            <GradientText className="text-[30px] font-pblack">
              SMART HOME
            </GradientText>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <View className="mt-28 w-full">
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/login")}
              containerStyles="w-full  bg-red-100"
            />

            <CustomButton
              title="Continue with Guest"
              handlePress={() => router.push("/guest")}
              containerStyles="w-full mt-5 bg-red-100"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
