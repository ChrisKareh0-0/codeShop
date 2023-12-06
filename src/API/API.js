import axios from 'axios';
import {Alert} from 'react-native';
import {Store} from '../Redux/Store';
import {chatHistory, sendMessages, storyHistory} from './URL';
import {storyRead} from './URL';
import Toast from 'react-native-toast-message';

import {
  setHistoryProducts,
  setLoading,
  setchatData,
  setstoryLoader,
  setMessageLoader,
  setisChatLoading,
  setMessage,
} from '../Redux/Slice';

import {ProductInfoURL} from './URL';
import DeviceInfo, {getUniqueId} from 'react-native-device-info';

const chat = async product_id => {
  console.log('PRODUCT ID', product_id);
  Store.dispatch(setisChatLoading(true));
  Store.dispatch(setstoryLoader(true));
  const uuid = await DeviceInfo.getUniqueId();

  await axios
    .get(chatHistory(uuid, product_id))
    .then(async function (response) {
      Store.dispatch(setisChatLoading(false));
      if (response.data.data.error == true) {
        console.log('ERROR', response.data.data.error);
      } else {
        Store.dispatch(setchatData(response.data.data.data));
        Store.dispatch(setLoading(false));
        Store.dispatch(setstoryLoader(false));
        Store.dispatch(setMessage(''));
      }
    });
};

const sendMessage = async (message, product_id) => {
  console.log('Sending');
  Store.dispatch(setMessageLoader(true));
  const uuid = await DeviceInfo.getUniqueId();
  const postData = {
    message: message,
    product: product_id,
  };
  await axios
    .post(sendMessages(uuid), postData)
    .then(async function (response) {
      if (response.data.data.error == true) {
        console.log('ERROR', response.data.data);
      } else {
        console.log(response.data.data);
        await chat(product_id);
        Store.dispatch(setMessageLoader(false));

        return response.data.data.response;
      }
    });
};

const getStoryHistory = async () => {
  Store.dispatch(setstoryLoader(true));
  const uuid = await DeviceInfo.getUniqueId();
  console.log(uuid);

  await axios
    .get(storyHistory(uuid), {})
    .then(function (response) {
      Store.dispatch(setHistoryProducts(response.data.data));
      Store.dispatch(setstoryLoader(false));
    })
    .catch(function (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to retrieve data from server',
      });
    });
};

const readStory = async id => {
  getUniqueId()._z, 'UUID TESTO';
  const info = await get(storyRead(id, getUniqueId()._z)).then(resp => {
    getUniqueId()._z, 'UUID DEVICE INFO';
    'Story ID', id;
    if (resp.error) {
      //("RESP.ERROR", resp.error);
    } else {
      if (resp.message.data.error) {
        //("RESP.MESSAGE.DATA.ERROR", resp.message.data.error);
      } else {
      }
    }
  });
};

const get = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return {
      error: false,
      message: json,
    };
  } catch (e) {
    return {
      error: true,
      message: e,
    };
  }
};

const fetchProductInfo = async barcode => {
  const uuid = await DeviceInfo.getUniqueId();
  const resp = await axios.get(ProductInfoURL(barcode, uuid, 0));
  if (resp.error) {
    Alert.alert(
      `Check your internet connection`,
      '',
      [
        {
          text: 'Okay',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
    return null;
  }

  if (resp.data.data.error) {
    return null;
  }

  const res = resp.data.data.data;

  return res;
};

export {fetchProductInfo, sendMessage, chat, getStoryHistory, get, readStory};
