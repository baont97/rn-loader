# rn-loader

Display a loader on top of app

## Installation

```sh
yarn add @baont97/rn-loader
```

## Usage

```js
import { LoaderProvider, useLoader, loaderRef } from 'rn-loader';

// ...
    <LoaderProvider>
      <HomeScreen />
    </LoaderProvider>

    const HomeScreen: React.FC = () => {
      const loader = useLoader();
    
      const onPress = () => {
        // use from hook
        loader.show();
        setTimeout(() => loader.hide(), 3000);

        // use from ref
        loaderRef.current?.show();
        setTimeout(() => loaderRef.current.hide(), 3000);
      };
    
      return (
        <View style={$root}>
          <Button title="Show modal" onPress={onPress} />
        </View>
      );
    };
```
