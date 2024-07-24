import { Redirect, Stack } from "expo-router";
import { View, Text } from "react-native";
import React from "react";
import Loader from "../../components/Loader";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="guest"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      {/* <Loader isLoading={loading} /> */}
    </>
  );
};

export default AuthLayout;
