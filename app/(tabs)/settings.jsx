import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const settings = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const logout = () => {
    setSubmitting(true);
    AsyncStorage.removeItem("token")
  .then(() => {
    console.log('Data removed successfully.');
   // return router.replace("/login")
    return router.navigate('/login')
  })
  .catch(error => {
    console.error('Error removing data: ', error);
  });
    
    
  };
  return (
    <>
      <SafeAreaView>
        
        <View className="mt-10 h-full">
       
         
          <CustomButton
            title="Log Out"
            handlePress={logout}
            containerStyles="mt-5 bg-red-600  mx-5"
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
