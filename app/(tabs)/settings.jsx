import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const settings = () => {
  const { setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const logout = () => {
    AsyncStorage.removeItem("token")
      .then(() => {
        setSubmitting(true);
        console.log("Data removed successfully.");
        setIsLogged(false);
        router.replace("/login");
      })
      .catch((error) => {
        console.error("Error removing data: ", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <>
      <SafeAreaView>
        <View className="mt-10 h-full">
          <CustomButton
            title="Log Out"
            handlePress={logout}
            containerStyles="mt-5 bg-red-600 mx-5"
            textStyles="text-white "
            isLoading={isSubmitting}
            className=""
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default settings;
