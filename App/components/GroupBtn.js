import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { useState } from 'react/cjs/react.development';

export default function GroupBtn(props) {
  const { currentActiveBtn, defaultValue, btn } = props;
  const [activeBtn, setActiveBtn] = useState(defaultValue);

  useEffect(() => {
    currentActiveBtn(defaultValue);
  }, []);

  const handleBtnPress = btnItem => {
    if (activeBtn != btnItem) {
      setActiveBtn(btnItem);
      currentActiveBtn(btnItem);
    }
  };
  return (
    <View style={styles.container}>
      {btn.map(btnItem => {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              handleBtnPress(btnItem);
            }}
            key={btnItem}>
            <View style={btnItem === activeBtn ? styles.activeBtn : styles.inActiveBtn}>
              <Text style={styles.buttonText}>{btnItem}</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#E9E9E9',
    marginVertical: 20,
    alignSelf: 'center',
  },
  activeBtn: {
    borderRadius: 8,
    backgroundColor: '#FFC700',
    padding: 15,
    paddingHorizontal: 25,
  },
  inActiveBtn: {
    borderRadius: 8,
    backgroundColor: '#E9E9E9',
    padding: 15,
    paddingHorizontal: 25,
  },
  buttonText: {
    textTransform: 'capitalize',
  },
});
