import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card(props) {
  const { backgroundColorProp } = props;
  const styles = StyleSheet.create({
    container: {
      borderColor: '#D3D3D3',
      backgroundColor: backgroundColorProp || '#fff',
      borderRadius: 8,
      borderWidth: StyleSheet.hairlineWidth,
      padding: 10,
      margin: 10,
      elevation: 1,
    },
  });

  return <View style={styles.container}>{props.children}</View>;
}
