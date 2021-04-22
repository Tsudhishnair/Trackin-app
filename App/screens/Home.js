import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Card from "../components/Card";

import colors from "../config/colors";

export default function Home(props) {
  const overViewblock = () => {
    return (
      <Card bgcolor={"#fff"}>
        <View style={styles.overViewBody}>
          <View style={styles.amountWrapper}>
            <Text style={styles.label}>Balance</Text>
            <Text style={styles.balanceAmount}>$3,000</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.incomeExpenseWrapepr}>
            <View style={styles.amountWrapper}>
              <Text style={styles.label}>Income</Text>
              <Text style={styles.incomeAmount}>$7,124</Text>
            </View>
            <View style={styles.amountWrapper}>
              <Text style={styles.expenseAmount}>$4,329</Text>
              <Text style={styles.label}>Balance</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View>
      <View style={styles.overViewContainer}>{overViewblock()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  overViewContainer: {
    backgroundColor: "#fff",
    padding: 5,
  },
  overViewBody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  verticalDivider: {
    borderColor: "#D3D3D3",
    display: "flex",
    flexDirection: "column",
    borderWidth: StyleSheet.hairlineWidth,
  },
  amountWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  label: {
    color: colors.textColor,
  },
  balanceAmount: {
    color: "#02BEE8",
    fontWeight: "bold",
    fontSize: 24,
  },
  incomeExpenseWrapepr: {
    alignItems: "center",
  },
  incomeAmount: {
    color: "#00B152",
    fontSize: 20,
    fontWeight: "bold",
  },
  expenseAmount: {
    color: "#D10000",
    fontSize: 20,
    fontWeight: "bold",
  },
});
