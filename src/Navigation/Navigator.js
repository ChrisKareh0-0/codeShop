import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {SizeFont} from '../Library/Styles';
import {shop} from '../Library/icons';
import {
  Alert,
  Image,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Home from '../Screens/Home';
import Settings from '../Screens/Settings';
import PrivacyPolicy from '../Screens/PrivacyPolicy';
import ScanHistory from '../Screens/ScanHistory';
import {colors} from '../Library/colors';
import {setEdit} from '../Redux/Slice';
import Discussion from '../Screens/Discussion';
import ProductInfoPage from '../Screens/ProductInfoPage';
import Scanner from '../Components/Scanner';

const Navigator = () => {
  const Stack = createNativeStackNavigator();
  const edit = useSelector(state => state.edit);
  return (
    <>
      <StatusBar barStyle={'dark-content'} animated={true} />
      <Stack.Navigator initialRouteName={'Scanner'}>
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Discussion"
          component={Discussion}
          options={{
            contentStyle: {
              backgroundColor: '#F2F2F2',
            },

            headerShown: false,
            headerRight: () => {
              <TouchableOpacity
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'black',
                }}>
                <Image source={shop} style={{width: 10, height: 10}}></Image>
              </TouchableOpacity>;
            },
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ' ',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#f2f2f2',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            headerTitle: 'Privacy Policy',
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ScanHistory"
          component={ScanHistory}
          options={{
            contentStyle: {
              backgroundColor: colors.white,
            },
            animation: 'slide_from_left',
            headerShown: false,

            headerBackTitleVisible: false,
            gestureEnabled: edit == true ? false : true,
            headerLeft: edit == true ? () => <></> : () => {},
            headerTitleAlign: 'center',
            headerTitle: 'Scan History',
          }}
        />
        <Stack.Screen
          name="ProductInfoPage"
          component={ProductInfoPage}
          options={{
            statusBarColor: 'white',
            headerTitle: 'Product Info',
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Navigator;
