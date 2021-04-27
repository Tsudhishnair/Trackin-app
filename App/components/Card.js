import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card(props) {
  return <View style={[styles.conatiner, { backgroundColor: props.bgcolor || '#fff' }]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  conatiner: {
    borderColor: '#D3D3D3',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    margin: 10,
    elevation: 1,
  },
});
