import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {colors} from '../Library/colors';
import {fontFamilyBold} from '../Library/Styles';

const StoryFoundModal = ({modalVisible, closeCallback}) => {
  const Apikey = useSelector(state => state.Apikey);
  const userType = useSelector(state => state.userType);
  const barcode = useSelector(state => state.Barcode.barcode);

  return (
    <Modal style={{margin: 0, zIndex: 1000}} isVisible={modalVisible}>
      <View style={styles.mainContainer}>
        <View style={[styles.productContainer]}>
          <View style={styles.productNotFound}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              Story Not Found
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              closeCallback();
            }}
            style={[styles.productButton]}>
            <Text
              style={{
                fontSize: 17,
                color: colors.white,
                fontFamily: fontFamilyBold,
              }}>
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    padding: '4%',

    backgroundColor: colors.white,
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
  },
  productNotFound: {
    marginTop: 10,
  },
  productButton: {
    width: '80%',
    padding: '4%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: colors.primary_color,
  },
});
export default StoryFoundModal;
