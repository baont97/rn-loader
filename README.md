# rn-loader

Display a loader on top of app

## Installation

```sh
yarn add rn-loader
```

## Usage

```js
import { LoaderProvider, useLoader } from 'rn-loader';

// ...
    <LoaderProvider>
      <HomeScreen />
    </LoaderProvider>

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
```
