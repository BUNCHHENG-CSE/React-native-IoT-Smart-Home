import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
  useSkiaFrameProcessor,
} from "react-native-vision-camera";
import { useFocusEffect } from "expo-router";
import { BlendColor, ColorMatrix, Paint,rect2rect } from "@shopify/react-native-skia";


const index = () => {
 
  const device = useCameraDevice("front", {
    physicalDevices: ["ultra-wide-angle-camera"],
  });
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isActive, setIsActive] = useState(false);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const cameraRef = useRef(null);

  const frameProcessor = useSkiaFrameProcessor((frame) => {
    'worklet'
    frame.render()
  
    const centerX = frame.width / 2
    const centerY = frame.height / 2
    const rect = rect2rect(centerX, centerY, 150, 150)
    const paint = Paint()
    paint.setColor()
    frame.drawRect(rect, paint)
  }, [])

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
         pixelFormat="rgb"
        frameProcessor={frameProcessor}
      />
    </View>
  );
};

export default index;
