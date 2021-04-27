import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import colors from '../config/colors';

export default function Navbar() {
  return (
    <View style={styles.container}>
      <Image source={require('../assests/TrackIT.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.brandColor,
    alignItems: 'center',
    height: 50,
  },
  logo: {
    width: 140,
    height: 30,
    marginTop: 5,
    resizeMode: 'contain',
  },
});
