import React, { createContext, useState } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  // Summary of income, expense & balance
  const [summaryValue, setSummaryValue] = useState({
    income: 1000,
    balance: 1000,
    expense: 0,
  });
  let uniqueIds = [];
  // This Fn will recalculate the values when ever some changes occur in the income & expense
  const calcuteSumaryValues = () => {
    let tempIncome = 0,
      tempExpense = 0;
    detailedTrackList.map((perdayList) => {
      perdayList.details.map((individualExp) => {
        uniqueIds.push(individualExp.id);
        individualExp.type == "income"
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
  const deleteIndividualExpenses = (id) => {
    let tempDetailedList = [...detailedTrackList];
    let updatedList = tempDetailedList
      .map((perdayList) => {
        let tempDetails = perdayList.details.filter(
          (individualExp) => individualExp.id != id
        );
        if (tempDetails.length != 0) {
          return { date: perdayList.date, details: [...tempDetails] };
        }
        return null;
      })
      .filter((items) => items != null);
    updatetDetailedTrackList(updatedList);
    save(updatedList);
  };

  const generateUniqueId = () => {
    let newUniqueid = Math.random() * 2.14;
    if (uniqueIds.includes(newUniqueid)) {
      generateUniqueId();
    } else {
      uniqueIds.push(newUniqueid);
      return newUniqueid;
    }
  };

  //Add new income/expense to the list
  const addNewExpense = (newExpenseObj) => {
    let newUniqueid = generateUniqueId();
    newExpenseObj.details[0].id = newUniqueid;
    let tempDetailedList = [...detailedTrackList];
    let filteredByDateItem = tempDetailedList.filter(
      (item) => item.date == newExpenseObj.date
    );
    if (filteredByDateItem.length > 0) {
      let updatedList = tempDetailedList.map((item) => {
        if (item.date == newExpenseObj.date) {
          item.details.push(newExpenseObj.details[0]);
          return item;
        } else {
          return item;
        }
      });
      updatetDetailedTrackList(updatedList);
      save(updatedList);
    } else {
      tempDetailedList.push(newExpenseObj);
      updatetDetailedTrackList(tempDetailedList);
      save(tempDetailedList);
    }
  };

  // Edit existing income/expense
  const editExpense = (id, updatedObj) => {
    let tempDetailedList = [...detailedTrackList];
    let dateChanged = false;
    let updatedList = tempDetailedList.map((perdayList) => {
      if (perdayList.date == updatedObj.date) {
        let updatedDetailsList = perdayList.details.map((item) => {
          if (Number(item.id) == Number(id)) {
            item = { ...updatedObj.details[0] };
            item.id = id;
            return item;
          } else {
            return item;
          }
        });
        return { date: updatedObj.date, details: updatedDetailsList };
      } else {
        let updatedDetailsList = perdayList.details
          .map((item) => {
            if (Number(item.id) != Number(id)) {
              return item;
            } else {
              dateChanged = true;
              return null;
            }
          })
          .filter((items) => items != null);
        return { date: perdayList.date, details: updatedDetailsList };
      }
    });
    if (dateChanged == true) {
      updatedObj.details[0].id = generateUniqueId();
      updatedList.push(updatedObj);
    }
    updatetDetailedTrackList(updatedList);
    save(updatedList);
  };

  const save = async (value) => {
    try {
      const dataObj = JSON.stringify(value || detailedTrackList);
      await AsyncStorage.setItem("detailedTrackList", dataObj);
    } catch (error) {
      alert(error);
    }
  };

  const load = async () => {
    try {
      let item = await AsyncStorage.getItem("detailedTrackList");
      if (item != null) {
        item = JSON.parse(item);
        updatetDetailedTrackList(item);
      }
    } catch (error) {
      alert(error);
    }
  };

  // For showing and setting detailed income/expense list
  const [detailedTrackList, updatetDetailedTrackList] = useState([]);

  // Values the consumers can access
  const contextValue = {
    summaryValue,
    setSummaryValue,
    detailedTrackList,
    updatetDetailedTrackList,
    calcuteSumaryValues,
    deleteIndividualExpenses,
    addNewExpense,
    uniqueIds,
    editExpense,
    load,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
