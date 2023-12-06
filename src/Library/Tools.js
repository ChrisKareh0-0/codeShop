import Toast from 'react-native-simple-toast';
const toast = msg => {
  Toast.show(msg, Toast.SHORT, Toast.TOP['UIAlertController']);
  return;
};

export {toast};
