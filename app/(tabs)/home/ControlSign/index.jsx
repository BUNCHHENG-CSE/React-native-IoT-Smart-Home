import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { useFocusEffect } from "expo-router";

const index = () => {
  const device = useCameraDevice("front", {
    physicalDevices: ["ultra-wide-angle-camera"],
  });
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  if (!hasPermission) {
    <ActivityIndicator />;
  }
  if (!device) {
    return <Text>Camera device not found</Text>;
  }
  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, [])
  );
  return (
    <View className="flex flex-1">
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
      />
    </View>
  );
};

export default index;
