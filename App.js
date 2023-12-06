import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/Navigation/Navigator';
import {Provider} from 'react-redux';
import {Store} from './src/Redux/Store';
import FlashMessage from 'react-native-flash-message';
import BarcodeReaderScreen from './src/Components/BarcodeReaderScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export default function App(props) {
  // const barcode = useSelector(state => state.barcodeData);
  // ('BARCODE DATA AFTER REDUX');
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={Store}>
          <NavigationContainer>
            <FlashMessage position="top" />
            <Navigator />
            <Toast />
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
      {/* <BarcodeReaderScreen /> */}
    </>
  );
}
