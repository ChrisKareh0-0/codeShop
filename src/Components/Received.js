import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const dateFormat = time => {
  if (!time) {
    return null;
  }
  var timestemp = new Date(time * 1000).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });
  var timestemp2 = new Date(time * 1000).toLocaleDateString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return timestemp, timestemp2;
};

const Received = ({item}) => {
  const date = dateFormat(item.date);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 141, 254, 0.3)', 'rgba(0, 141, 254, 0.3)']}
        style={styles.gradient}>
        <Text style={styles.text}>{item.response}</Text>
      </LinearGradient>
      <Text style={styles.duration}>{date}</Text>
    </View>
  );
};
export default Received;
const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    marginTop: '8%',
    bottom: 40,
    width: 250,
  },
  duration: {
    width: 200,
    flexDirection: 'row',
    color: '#008dfe',
    fontSize: 10,
    marginTop: 5,
    fontFamily: 'Montserrat_600SemiBold',
    alignSelf: 'flex-end',
    marginRight: 40,
  },
  gradient: {
    maxWidth: 240,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  text: {
    color: '#000',
    fontFamily: 'Montserrat_700Bold',
  },
});
