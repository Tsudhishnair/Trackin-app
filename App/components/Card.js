import React from "react";
import { View, StyleSheet } from "react-native";

export default function Card(props) {
  return (
    <View style={[styles.conatiner, { backgroundColor: props.bgcolor }]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    borderColor: "#D3D3D3",
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    elevation: 1,
  },
});
