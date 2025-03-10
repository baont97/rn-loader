import * as React from 'react';

import { Button, View, type ViewStyle } from 'react-native';
import { LoaderProvider, loaderRef } from '@baont97/rn-loader';

export default function App() {
  return (
    <LoaderProvider>
      <HomeScreen />
    </LoaderProvider>
  );
}

const HomeScreen: React.FC = () => {
  const onPress = () => {
    loaderRef.current?.show();
    setTimeout(() => loaderRef.current.hide(), 3000);
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
