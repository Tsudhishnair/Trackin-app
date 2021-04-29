import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { useState } from 'react/cjs/react.development';

export default function GroupBtn(props) {
  const [activeBtn, setActiveBtn] = useState(props.defaultValue);

  useEffect(() => {
    props.currentActiveBtn(props.defaultValue);
  }, []);

  return (
    <View style={styles.container}>
      {props.btn.map(btnItem => {
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              if (activeBtn != btnItem) {
                setActiveBtn(btnItem);
                props.currentActiveBtn(btnItem);
              }
            }}
            key={btnItem}>
            <View style={btnItem === activeBtn ? styles.activeBtn : styles.inActiveBtn}>
              <Text style={{ textTransform: 'capitalize' }}>{btnItem}</Text>
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
});
