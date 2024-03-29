import * as React from 'react';

import { Button, View, type ViewStyle } from 'react-native';
import { LoaderProvider, useLoader } from '@baont97/rn-loader';

export default function App() {
  return (
    <LoaderProvider>
      <HomeScreen />
    </LoaderProvider>
  );
}

const HomeScreen: React.FC = () => {
  const loader = useLoader();

  const onPress = () => {
    loader.show();
    setTimeout(() => loader.hide(), 3000);
  };

  return (
    <View style={$root}>
      <Button title="Show modal" onPress={onPress} />
    </View>
  );
};

const $root: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
};
