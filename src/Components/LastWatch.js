import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LastWatch = ({checkedOn}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{checkedOn}</Text>
    </View>
  );
};
export default LastWatch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    elevation: 3,
    paddingVertical: 2,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    color: '#008dfe',
    fontSize: 12,
    fontFamily: 'Montserrat_600SemiBold',
  },
});
