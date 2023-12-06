import Barcode from '@kichiyaki/react-native-barcode-generator';
import {Image, StyleSheet, Animated, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {sendBox1} from '../Library/icons';
import {Store} from '../Redux/Store';
import {settextinput} from '../Redux/Slice';

const BarcodeInput = ({callback}) => {
  const [pressed, setpressed] = useState(false);
  const animation = new Animated.Value(200);
  const [inputCode, setinputCode] = useState('');

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 600,
      duration: 350,
    }).start();
    animation;
  };
  return (
    <Animated.View
      //   style={[pressed == false ? styles.texView : styles.texViewPressed]}
      style={{
        height: animation,
        backgroundColor: 'white',
        borderRadius: 10,
      }}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 800,
          position: 'absolute',
          bottom: 0,
        }}
        onPress={() => {
          Store.dispatch(settextinput(false));
        }}></TouchableOpacity>
      <View
        style={{
          backgroundColor: '#D9D9D9',
          top: 10,
          alignSelf: 'center',
          width: 50,
          height: 5,
          borderRadius: 20,
          position: 'absolute',
        }}></View>
      <TextInput
        mode="outlined"
        onChangeText={setinputCode}
        value={inputCode}
        style={{width: '90%', alignSelf: 'center', top: 60}}
        placeholder="Please enter a barcode"
        onPressIn={startAnimation}></TextInput>
      <Text style={{bottom: 20, left: 25, fontSize: 16, fontWeight: 'bold'}}>
        Input Barcode Number
      </Text>

      <TouchableOpacity
        style={{
          borderColor: 'grey',

          width: 50,
          height: 60,
          left: '81%',
          bottom: 48,
        }}
        onPress={() => {
          callback(inputCode);
        }}>
        <Image
          source={sendBox1}
          style={[
            pressed == false ? styles.sendImage : styles.sendImagePressed,
          ]}></Image>
      </TouchableOpacity>

      <Barcode
        format="EAN13"
        value={inputCode}
        textStyle={{marginTop: 5, marginBottom: 15}}
        maxWidth={150}
      />
      {inputCode.length == 13 && (
        <Text style={{alignSelf: 'center'}}>{inputCode}</Text>
      )}
      {inputCode.length == 12 && (
        <Text style={{alignSelf: 'center'}}>{inputCode}</Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  texView: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  texViewPressed: {
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  sendImage: {
    width: 25,
    height: 25,
    left: '30%',
    top: '85%',
  },
  sendImagePressed: {
    width: 25,
    height: 25,
    left: '30%',
    top: '90%',
  },
});

export default BarcodeInput;
