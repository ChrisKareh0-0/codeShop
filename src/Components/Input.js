import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import {sendBox} from '../Library/icons';
import {useSelector} from 'react-redux';
// import Entypo from '@expo/vector-icons/Entypo';
// import Ionicons from '@expo/vector-icons/Ionicons';

const Input = ({inputMessage, onSendPress, setMessage, ref}) => {
  const messageLoader = useSelector(state => state.Barcode.messageLoader);
  return (
    <View style={styles.container}>
      {/* <Entypo name="emoji-happy" color="#fff" size={20} /> */}
      <TextInput
        multiline={true}
        numberOfLines={6}
        onFocus={ref}
        placeholder="Ask AI"
        value={inputMessage}
        onChangeText={setMessage}
        style={styles.input}
      />

      {messageLoader == true ? (
        <View
          style={{
            left: 60,
            width: 33,
            height: 33,
            bottom: 1,
            backgroundColor: '#008dfe',
            borderRadius: 444 / 2,
          }}>
          <ActivityIndicator
            style={{
              top: 6,
            }}
            color={'white'}
          />
        </View>
      ) : (
        <TouchableOpacity style={{left: 65}} onPress={onSendPress}>
          <Image
            source={sendBox}
            style={{width: 30, height: 30, tintColor: '#008dfe'}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',

    width: '90%',
    height: 45,

    paddingHorizontal: 20,
    borderRadius: 20,
  },
  input: {
    height: 30,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
    color: '#000',
    flex: 1,
  },
});
