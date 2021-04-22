import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Card from "../components/Card";
import FabButton from "../components/FabButton";

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
              <Text style={styles.label}>Expense</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  const expenseType = "income";
  const listExpenseView = () => {
    return (
      <View style={styles.listExpenseWrapper}>
        <Text style={styles.date}>Today</Text>
        <Card>
          <TouchableOpacity style={styles.listExpenseItem}>
            <Text style={styles.expenseDesc}>Salary</Text>
            <Text
              style={
                expenseType == "income"
                  ? styles.incomeAmount
                  : styles.expenseAmount
              }
            >
              $3290
            </Text>
          </TouchableOpacity>
        </Card>
        <Card>
          <TouchableOpacity style={styles.listExpenseItem}>
            <Text style={styles.label}>Furniture</Text>
            <Text
              style={
                expenseType == "income"
                  ? styles.incomeAmount
                  : styles.expenseAmount
              }
            >
              $9
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.overViewContainer}>{overViewblock()}</View>
      <ScrollView style={styles.listExpenses}>{listExpenseView()}</ScrollView>
      <View style={styles.fabButtonWrapper}>
        <FabButton />
      </View>
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
  listExpenses: {
    marginVertical: 20,
  },
  listExpenseWrapper: {
    marginHorizontal: 5,
  },
  listExpenseItem: {
    flexDirection: "row",
    padding: 8,
    justifyContent: "space-between",
  },
  date: {
    color: colors.textColor,
    alignSelf: "center",
    fontSize: 16,
  },
  expenseDesc: {
    color: colors.textColor,
    fontWeight: "400",
    fontSize: 14,
  },
  fabButtonWrapper: {
    bottom: 20,
    alignSelf: "center",
    position: "absolute",
  },
});
