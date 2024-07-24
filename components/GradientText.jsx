import React from 'react';
import {Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const GradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={['#30cfd0', '#330867']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} className=" text-transparent" />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;