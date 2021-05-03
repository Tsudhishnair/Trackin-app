import React, { useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

import GroupBtn from '../../../components/GroupBtn';
import colors from '../../../config/colors';

export default function AddEditExpenseLayout({ setFormValues, formValue, handleSave }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentActiveBtn = activeBtn => {
    setFormValues({ ...formValue, type: activeBtn });
  };
  const handleDatePicker = selectedDate => {
    const currentDate = dayjs(selectedDate).format('MMMM D, YYYY') || formValue.date;
    setShowDatePicker(false);
    setFormValues({ ...formValue, date: currentDate });
  };

  return (
    <View>
      <Text style={styles.sheetHeader}>Add Income/Expense</Text>
      <GroupBtn btn={['income', 'expense']} currentActiveBtn={currentActiveBtn} defaultValue={formValue.type} />
      <TextInput
        placeholder="Amount"
        style={styles.input}
        keyboardType={'numeric'}
        value={formValue.amount.toString()}
        onChangeText={value => {
          setFormValues({ ...formValue, amount: value });
        }}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={formValue.desc}
        onChangeText={value => {
          setFormValues({ ...formValue, desc: value });
        }}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          setShowDatePicker(true);
        }}>
        <View style={styles.customDatePicker}>
          <Text>{formValue.date || 'Date'}</Text>
        </View>
      </TouchableWithoutFeedback>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dayjs(formValue.date).toDate()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(e, selectedDate) => {
            handleDatePicker(selectedDate);
          }}
        />
      )}
      <Button
        title={'Save'}
        color={colors.green}
        onPress={() => {
          handleSave();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sheetHeader: {
    color: colors.textColor,
    fontSize: 20,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    marginVertical: 15,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
  },
  customDatePicker: {
    marginVertical: 10,
    borderColor: '#d4d4d4',
    padding: 9,
    borderRadius: 8,
    borderWidth: 1,
  },
});
