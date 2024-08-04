import React from "react";
import { Stack } from "expo-router";
const Homelayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="ControlLed1Floor"
        options={{
          headerTitle: "Control Led 1 Floor",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
        }}
      />
      <Stack.Screen
        name="ControlLed2Floor"
        options={{
          headerTitle: "Control Led 2 Floor",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
        }}
      />
      <Stack.Screen
        name="ControlDoor&Window"
        options={{
          headerTitle: "Control Door & Window",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
        }}
      />
      <Stack.Screen
        name="ControlAirConditioner"
        options={{
          headerTitle: "Control Air Conditioner",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
        }}
      />
      <Stack.Screen
        name="Temperature"
        options={{
          headerTitle: "Temperature",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
        }}
      />
      <Stack.Screen
        name="Garden"
        options={{
          headerTitle: "Garden",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
        }}
      />
      <Stack.Screen
        name="ControlSign"
        options={{
          headerTitle: "Control Sign",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
        }}
      />
    </Stack>
  );
};

export default Homelayout;
