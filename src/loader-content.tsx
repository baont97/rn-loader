import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type ActivityIndicatorProps,
} from 'react-native';
import { ScaleUp } from './utils/scale-up';
import { FadeIn } from './utils/fade-in';

export type TLoaderContentProps = {
  visible: boolean;
  useAnimated?: boolean;
  loaderColor?: ActivityIndicatorProps['color'];
  renderLoader?: (props: TLoaderContentProps) => React.ReactNode;
  backdropColor?: ViewStyle['backgroundColor'];
  backdropOpacity?: ViewStyle['opacity'];
  activityLoaderProps?: ActivityIndicatorProps;
  loaderBackdropColor?: ViewStyle['backgroundColor'];
  loaderBackdropOpacity?: ViewStyle['opacity'];
};

export const LoaderContent: React.FC<TLoaderContentProps> = (props) => {
  const {
    useAnimated = true,
    loaderColor,
    renderLoader,
    backdropColor,
    backdropOpacity = 0.2,
    loaderBackdropColor,
    activityLoaderProps,
    loaderBackdropOpacity = 0.8,
  } = props;

  // state
  const [isVisible, setIsVisible] = useState<boolean>(props.visible);

  // ref
  const scaleUpRef = React.createRef<ScaleUp>();
  const fadeInRef = React.createRef<FadeIn>();

  // effect
  useEffect(() => {
    if (!useAnimated) return;
    if (props.visible) {
      setIsVisible(true);
    } else {
      scaleUpRef.current?.unmount();
      fadeInRef.current?.unmount();
      setTimeout(() => setIsVisible(false), 150);
    }
  }, [props.visible, useAnimated, scaleUpRef, fadeInRef]);

  const $backdropOverried: StyleProp<ViewStyle> = StyleSheet.flatten([
    $backdrop,
    {
      backgroundColor: backdropColor ?? 'black',
      opacity: backdropOpacity ?? 0.2,
    },
  ]);

  const $loaderWrapperBackdropOverried: StyleProp<ViewStyle> =
    StyleSheet.flatten([
      $loaderWrapperBackdrop,
      {
        backgroundColor: loaderBackdropColor ?? 'black',
        opacity: loaderBackdropOpacity ?? 0.8,
      },
    ]);

  const AnimatedWrapper = {
    ScaleUp: useAnimated ? ScaleUp : View,
    FadeIn: useAnimated ? FadeIn : View,
  };

  const _isVisible = useAnimated ? isVisible : props.visible;

  return (
    _isVisible && (
      <View style={$root}>
        <AnimatedWrapper.FadeIn
          ref={fadeInRef}
          style={$backdropOverried}
          maxOpacity={backdropOpacity}
        />
        {renderLoader ? (
          renderLoader(props)
        ) : (
          <AnimatedWrapper.ScaleUp ref={scaleUpRef}>
            <View style={$loaderWrapper}>
              <View style={$loaderWrapperBackdropOverried} />
              <ActivityIndicator
                {...activityLoaderProps}
                color={loaderColor ?? 'white'}
              />
            </View>
          </AnimatedWrapper.ScaleUp>
        )}
      </View>
    )
  );
};

const $root: StyleProp<ViewStyle> = [
  StyleSheet.absoluteFillObject,
  {
    alignItems: 'center',
    justifyContent: 'center',
  },
];

const $backdrop: StyleProp<ViewStyle> = [
  StyleSheet.absoluteFillObject,
  { zIndex: -1 },
];

const $loaderWrapper: StyleProp<ViewStyle> = {
  aspectRatio: 1,
  padding: 20,
  borderRadius: 12,
  overflow: 'hidden',
};

const $loaderWrapperBackdrop: StyleProp<ViewStyle> = [
  StyleSheet.absoluteFillObject,
  { zIndex: -1 },
];
