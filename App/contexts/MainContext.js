import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [summaryValue, setSummaryValue] = useState({
    income: 1000,
    balance: 1000,
    expense: 0,
  });

  const [detailedTrackList, updateDetailedTrackList] = useState([]);

  let uniqueIds = [];

  const calculateSummaryValues = () => {
    let tempIncome = 0,
      tempExpense = 0;
    detailedTrackList.map(perDayList => {
      perDayList.details.map(individualExp => {
        uniqueIds.push(individualExp.id);
        individualExp.type === 'income'
          ? (tempIncome = tempIncome + Number(individualExp.amount))
          : (tempExpense = tempExpense + Number(individualExp.amount));
      });
    });
    setSummaryValue({
      income: tempIncome,
      expense: tempExpense,
      balance: tempIncome - tempExpense,
    });
  };

  const deleteIndividualExpenses = id => {
    let tempDetailedList = [...detailedTrackList];
    let updatedList = tempDetailedList
      .map(perDayList => {
        let tempDetails = perDayList.details.filter(individualExp => individualExp.id != id);
        if (tempDetails.length != 0) {
          return { date: perDayList.date, details: [...tempDetails] };
        }
        return null;
      })
      .filter(items => items != null);
    updateExpenseItems(updatedList);
    save(updatedList);
  };

  const generateUniqueId = () => {
    let newUniqueId = Math.random() * 2.14;
    if (uniqueIds.includes(newUniqueId)) {
      generateUniqueId();
    } else {
      uniqueIds.push(newUniqueId);
      return newUniqueId;
    }
  };

  const addNewExpense = newExpenseObj => {
    const newUniqueId = generateUniqueId();
    newExpenseObj.details[0].id = newUniqueId;
    let tempDetailedList = [...detailedTrackList];
    let filteredByDateItem = tempDetailedList.filter(item => item.date === newExpenseObj.date);
    if (filteredByDateItem.length > 0) {
      let updatedList = tempDetailedList.map(item => {
        if (item.date === newExpenseObj.date) {
          item.details.push(newExpenseObj.details[0]);
          return item;
        } else {
          return item;
        }
      });
      updateExpenseItems(updatedList);
      save(updatedList);
    } else {
      tempDetailedList.push(newExpenseObj);
      updateExpenseItems(tempDetailedList);
      save(tempDetailedList);
    }
  };

  const editExpense = (id, updatedObj) => {
    let tempDetailedList = [...detailedTrackList];
    let dateChanged = false;
    let updatedList = tempDetailedList.map(perDayList => {
      let updatedDetailsList = perDayList.details
        .map(individualExp => {
          if (Number(individualExp.id) == Number(id)) {
            if (perDayList.date == updatedObj.date) {
              individualExp = { ...updatedObj.details[0] };
              individualExp.id = id;
              return individualExp;
            } else {
              dateChanged = true;
              return null;
            }
          } else {
            return individualExp;
          }
        })
        .filter(item => item != null);
      return { date: perDayList.date, details: updatedDetailsList };
    });

    if (dateChanged == true) {
      let dateArray = tempDetailedList.map(item => {
        return item.date;
      });
      let changedToNewDate = !dateArray.includes(updatedObj.date);
      updatedObj.details[0].id = generateUniqueId();
      if (changedToNewDate) {
        updatedList.push(updatedObj);
      } else {
        updatedList = updatedList.map(perDayList => {
          if (perDayList.date == updatedObj.date) {
            perDayList.details.push(updatedObj.details[0]);
            return perDayList;
          } else {
            return perDayList;
          }
        });
      }
    }
    updateExpenseItems(updatedList);
    save(updatedList);
  };

  const save = async value => {
    try {
      const dataObj = JSON.stringify(value || detailedTrackList);
      await AsyncStorage.setItem('detailedTrackList', dataObj);
    } catch (error) {
      alert(error);
    }
  };

  const load = async () => {
    try {
      let item = await AsyncStorage.getItem('detailedTrackList');
      if (item !== null) {
        item = JSON.parse(item);
        updateExpenseItems(item);
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateExpenseItems = items => {
    items.sort((item1, item2) => {
      return new Date(item2.date).valueOf() - new Date(item1.date).valueOf();
    });
    updateDetailedTrackList(items);
  };


  const contextValue = {
    summaryValue,
    setSummaryValue,
    detailedTrackList,
    calculateSummaryValues,
    deleteIndividualExpenses,
    addNewExpense,
    uniqueIds,
    editExpense,
    load,
  };

  return <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>;
};
