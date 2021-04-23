import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";

export default function GroupBtn(props) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={styles.activeBtn}>
          <Text>Income</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.inActiveBtn}>
          <Text>Expense</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "#E9E9E9",
    marginVertical: 20,
    alignSelf: "center",
  },
  activeBtn: {
    borderRadius: 8,
    backgroundColor: "#FFC700",
    padding: 15,
    paddingHorizontal: 25,
  },
  inActiveBtn: {
    borderRadius: 8,
    backgroundColor: "#E9E9E9",
    padding: 15,
    paddingHorizontal: 25,
  },
});
