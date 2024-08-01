import { View, Text } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Camera } from "react-native-vision-camera";
//import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
//import { Camera } from "expo-camera";

//const TensorflowCamera = cameraWithTensors(Camera);
const index = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const cameraRef = useRef(null);
  useEffect(() => {
    (async () => {
     

      // await tf.ready();

      // // Load the custom model
      // const modelJsonUri = require('./assets/model.json'); // Path to your model.json
      // const weightsUris = [
      //   require('./assets/weights1.bin'),
      //   require('./assets/weights2.bin'),
      //   require('./assets/weights3.bin'),
      // ];
      // const model = await tf.loadGraphModel(bundleResourceIO(modelJsonUri, weightsUris));
      // setModel(model);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Sign</Text>
    </View>
  );
};

export default index;
