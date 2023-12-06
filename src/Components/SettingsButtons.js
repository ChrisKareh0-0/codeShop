import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {colors} from '../Library/colors';
import {arrowright, trash} from '../Library/icons';
import {SizeFont} from '../Library/Styles';

const SettingsButtons = ({
  Action,
  TextName,
  image,
  checkDisplay,
  borderbottom,
  arrowdisplay,
}) => {
  // (checkDisplay);
  return (
    <TouchableOpacity
      style={[
        styles.ButtonContainer,
        {
          display: checkDisplay,
          borderBottomWidth: borderbottom == false ? 0 : 1,
        },
      ]}
      onPress={() => {
        Action();
      }}>
      <View style={styles.nameContainer}>
        <Image source={image} style={styles.images} />
        <Text
          style={{
            fontSize: SizeFont.font15,
            color: colors.black,
            marginLeft: 5,
          }}>
          {TextName}
        </Text>
      </View>
      <View
        style={{
          display: arrowdisplay ? 'flex' : 'none',
          width: '10%',
          alignItems: 'flex-end',
        }}>
        <Image
          source={arrowright}
          style={[styles.images, {tintColor: colors.light_grey}]}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  ButtonContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: '4%',
    display: 'flex',
    // justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.light_grey,
  },
  nameContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  images: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
export default SettingsButtons;
