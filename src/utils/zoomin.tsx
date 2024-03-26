import React, { useRef, type PropsWithChildren, useEffect } from 'react';
import { Animated } from 'react-native';

type TZoominProps = {} & PropsWithChildren;

export const Zoomin: React.FC<TZoominProps> = (props) => {
  const scale = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View style={{ transform: [{ scale: scale }] }}>
      {props.children}
    </Animated.View>
  );
};
