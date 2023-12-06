import Barcode from '@kichiyaki/react-native-barcode-generator';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {colors} from '../Library/colors';
import {fontFamilyBold} from '../Library/Styles';

const ProductFoundModal = ({
  modalVisible,
  setModalVisible,
  barcode,
  callback,
}) => {
  const Apikey = useSelector(state => state.Apikey);
  const userType = useSelector(state => state.userType);
  const productModalVisible = useSelector(state => state.productModalVisible);

  return (
    <Modal style={{margin: 0}} isVisible={modalVisible}>
      <View style={styles.mainContainer}>
        <View style={[styles.productContainer]}>
          <Barcode
            format="EAN13"
            value={barcode}
            text={barcode}
            textStyle={{marginTop: 5, marginBottom: 15}}
            maxWidth={200}
          />
          <View style={styles.productNotFound}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              Product Not Found
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              if (callback) {
                callback();
              }
            }}
            style={[styles.productButton]}>
            <Text
              style={{
                fontSize: 15,
                color: colors.white,
                fontFamily: fontFamilyBold,
              }}>
              Go Back
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
    paddingTop: '7%',
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
    width: '40%',
    padding: '4%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: colors.primary_color,
  },
});
export default ProductFoundModal;
