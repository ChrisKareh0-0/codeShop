import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

  return timestemp2;
};

const Sent = ({item}) => {
  const date = dateFormat(item.date);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FFFF', '#FFFF']} style={styles.gradient}>
        <Text style={styles.text}>{item.message}</Text>
      </LinearGradient>
      <Text style={styles.duration}>{date}</Text>
    </View>
  );
};
export default Sent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    bottom: 10,
    alignSelf: 'flex-end',
  },
  duration: {
    color: '#008dfe',
    fontSize: 10,
    marginTop: 5,
    fontFamily: 'Montserrat_600SemiBold',
    alignSelf: 'flex-end',
  },
  gradient: {
    maxWidth: 220,
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
