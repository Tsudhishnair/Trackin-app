import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, TouchableWithoutFeedback, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Card from '../components/Card';
import FabButton from '../components/FabButton';
import GroupBtn from '../components/GroupBtn';
import SwipableBottomSheet from '../components/SwipableBottomSheet';
import colors from '../config/colors';
import { MainContext } from '../contexts/MainContext';

export default function Home(props) {
  // State to show/Hide the swipable bottom sheet
  const [bottomSheetVisible, setBottomSheet] = useState(false);
  // State that determines wheather to show the 'add income/expense' layout or just 'income/expense View' layout
  const [addOrViewLayout, setAddOrViewLayout] = useState('add');
  const [currentViewingExp, setCurrentViewingExp] = useState('');
  const [formValue, setFormvalues] = useState({
    amount: '',
    type: 'income',
    desc: '',
    date: new Date().toDateString(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    summaryValue,
    setSummaryValue,
    detailedTrackList,
    updatetDetailedTrakList,
    calcuteSumaryValues,
    deleteIndividualExpenses,
    addNewExpense,
    editExpense,
    load,
  } = useContext(MainContext);

  useEffect(() => {
    calcuteSumaryValues();
  }, [detailedTrackList]);

  useEffect(() => {
    load();
  }, []);

  const overViewblock = () => {
    return (
      <Card bgcolor={'#fff'}>
        <View style={styles.overViewBody}>
          <View style={styles.amountWrapper}>
            <Text style={styles.label}>Balance</Text>
            <Text style={styles.balanceAmount}>{`$${summaryValue.balance}`}</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.incomeExpenseWrapepr}>
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
    );
  };

  const listExpenseView = () => {
    return (
      <View style={styles.listExpenseWrapper}>
        {detailedTrackList.length != 0 &&
          detailedTrackList.map((individualExpenseDetails, index) => {
            return (
              <View key={index}>
                <Text style={styles.date}>{individualExpenseDetails.date}</Text>
                {individualExpenseDetails.details.map((item, index) => {
                  return (
                    <Card key={index}>
                      <TouchableOpacity
                        style={styles.listExpenseItem}
                        onPress={() => {
                          setCurrentViewingExp(item.id);
                          setBottomSheet(true);
                          setAddOrViewLayout('view');
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
  };

  const addEditExpenseLayout = () => {
    const currentActiveBtn = activeBtn => {
      setFormvalues({ ...formValue, type: activeBtn });
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
            setFormvalues({ ...formValue, amount: value });
          }}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={formValue.desc}
          onChangeText={value => {
            setFormvalues({ ...formValue, desc: value });
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            setShowDatePicker(true);
          }}>
          <View style={styles.customDatePicker}>
            <Text>{formValue.date.toString() || 'Date'}</Text>
          </View>
        </TouchableWithoutFeedback>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(formValue.date)}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(e, selectedDate) => {
              const currentDate = selectedDate.toDateString() || formValue.date.toString();
              setFormvalues({ ...formValue, date: currentDate });
              setShowDatePicker(false);
            }}
          />
        )}

        <TouchableWithoutFeedback
          onPress={() => {
            setBottomSheet(false);
            let dataObj = {
              date: formValue.date.toString(),
              details: [
                {
                  type: formValue.type,
                  amount: Number(formValue.amount),
                  desc: formValue.desc,
                },
              ],
            };
            //This checks wheather to call the add new Fn or edit function. currentViewingExp will only have the id if we click on individual expense item
            if (currentViewingExp != '') {
              editExpense(currentViewingExp, dataObj);
              setCurrentViewingExp('');
            } else {
              addNewExpense(dataObj);
            }
            setFormvalues({
              type: 'income',
              amount: '',
              desc: '',
              date: new Date().toDateString(),
            });
          }}>
          <View style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const viewIndividualExpense = id => {
    return (
      <>
        {detailedTrackList.length > 0 &&
          detailedTrackList.map((individualExpenseDetails, index) => {
            return (
              <View key={index}>
                {individualExpenseDetails.details
                  .filter(item => item.id == id)
                  .map((filteredList, index) => (
                    <View key={index} style={styles.detailedExpenseWrapper}>
                      <Text style={[styles.labelHeader, { textTransform: 'capitalize' }]}>{filteredList.type}</Text>
                      <Text style={[styles.individualAmount, filteredList.type == 'income' ? { color: colors.green } : { color: colors.red }]}>
                        {`$${filteredList.amount}`}
                      </Text>
                      <Text style={styles.individualDesc}>{filteredList.desc}</Text>
                      <Text style={styles.individualDate}>{individualExpenseDetails.date || '-'}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setAddOrViewLayout('add');
                          detailedTrackList.map(individualExpenseDetails => {
                            return individualExpenseDetails.details.map(item => {
                              if (item.id == currentViewingExp) {
                                setFormvalues({
                                  type: item.type,
                                  amount: item.amount.toString(),
                                  desc: item.desc,
                                  date: individualExpenseDetails.date.toString(),
                                });
                              }
                            });
                          });
                        }}
                        style={{ marginTop: 15 }}>
                        <Text style={styles.editBtnTxt}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          deleteIndividualExpenses(id);
                          setBottomSheet(false);
                        }}
                        style={{ marginVertical: 10 }}>
                        <Text style={styles.deleteBtnTxt}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            );
          })}
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.brandColor} />
      <View style={styles.overViewContainer}>{overViewblock()}</View>
      <ScrollView style={styles.listExpenses}>{listExpenseView()}</ScrollView>
      <View style={styles.fabButtonWrapper}>
        <FabButton
          actionFn={() => {
            setBottomSheet(true);
            setAddOrViewLayout('add');
          }}
        />
      </View>
      {bottomSheetVisible && (
        <SwipableBottomSheet
          toHeight={90}
          setBottomSheet={setBottomSheet}
          onClose={() => {
            setCurrentViewingExp('');
            setFormvalues({
              type: 'income',
              amount: '',
              desc: '',
              date: new Date().toDateString(),
            });
          }}>
          {addOrViewLayout == 'add' ? addEditExpenseLayout() : viewIndividualExpense(currentViewingExp)}
        </SwipableBottomSheet>
      )}
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
  incomeExpenseWrapepr: {
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
  listExpenses: {
    marginVertical: 20,
  },
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
  fabButtonWrapper: {
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',
  },
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
  saveBtn: {
    alignSelf: 'center',
  },
  saveBtnText: {
    color: colors.green,
    fontSize: 16,
    fontWeight: '400',
  },
  detailedExpenseWrapper: {
    alignItems: 'center',
  },
  labelHeader: {
    fontWeight: '400',
    fontSize: 18,
    color: colors.textColor,
  },
  individualAmount: {
    marginVertical: 50,
    fontSize: 32,
    color: colors.red,
    fontWeight: '700',
  },
  editBtnTxt: {
    color: colors.brandColor,
  },
  individualDate: {
    color: colors.textColor,
    marginVertical: 10,
  },
  individualDesc: {
    color: colors.textColor,
    fontSize: 18,
  },
  customDatePicker: {
    marginVertical: 10,
    borderColor: '#d4d4d4',
    padding: 9,
    borderRadius: 8,
    borderWidth: 1,
  },
});
