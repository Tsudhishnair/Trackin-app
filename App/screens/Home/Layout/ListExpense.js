import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

import Card from '../../../components/Card';
import colors from '../../../config/colors';

export default function ListExpenseLayout(props) {
  const { setAddOrViewLayout, setCurrentViewingExp, setBottomSheet, detailedTrackList } = props;

  const onItemPress = id => {
    setCurrentViewingExp(id);
    setBottomSheet(true);
    setAddOrViewLayout('view');
  };

  const formatDate = date => {
    if (date == dayjs().format('MMMM D, YYYY')) {
      return 'Today';
    } else {
      return date;
    }
  };

  return (
    <View style={styles.listExpenseWrapper}>
      {detailedTrackList.length != 0 &&
        detailedTrackList.map((individualExpenseDetails, index) => {
          return (
            <View key={index}>
              <Text style={styles.date}>{formatDate(individualExpenseDetails.date)}</Text>
              {individualExpenseDetails.details.map((item, index) => {
                return (
                  <Card key={index}>
                    <TouchableOpacity
                      style={styles.listExpenseItem}
                      onPress={() => {
                        onItemPress(item.id);
                      }}>
                      <Text style={styles.expenseDesc}>{item.desc}</Text>
                      <Text style={item.type == 'income' ? styles.incomeAmount : styles.expenseAmount}>{`$${item.amount}`}</Text>
                    </TouchableOpacity>
                  </Card>
                );
              })}
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  listExpenseWrapper: {
    marginHorizontal: 5,
  },
  listExpenseItem: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },
  date: {
    color: colors.textColor,
    alignSelf: 'center',
    fontSize: 16,
  },
  expenseDesc: {
    color: colors.textColor,
    fontWeight: '400',
    fontSize: 14,
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
