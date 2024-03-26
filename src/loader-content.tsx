import React from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
  type ModalProps,
  type StyleProp,
  type ViewStyle,
  type ActivityIndicatorProps,
} from 'react-native';
import { Zoomin } from './utils/zoomin';

export type TLoaderContentProps = {
  useAnimated?: boolean;
  loaderColor?: ActivityIndicatorProps['color'];
  renderLoader?: (props: TLoaderContentProps) => React.ReactNode;
  backdropColor?: ViewStyle['backgroundColor'];
  backdropOpacity?: ViewStyle['opacity'];
  activityLoaderProps?: ActivityIndicatorProps;
  loaderBackdropColor?: ViewStyle['backgroundColor'];
  loaderBackdropOpacity?: ViewStyle['opacity'];
} & ModalProps;

export const LoaderContent: React.FC<TLoaderContentProps> = (props) => {
  const {
    visible,
    useAnimated = true,
    loaderColor,
    renderLoader,
    backdropColor,
    backdropOpacity,
    loaderBackdropColor,
    activityLoaderProps,
    loaderBackdropOpacity,
    ...rest
  } = props;

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

  const AnimatedWrapper = useAnimated ? Zoomin : View;

  return (
    <Modal
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
      visible={visible}
    >
      <View style={$root}>
        <View style={$backdropOverried} />
        {renderLoader ? (
          renderLoader(props)
        ) : (
          <AnimatedWrapper>
            <View style={$loaderWrapper}>
              <View style={$loaderWrapperBackdropOverried} />
              <ActivityIndicator
                {...activityLoaderProps}
                color={loaderColor ?? 'white'}
              />
            </View>
          </AnimatedWrapper>
        )}
      </View>
    </Modal>
  );
};

const $root: StyleProp<ViewStyle> = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const $backdrop: StyleProp<ViewStyle> = [
  StyleSheet.absoluteFillObject,
  {
    zIndex: -1,
    opacity: 0.2,
  },
];

const $loaderWrapper: StyleProp<ViewStyle> = {
  aspectRatio: 1,
  padding: 20,
  borderRadius: 12,
  overflow: 'hidden',
};

const $loaderWrapperBackdrop: StyleProp<ViewStyle> = [
  StyleSheet.absoluteFillObject,
  {
    zIndex: -1,
    opacity: 0.8,
  },
];
