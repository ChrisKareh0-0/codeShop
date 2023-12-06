import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {colors} from '../Library/colors';
import {fontFamilyBold} from '../Library/Styles';
import {Loading} from './Loading';

const Buttons = ({
  TextName,
  Action,
  LoadingDisplay,
  ButtonImage,
  OpacityActive,
  topMargin,
  CustomColor,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={OpacityActive == false ? 0.2 : 1}
      onPress={() => {
        Action();
      }}
      style={[
        styles.ButtonContainer,
        {
          backgroundColor:
            CustomColor == true
              ? colors.customcolor
              : OpacityActive == false
              ? '#d8d8d8'
              : colors.primary_color,
          marginTop: topMargin == undefined ? 16 : 5,
        },
      ]}>
      <Text
        style={[
          styles.ButtonText,
          {color: CustomColor == true ? colors.black : colors.white},
        ]}>
        {TextName}
      </Text>
      <View
        style={{
          marginLeft: 5,
          display:
            ButtonImage == undefined || CustomColor == true ? 'none' : 'flex',
        }}>
        <Image
          source={ButtonImage}
          style={{
            width: 20,
            resizeMode: 'contain',
            height: 20,
            tintColor: colors.white,
          }}
        />
      </View>
      <View style={{display: LoadingDisplay == false ? 'none' : 'flex'}}>
        <Loading activityColor={colors.white} size="small" />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  ButtonContainer: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary_color,
    marginTop: 16,
  },
  ButtonText: {
    fontSize: 15,
    // fontWeight: "900",
    fontFamily: fontFamilyBold,
  },
});
export default Buttons;
