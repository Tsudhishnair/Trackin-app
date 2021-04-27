import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import colors from '../config/colors';

export default function FabButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.actionFn}>
      <Entypo name="plus" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.brandColor,
    width: 56,
    height: 56,
    justifyContent: 'center',
  },
});
