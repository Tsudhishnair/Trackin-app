import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

import colors from '../../../config/colors';

export default function ViewIndividualExpenseLayout({ id, detailedTrackList, handleEdit, handleDelete }) {
  return (
    <>
      {detailedTrackList.length > 0 &&
        detailedTrackList.map((individualExpenseDetails, index) => {
          return (
            <View key={index}>
              {individualExpenseDetails.details
                .filter(item => item.id === id)
                .map(filteredList => (
                  <View key={filteredList.id} style={styles.detailedExpenseWrapper}>
                    <Text style={[styles.labelHeader]}>{filteredList.type}</Text>
                    <Text style={[styles.individualAmount, filteredList.type === 'income' ? { color: colors.green } : { color: colors.red }]}>
                      {`$${filteredList.amount}`}
                    </Text>
                    <Text style={styles.individualDesc}>{filteredList.desc}</Text>
                    <Text style={styles.individualDate}>{individualExpenseDetails.date || '-'}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        handleEdit(id);
                      }}
                      style={{ marginTop: 15 }}>
                      <Text style={styles.editBtnTxt}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleDelete(id);
                      }}
                      style={{ marginVertical: 10 }}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          );
        })}
    </>
  );
}

const styles = StyleSheet.create({
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
    textTransform: 'capitalize',
  },
  individualDate: {
    color: colors.textColor,
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  individualDesc: {
    color: colors.textColor,
    fontSize: 18,
  },
  editBtnTxt: {
    color: colors.brandColor,
  },
});
