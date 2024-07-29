import { View, Text } from 'react-native'
import React from 'react'
//import { useCameraDevice } from 'react-native-vision-camera'

const index = () => {
   // const device = useCameraDevice('back')
    //const { hasPermission } = useCameraPermission()
    //if (!hasPermission) return <PermissionsPage />
    //if (device == null) return <NoCameraDeviceError />
  return (
  <View>
    <Text>
      Sign
    </Text>
  </View>
    //  <Camera
    //   style={StyleSheet.absoluteFill}
    //   device={device}
    //   isActive={true}
    // />
  )
}

export default index