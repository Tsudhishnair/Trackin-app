import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [summaryValue, setSummaryValue] = useState({
    income: 1000,
    balance: 1000,
    expense: 0,
  });
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

  //Delete individual Expenses
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

  //Add new income/expense to the list
  const addNewExpense = newExpenseObj => {
    let newUniqueId = generateUniqueId();
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

  // Edit existing income/expense
  const editExpense = (id, updatedObj) => {
    let tempDetailedList = [...detailedTrackList];
    let dateChanged = false;
    let updatedList = tempDetailedList.map(perDayList => {
      if (perDayList.date == updatedObj.date) {
        let updatedDetailsList = perDayList.details.map(item => {
          if (Number(item.id) === Number(id)) {
            item = { ...updatedObj.details[0] };
            item.id = id;
            return item;
          } else {
            return item;
          }
        });
        return { date: updatedObj.date, details: updatedDetailsList };
      } else {
        let updatedDetailsList = perDayList.details
          .map(item => {
            if (Number(item.id) != Number(id)) {
              return item;
            } else {
              dateChanged = true;
              return null;
            }
          })
          .filter(items => items != null);
        return { date: perDayList.date, details: updatedDetailsList };
      }
    });
    if (dateChanged === true) {
      updatedObj.details[0].id = generateUniqueId();
      updatedList.push(updatedObj);
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
      if (item != null) {
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

  // For showing and setting detailed income/expense list
  const [detailedTrackList, updateDetailedTrackList] = useState([]);

  // Values the consumers can access
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
