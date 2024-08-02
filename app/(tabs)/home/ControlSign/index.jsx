import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useFocusEffect } from "expo-router";

const index = () => {
  const device = useCameraDevice("front", {
    physicalDevices: ["ultra-wide-angle-camera"],
  });
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isActive, setIsActive] = useState(false);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const cameraRef = useRef(null);
  const frameProcessor = useFrameProcessor((frame)=>{
    'worklet'
    console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
  },[])
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    // (async () => {
    //   // await tf.ready();
    //   // // Load the custom model
    //   // const modelJsonUri = require('./assets/model.json'); // Path to your model.json
    //   // const weightsUris = [
    //   //   require('./assets/weights1.bin'),
    //   //   require('./assets/weights2.bin'),
    //   //   require('./assets/weights3.bin'),
    //   // ];
    //   // const model = await tf.loadGraphModel(bundleResourceIO(modelJsonUri, weightsUris));
    //   // setModel(model);
    // })();
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
    },[])
  );
  return (
    <View className="flex flex-1">
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        frameProcessor={frameProcessor}
      />
    </View>
  );
};

export default index;
