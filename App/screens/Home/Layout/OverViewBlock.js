import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../../../config/colors';
import Card from '../../../components/Card';

export default function OverViewBlock({ summaryValue }) {
  return (
    <View style={styles.overViewContainer}>
      <Card>
        <View style={styles.overViewBody}>
          <View style={styles.amountWrapper}>
            <Text style={styles.label}>Balance</Text>
            <Text style={styles.balanceAmount}>{`$${summaryValue.balance}`}</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.incomeExpenseWrapper}>
            <View style={styles.amountWrapper}>
              <Text style={styles.label}>Income</Text>
              <Text style={styles.incomeAmount}>{`$${summaryValue.income}`}</Text>
            </View>
            <View style={styles.amountWrapper}>
              <Text style={styles.expenseAmount}>{`$${summaryValue.expense}`}</Text>
              <Text style={styles.label}>Expense</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  overViewContainer: {
    backgroundColor: '#fff',
    padding: 5,
  },
  overViewBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  verticalDivider: {
    borderColor: '#D3D3D3',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: StyleSheet.hairlineWidth,
  },
  amountWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },

  label: {
    color: colors.textColor,
  },
  balanceAmount: {
    color: '#02BEE8',
    fontWeight: 'bold',
    fontSize: 24,
  },
  incomeExpenseWrapper: {
    alignItems: 'center',
  },
  incomeAmount: {
    color: '#00B152',
    fontSize: 20,
    fontWeight: 'bold',
  },
  expenseAmount: {
    color: '#D10000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
