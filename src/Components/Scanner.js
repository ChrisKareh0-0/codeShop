import React, {useState, useEffect, useMemo} from 'react';
import {fetchProductInfo, getStoryHistory} from '../API/API';
import {useSelector} from 'react-redux';
import BarcodeInput from './barcodeInput';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {
  arrowright,
  camera,
  camerasettings,
  clock,
  flash,
  settings,
  switch2,
  gallery,
  input,
} from '../Library/icons';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import {request, PERMISSIONS} from 'react-native-permissions';
import {colors} from '../Library/colors';
import Modal from 'react-native-modal';
import ProductFoundModal from '../../src/Components/ProductFoundModal';
import StoryModal from './StoryModal';

import {
  SizeFont,
  fontFamilyBold,
  fontFamilyRegular,
  screen_height,
  screen_width,
} from '../Library/Styles';
import {Store} from '../Redux/Store';
import {setClosed, setLoading, settextinput} from '../Redux/Slice';
import {SetshowScanner} from '../Redux/Slice';
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import Toast from 'react-native-toast-message';

const Scanner = ({navigation}) => {
  // const [textinput, settextinput] = useState(false);
  const [productError, setProductError] = useState(false);
  const textinput = useSelector(state => state.Barcode.textinput);
  const [hasPermission, setHasPermission] = useState(null);
  const [permissionModal, setpermissionModal] = useState(false);
  const [torchon, settorchon] = useState(false);
  const showScanner = useSelector(state => state.Barcode.showScanner);
  const [camerType, setcamerType] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [barcodeNumb, setbarcodeNumb] = useState('');
  const [isModalVisible, setisModalVisible] = useState(false);
  const close = useSelector(state => state.Barcode.close);
  const loadingg = useSelector(state => state.Barcode.loading);

  const launchNativeImageLibrary = async () => {
    Store.dispatch(SetshowScanner(false));
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, async response => {
      'Response = ', response;

      if (response.didCancel) {
        console.log('User cancelled image picker');
        Store.dispatch(SetshowScanner(true));
      } else if (response.errorCode) {
        Store.dispatch(SetshowScanner(true));
      } else {
        Store.dispatch(setLoading(true));
        'response', JSON.stringify(response.assets[0].uri);
        let data = response.assets[0].uri;
        'DATA LET', typeof data;
        detectBarcode(response.assets[0].uri);
      }
    });
  };

  const detectBarcode = async response => {
    RNQRGenerator.detect({
      uri: response,
    })
      .then(async response => {
        Store.dispatch(setLoading(false));
        response.type, 'TYPE OF CODE';
        if (response.values.length == 0) {
          setProductError(true);
        } else {
          if (response.type == 'QRCode') {
            Toast.show({
              type: 'success',
              text1: 'URL Found opnening ...',
            });
            setTimeout(() => {
              Linking.openURL(response.values[0]);
            }, 1000);
          } else {
            handleImageDetected(response.values[0]);

            // Store.dispatch(setClosed(true));
          }
        }
      })
      .catch(error => {
        console.log('Error in detect code');
      });
  };

  const toggleModal = () => {
    Store.dispatch(setClosed(!close));
  };

  useEffect(() => {
    Store.dispatch(setClosed(false));
    Store.dispatch(SetshowScanner(true));
    navigation.addListener('focus', route => {
      Store.dispatch(SetshowScanner(true));
    });
    navigation.addListener('blur', route => {
      Store.dispatch(SetshowScanner(false));
    });
  }, []);

  const hideTextModal = () => {
    Store.dispatch(settextinput(false));
    Store.dispatch(SetshowScanner(true));
  };

  const showTextModal = () => {
    Store.dispatch(settextinput(true));
  };

  //Request Permissions
  useEffect(() => {
    'IN SCANNER', close;
    setmodalVisible(false);
    if (Platform.OS == 'ios') {
      request(PERMISSIONS.IOS.CAMERA).then(res => {
        if (res == 'granted') {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      });
    } else {
      request(PERMISSIONS.ANDROID.CAMERA).then(res => {
        if (res == 'granted') {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      });
    }
  }, [PERMISSIONS.IOS.CAMERA, PERMISSIONS.ANDROID.CAMERA]);

  const handleBarCodeScanned = async data => {
    Store.dispatch(SetshowScanner(false));
    await getProductItem(data);
  };

  const getProductItem = async data => {
    Store.dispatch(SetshowScanner(false));
    setbarcodeNumb(data);

    Store.dispatch(setLoading(true));
    const productInfo = await fetchProductInfo(data);

    Store.dispatch(setLoading(false));

    if (!productInfo) {
      setProductError(true);
      return;
    }

    navigation.navigate('Discussion', {
      barkodo: data,
      product: productInfo,
    });
  };

  const handleInputPressed = async data => {
    hideTextModal();
    await getProductItem(data);
  };

  const handleImageDetected = async data => {
    await getProductItem(data);
  };

  //-------------------------Barcode View----------------------------

  //No Permission
  if (hasPermission == false) {
    return (
      <View style={styles.permissionDeniedContainer}>
        <TouchableOpacity
          onPress={() => {
            setpermissionModal(true);
          }}
          style={styles.allowContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.imageContainer}>
              <Image source={camera} style={styles.camerImage} />
            </View>
            <View style={{display: 'flex', marginLeft: 10}}>
              <View>
                <Text
                  style={{
                    fontSize: SizeFont.font17,
                    color: colors.black,
                    fontFamily: fontFamilyBold,
                  }}>
                  Camera
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontSize: SizeFont.font17,
                    color: colors.grey,
                    fontFamily: fontFamilyBold,
                  }}>
                  Tap to allow
                </Text>
              </View>
            </View>
          </View>

          <View style={{width: 15, height: 15}}>
            <Image source={arrowright} style={styles.arrowImage} />
          </View>
        </TouchableOpacity>
        <View style={styles.accessTextContainer}>
          <View>
            <Text
              style={{
                fontFamily: fontFamilyBold,
                fontSize: SizeFont.font28,
                color: colors.black,
              }}>
              Enable Camera Access
            </Text>
          </View>
          <View style={{marginTop: 20, width: '80%'}}>
            <Text
              style={{
                fontFamily: fontFamilyBold,
                fontSize: SizeFont.font20,
                color: colors.textcolor,
                textAlign: 'center',
              }}>
              Scan a barcode to learn more about the product or to buy it
            </Text>
          </View>
        </View>
        <Modal
          style={{margin: 0}}
          isVisible={permissionModal}
          animationIn="fadeIn"
          animationOut="fadeOut">
          <View
            style={[
              styles.permissionDeniedContainer,
              {paddingHorizontal: '2.5%'},
            ]}>
            <View style={styles.informationModal}>
              <View style={styles.infoHeader}>
                <View style={styles.firstTitleContainer}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: SizeFont.font20,
                      fontFamily: fontFamilyBold,
                    }}>
                    Enable camera access
                  </Text>
                </View>
                <View style={styles.secondTitleContainer}>
                  <Text
                    style={{
                      color: colors.textcolor,
                      fontSize: SizeFont.font15,
                      fontFamily: fontFamilyBold,
                      textAlign: 'center',
                    }}>
                    BuyCode needs permission to access your camera
                  </Text>
                </View>
                <View style={styles.cameraImageContainer}>
                  <View style={{width: 35, height: 35}}>
                    <Image source={camerasettings} style={styles.imageCamera} />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontFamily: fontFamilyBold,
                        fontSize: SizeFont.font13,
                        color: colors.black,
                      }}>
                      1. Look for camera label
                    </Text>
                  </View>
                </View>
                <View style={styles.secondRowContainer}>
                  <View style={{width: 35, height: 35}}>
                    <Image source={switch2} style={styles.imageCamera} />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontFamily: fontFamilyBold,
                        fontSize: SizeFont.font13,
                        color: colors.black,
                      }}>
                      2. Enable toggle
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (Platform.OS == 'ios') {
                      Linking.openURL('app-settings:');
                    } else {
                      Linking.openSettings();
                    }
                  }}
                  style={styles.openSettingsContainer}>
                  <Text
                    style={{
                      color: colors.primary_color,
                      fontFamily: fontFamilyBold,
                      fontSize: SizeFont.font20,
                    }}>
                    Open Settings
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.lastRowContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setpermissionModal(false);
                  }}
                  style={styles.cancelContainer}>
                  <Text
                    style={{
                      color: colors.primary_color,
                      fontFamily: fontFamilyRegular,
                      fontSize: SizeFont.font17,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  return (
    <>
      <Modal
        onBackdropPress={hideTextModal}
        onBackButtonPress={hideTextModal}
        isVisible={textinput}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        transparent={true}
        style={{
          width: '100%',
          height: '20%',
          margin: 0,
          justifyContent: 'flex-end',
        }}
        swipeDirection="down"
        onSwipeComplete={hideTextModal}>
        <BarcodeInput
          callback={barcode => {
            handleInputPressed(barcode);
          }}
        />
      </Modal>

      <Modal
        onBackdropPress={() => setisModalVisible(false)}
        onBackButtonPress={() => setisModalVisible(false)}
        isVisible={close}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        // animationIn="bounceInUp"
        // animationOut="bounceOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        <StoryModal />
      </Modal>

      <ProductFoundModal
        barcode={barcodeNumb}
        modalVisible={productError}
        setModalVisible={setProductError}
        callback={() => {
          Store.dispatch(SetshowScanner(true));
        }}
      />

      <View
        style={
          screen_height < 800
            ? {
                backgroundColor: 'white',
                borderRadius: 20,
                width: '100%',
                height: 80,
                position: 'absolute',
                bottom: 0,
                zIndex: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',

                padding: '2%',
              }
            : [styles.optionsContainer]
        }>
        <View style={{position: 'absolute', bottom: 550, width: '100%'}}>
          <Text
            style={{
              alignSelf: 'center',
              color: colors.white,
              fontSize: 16,
              left: 4,
            }}>
            Align QR/Barcode within the frame
          </Text>
        </View>
        <TouchableOpacity
          style={styles.optionsButtons}
          onPress={() => {
            getStoryHistory();
            navigation.navigate('ScanHistory');
            Store.dispatch(SetshowScanner(false));
          }}>
          <Image
            source={clock}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              tintColor: colors.black,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{position: 'absolute', left: '27%', top: '23%'}}
          onPress={async () => {
            await launchNativeImageLibrary();
          }}>
          <Image
            source={gallery}
            style={
              screen_height < 800
                ? {
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    tintColor: colors.black,
                    top: 6,
                  }
                : [styles.clockImage]
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionsButtons, {width: '20%'}]}
          onPress={() => {
            settorchon(!torchon);
          }}>
          <View
            style={[
              styles.flashContainer,
              {
                borderColor: torchon ? colors.yellow : colors.black,
                backgroundColor: torchon ? colors.black : colors.white,
              },
            ]}>
            <Image
              source={flash}
              style={[
                styles.flashImage,
                {
                  tintColor: torchon ? colors.yellow : colors.black,
                },
              ]}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            position: 'absolute',
            left: '67%',
            top: '25%',
          }}
          onPress={() => {
            showTextModal();

            // pressHandler();
          }}>
          <Image
            source={input}
            style={
              screen_height < 800
                ? {
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    tintColor: colors.black,
                    top: 5,
                  }
                : {
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    tintColor: colors.black,
                  }
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionsButtons}
          onPress={() => {
            navigation.navigate('Settings');
            Store.dispatch(SetshowScanner(false));
          }}>
          <Image source={settings} style={styles.settingsImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.maincontainer}>
        <View
          style={{
            // width: "100%",
            height: '80%',
            display: 'flex',
            // alignItems: "center",
            position: 'absolute',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            zIndex: 1000,
          }}>
          {loadingg && (
            <View
              style={{
                backgroundColor: 'white',
                width: 60,
                height: 60,
                borderRadius: 9,
              }}>
              <ActivityIndicator
                animating={loadingg}
                style={{
                  alignSelf: 'center',
                  top: '35%',

                  // position: "absolute",
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.camerContainer}>
          {showScanner ? (
            <RNCamera
              type={
                camerType
                  ? RNCamera.Constants.Type.front
                  : RNCamera.Constants.Type.back
              }
              flashMode={
                torchon
                  ? RNCamera.Constants.FlashMode.torch
                  : RNCamera.Constants.FlashMode.off
              }
              style={{width: screen_width, height: screen_height}}
              captureAudio={false}
              onBarCodeRead={item => {
                'SCANNED DATA', item.type;
                if (item.type == 'org.iso.QRCode') {
                  ('WEHHEW I READ QR CODE');
                  Linking.openURL(item.data);
                  Store.dispatch(SetshowScanner(false));
                  setTimeout(() => {
                    Store.dispatch(SetshowScanner(true));
                  }, 3000);
                } else {
                  handleBarCodeScanned(item.data);
                  // ProductInfo(item.data);
                }

                // SetshowScanner(!showScanner);
              }}>
              <BarcodeMask
                showAnimatedLine={true}
                outerMaskOpacity={0}
                edgeHeight={80}
                edgeWidth={80}
                edgeBorderWidth={5}
                edgeRadius={0}
              />
            </RNCamera>
          ) : (
            <></>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  maincontainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    width: 200,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.primary_color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    padding: '2%',
  },
  optionsButtons: {
    marginRight: 10,
    height: 50,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22.5%',
  },
  flashContainer: {
    borderWidth: 1,
    // borderColor: "yellow",
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionDeniedContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  allowContainer: {
    padding: '6%',
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',
    backgroundColor: colors.white,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    shadowOffset: {width: -2, height: 4},
    width: '90%',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary_color,
  },
  camerImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  arrowImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    tintColor: colors.grey,
  },
  accessTextContainer: {
    marginTop: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationModal: {
    padding: '2%',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingTop: '4%',
    paddingBottom: '1%',
  },
  infoHeader: {
    padding: '4%',
    borderBottomColor: colors.light_grey,
    borderBottomWidth: 1,
    display: 'flex',
    paddingHorizontal: '8%',
    alignItems: 'center',
  },
  firstTitleContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  secondTitleContainer: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
  },
  cameraImageContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  imageCamera: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  secondRowContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  bottomContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.light_grey,
    borderBottomWidth: 1,
  },
  openSettingsContainer: {
    width: '100%',
    paddingVertical: '4%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastRowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelContainer: {
    width: '100%',
    paddingVertical: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  settingsImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  flashImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  clockImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  containerModal: {
    flex: 1,
    backgroundColor: '#000',
    height: '80%',
    top: '5%',
  },
  backgroundContainer: {
    position: 'absolute',

    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  boxcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },

  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    // backgroundColor: colors.black,
  },
  storyButton: {
    // height: "5%",
    width: '90%',
    alignSelf: 'center',
    // marginBottom: "10%",
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  storyButtonText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingVertical: 15,
  },
});

export default Scanner;
