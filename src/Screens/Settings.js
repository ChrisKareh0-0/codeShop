import React, {useEffect} from 'react';
import {Image, TouchableHighlight} from 'react-native';
import {back} from '../Library/icons';

import {getStoryHistory} from '../API/API';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import {Divider} from '@rneui/themed';
import SettingsButtons from '../Components/SettingsButtons';
import {screen_width} from '../Library/Styles';
import {useNavigation} from '@react-navigation/native';

import {aboutus, privacy, chat, aboutUS, contactUS} from '../Library/icons';
import {Store} from '../Redux/Store';
import {SetshowScanner} from '../Redux/Slice';
import {screen_height} from '../Library/Styles';

const Settings = () => {
  const navigation = useNavigation();

  useEffect(() => {
    Store.dispatch(SetshowScanner(false));
  });
  return (
    <>
      <View
        style={
          screen_height > 800
            ? {
                height: '13%',
                width: '100%',
                backgroundColor: '#008DFE',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                zIndex: 800,
              }
            : {
                height: '13%',
                width: '100%',
                backgroundColor: '#008DFE',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                top: 0,
                zIndex: 800,
              }
        }>
        <Text
          style={
            screen_height > 800
              ? {
                  color: 'white',
                  fontSize: 19,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  left: '140%',
                  top: '5%',
                }
              : {
                  color: 'white',
                  fontSize: 17,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  left: '175%',
                  top: '2%',
                }
          }>
          Settings
        </Text>
        <TouchableHighlight
          underlayColor={'#008DFE'}
          style={
            screen_height > 800
              ? {
                  top: '3%',
                  borderRadius: 444 / 2,
                  width: 30,
                  height: 40,

                  right: '50%',
                }
              : {
                  top: '1%',
                  borderRadius: 444 / 2,
                  right: '50%',
                  width: 30,
                  height: 40,
                }
          }
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={back}
            style={{
              width: 30,
              height: 30,

              top: 10,
              tintColor: 'white',
              right: 10,
            }}
          />
        </TouchableHighlight>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.maincontainer}>
        <View style={{marginTop: '10%', width: '90%', alignSelf: 'center'}}>
          <SettingsButtons
            arrowdisplay={false}
            TextName="About BuyCode"
            Action={() => {
              //INSERT ACTION TO ABOUT
            }}
            image={aboutUS}
          />
          <SettingsButtons
            arrowdisplay={false}
            TextName="Contact Us"
            Action={() => {
              Linking.openURL('mailto:support@mywonderhaus.com');
            }}
            image={contactUS}
          />
          <SettingsButtons
            arrowdisplay={false}
            TextName="Privacy Policy"
            Action={() => {
              navigation.navigate('PrivacyPolicy');
            }}
            image={privacy}
          />
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    width: '100%',
    height: '100%',
    // padding: "4%",
  },
  ButtonContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: '4%',
    display: 'flex',
    justifyContent: 'center',
    borderBottomWidth: 1,
    // borderBottomColor: colors.light_grey,
  },
  ButtonsView: {
    marginLeft: '3.5%',
    height: '40%',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ButtonsViewGuest: {
    marginLeft: '3.5%',
    height: '70%',
    width: '100%',
    marginTop: 40,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  BigButtonConatainer: {
    backgroundColor: 'white',
    // marginTop: 20,
    marginBottom: 0,
    borderRadius: 7,
    shadowOpacity: 0.1,
    alignSelf: 'center',
    marginLeft: 5,
    marginBottom: 10,
    width: screen_width / 2 - 20,
    height: '80%',
  },
  profileView: {
    marginTop: '2%',
    padding: '4%',
    flexDirection: 'row',
    marginLeft: 10,
  },
});
export default Settings;
