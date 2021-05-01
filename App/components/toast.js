import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import colors from '../config/colors';

export default function Toast({ toastObj, handleToast }) {
  const [toastStyles, setToastStyles] = useState({ container: '', textStyle: '' });

  useEffect(() => {
    computeStyle();
    setTimeout(function () {
      handlePress();
    }, 3000);
  }, [toastObj]);

  const computeStyle = () => {
    if (toastObj.type === 'success') {
      setToastStyles({ container: styles.successContainer, textStyle: styles.successText });
    } else if (toastObj.type === 'warning') {
      setToastStyles({ container: styles.warningContainer, textStyle: styles.warningText });
    } else {
      setToastStyles({ container: styles.errorContainer, textStyle: styles.errorText });
    }
  };

  const handlePress = () => {
    handleToast(false);
  };

  return (
    <View style={[styles.toastContainer, toastStyles.container]}>
      <Text style={toastStyles.textStyle}>{toastObj.message}</Text>
      <TouchableOpacity onPress={() => handlePress()} activeOpacity={0.5}>
        <View>
          <AntDesign name="closecircle" size={20} color={colors.textColor} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    margin: 15,
    bottom: 0,
    alignSelf: 'center',
    elevation: 5,
    borderWidth: 2,
    borderRadius: 8,
    width: '90%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successContainer: {
    borderColor: '#489c70',
    backgroundColor: '#4dd68f',
  },
  successText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  warningContainer: {
    borderColor: colors.brandColor,
    backgroundColor: '#fcf38d',
  },
  warningText: {
    color: colors.textColor,
    fontWeight: 'bold',
  },
  errorContainer: {
    borderColor: '#d14017',
    backgroundColor: '#f58262',
  },
  errorText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
