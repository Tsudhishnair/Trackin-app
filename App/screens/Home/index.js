import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import FabButton from '../../components/FabButton';
import SwipeableBottomSheet from '../../components/SwipeableBottomSheet';
import colors from '../../config/colors';
import { MainContext } from '../../contexts/MainContext';
import ViewIndividualExpenseLayout from './Layout/IndividualExpenseDetails';
import AddEditExpenseLayout from './Layout/AddEditExpense';
import OverViewBlock from './Layout/OverViewBlock';
import ListExpenseLayout from './Layout/ListExpense';
import dayjs from 'dayjs';
import Toast from '../../components/toast';

export default function Home() {
  const [bottomSheetVisible, setBottomSheet] = useState(false);
  const [addOrViewLayout, setAddOrViewLayout] = useState('add');
  const [currentViewingExp, setCurrentViewingExp] = useState('');
  const [toast, setToast] = useState({ type: 'success', message: '', showToast: false });
  const [formValue, setFormValues] = useState({
    amount: '',
    type: 'income',
    desc: '',
    date: dayjs().format('MMMM D, YYYY'),
  });
  const { summaryValue, detailedTrackList, calculateSummaryValues, deleteIndividualExpenses, addNewExpense, editExpense, load } = useContext(
    MainContext
  );

  useEffect(() => {
    calculateSummaryValues();
  }, [detailedTrackList]);

  useEffect(() => {
    load();
  }, []);

  const handleEdit = id => {
    setAddOrViewLayout('add');
    detailedTrackList.map(individualExpenseDetails => {
      return individualExpenseDetails.details.map(item => {
        if (item.id === id) {
          setFormValues({
            type: item.type,
            amount: item.amount.toString(),
            desc: item.desc,
            date: individualExpenseDetails.date.toString(),
          });
        }
      });
    });
  };

  const handleDelete = id => {
    deleteIndividualExpenses(id);
    setBottomSheet(false);
  };

  const handleSaveNewExpense = () => {
    if (formValue.amount === '' || formValue.desc === '') {
      setToast({ type: 'warning', message: 'Some fields are not filled.', showToast: true });
      return;
    }
    setBottomSheet(false);
    let dataObj = {
      date: dayjs(formValue.date).format('MMMM D, YYYY'),
      details: [
        {
          type: formValue.type,
          amount: Number(formValue.amount),
          desc: formValue.desc,
        },
      ],
    };
    //This checks whether to call the add new Fn or edit function. currentViewingExp will only have the id if we click on individual expense item
    if (currentViewingExp != '') {
      editExpense(currentViewingExp, dataObj);
      setToast({ type: 'success', message: 'Entry updated successfully.', showToast: true });
    } else {
      addNewExpense(dataObj);
      setToast({ type: 'success', message: 'Entry added successfully.', showToast: true });
    }

    handleFormReset();
  };

  const handleFormReset = () => {
    setCurrentViewingExp('');
    setFormValues({
      type: 'income',
      amount: '',
      desc: '',
      date: dayjs(formValue.date).format('MMMM D, YYYY'),
    });
  };

  const onFabButtonClick = () => {
    setBottomSheet(true);
    setAddOrViewLayout('add');
  };

  return (
    <View style={styles.homeContainer}>
      <StatusBar barStyle="light-content" backgroundColor={colors.brandColor} />
      <OverViewBlock summaryValue={summaryValue} />
      <ListExpenseLayout
        detailedTrackList={detailedTrackList}
        setCurrentViewingExp={setCurrentViewingExp}
        setBottomSheet={setBottomSheet}
        setAddOrViewLayout={setAddOrViewLayout}
      />
      <View style={styles.fabButtonWrapper}>
        <FabButton
          actionFn={() => {
            onFabButtonClick();
          }}
        />
      </View>
      {bottomSheetVisible && (
        <SwipeableBottomSheet
          toHeight={90}
          setBottomSheet={setBottomSheet}
          onClose={() => {
            handleFormReset();
          }}>
          {addOrViewLayout === 'add' ? (
            <AddEditExpenseLayout setFormValues={setFormValues} formValue={formValue} handleSave={handleSaveNewExpense} />
          ) : (
            <ViewIndividualExpenseLayout
              id={currentViewingExp}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              detailedTrackList={detailedTrackList}
            />
          )}
        </SwipeableBottomSheet>
      )}
      {toast.showToast && <Toast toastObj={toast} handleToast={setToast} />}
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  fabButtonWrapper: {
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',
  },
});
