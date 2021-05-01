import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../config/colors';

export default function EmptyState(props) {
  const { icon, header, description, btn } = props;

  return (
    <View style={styles.container}>
      <View>{icon}</View>
      <View style={styles.emptyMessageWrapper}>
        <Text style={styles.messageHeader}>{header}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {btn && (
        <View style={styles.actionBtnWrapper}>
          <TouchableOpacity
            onPress={() => {
              btn.onPressFn;
            }}>
            <View style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>{btn.btnText}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  emptyMessageWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  messageHeader: {
    fontWeight: '700',
    color: colors.textColor,
    fontSize: 20,
    marginVertical: 6,
  },
  description: {
    color: colors.textColor,
    textAlign: 'center',
  },
  actionBtnWrapper: {
    marginVertical: 50,
  },
  actionBtn: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.brandColor,
    borderRadius: 8,
  },
  actionBtnText: {
    color: colors.textColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
