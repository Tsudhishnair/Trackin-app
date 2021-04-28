import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function SwipeableBottomSheet(props) {
  const swipeHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    swipeUp();
  }, []);

  const swipeUp = () => {
    Animated.timing(swipeHeight, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const swipeDown = () => {
    Animated.timing(swipeHeight, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.swipeCardContainer,
          {
            height: swipeHeight.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '95%'],
            }),
            padding: swipeHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 20],
            }),
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            swipeDown();
            setTimeout(() => {
              props.setBottomSheet(false);
              props.onClose();
            }, 1000);
          }}>
          <AntDesign name="close" size={20} color="black" style={{ alignSelf: 'flex-end' }} />
        </TouchableOpacity>
        {props.children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
  },
  swipeCardContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
});
