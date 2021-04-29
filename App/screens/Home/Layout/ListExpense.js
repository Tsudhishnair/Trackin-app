import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
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
    if (date === dayjs().format('MMMM D, YYYY')) {
      return 'Today';
    } else {
      return date;
    }
  };

  const formattedArrayForSectionList = () => {
    let tempDetailedList = [...detailedTrackList];
    let formattedArray = tempDetailedList.map(perDayExpense => {
      return { date: perDayExpense.date, data: [...perDayExpense.details] };
    });
    return formattedArray;
  };

  const sectionItemList = ({ item }) => {
    return (
      <Card>
        <TouchableOpacity
          style={styles.listExpenseItem}
          onPress={() => {
            onItemPress(item.id);
          }}>
          <Text style={styles.expenseDesc}>{item.desc}</Text>
          <Text style={item.type === 'income' ? styles.incomeAmount : styles.expenseAmount}>{`$${item.amount}`}</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  const sectionHeader = header => {
    return <Text style={styles.date}>{formatDate(header)}</Text>;
  };

  return (
    <View style={styles.listExpenseWrapper}>
      <SectionList
        sections={formattedArrayForSectionList()}
        keyExtractor={(item, index) => item.id + index}
        renderItem={sectionItemList}
        renderSectionHeader={({ section: { date } }) => sectionHeader(date)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listExpenseWrapper: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 20,
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
