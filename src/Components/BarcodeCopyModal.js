import Barcode from '@kichiyaki/react-native-barcode-generator';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../Library/colors';
import {SizeFont} from '../Library/Styles';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const BarcodeCopyModal = ({
  modalVisible,
  setmodalVisibile,
  barcode,
  copyToClipboard,
}) => {
  return (
    <Modal
      transparent={true}
      style={{margin: 0, backgroundColor: 'rgba(0, 0, 0, 0)'}}
      hasBackdrop={false}
      isVisible={modalVisible}>
      <TouchableWithoutFeedback
        style={{zIndex: 999}}
        onPress={() => {
          setmodalVisibile(false);
        }}>
        <View style={styles.mainContainer}>
          <View style={styles.insideModalContainer}>
            <View style={styles.ModalHeader}>
              <Text
                style={{
                  fontSize: SizeFont.font17,
                  color: colors.black,
                  fontWeight: 'bold',
                }}>
                Barcode Number
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setmodalVisibile(false);
                  ('HELLO FROM THE OTHER SIDE');
                }}
                style={{
                  width: 25,
                  height: 25,
                  position: 'absolute',
                  left: 1,
                  bottom: 1,
                  backgroundColor: 'black',
                  borderRadius: 444 / 2,
                }}>
                {/* <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                }}
                source={close}
              /> */}
                <Text style={{color: 'white', alignSelf: 'center', top: 4}}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <Barcode
              format="EAN13"
              value={barcode}
              text={barcode}
              textStyle={{marginTop: 5}}
              maxWidth={200}
            />
            <View style={styles.inputContainer}>
              <View style={{width: '80%', height: 40}}>
                <TextInput
                  style={styles.inputText}
                  editable={false}
                  value={barcode}
                />
              </View>
              <TouchableHighlight
                style={styles.copyContainer}
                underlayColor={'white'}
                onPress={() => {
                  copyToClipboard();
                  Toast.show({
                    type: 'success',
                    text1: 'Barcode Copied',
                  });
                }}>
                <Text
                  style={{
                    color: colors.primary_color,
                    fontSize: SizeFont.font15,
                  }}>
                  Copy
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    zIndex: 1000,
  },
  insideModalContainer: {
    padding: '4%',
    borderRadius: 10,
    backgroundColor: colors.white,
    width: '80%',
    borderWidth: 1,
  },
  ModalHeader: {
    width: '100%',
    // height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.light_grey,
    padding: '2%',
    display: 'flex',
    flexDirection: 'row',
  },
  copyContainer: {
    width: 50,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '4%',
    fontSize: SizeFont.font17,
  },
});
export default BarcodeCopyModal;
