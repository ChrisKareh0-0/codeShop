import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Share,
  Image,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import CustomImageCarousal from '../Components/Carousel';
import {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {ScrollView} from 'react-native-gesture-handler';
import {
  back,
  placeholder,
  codeLogo,
  status,
  share,
  arrowup,
  arrowdown,
  linkURL,
} from '../Library/icons';
import {TouchableHighlight, TouchableOpacity} from '@gorhom/bottom-sheet';
import {Button} from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import BarcodeCopyModal from '../Components/BarcodeCopyModal';
import Modal from 'react-native-modal';
import StoryModal from '../Components/StoryModal';
import {SizeFont, screen_width} from '../Library/Styles';
import {colors} from '../Library/colors';
import {fontFamilyBold} from '../Library/Styles';
import ImageView from 'react-native-image-viewing';

const ProductInfoPage = ({navigation, route}) => {
  const copyToClipboard = () => {
    Clipboard.setString(route.params.barkod);
    // toast('Barcode Copied');
  };
  const [modalVisible, setmodalVisibile] = useState(false);
  const [displayDescription, setdisplayDescription] = useState(false);
  const [cModalVisible, setcModalVisible] = useState(false);
  const [images, setimages] = useState([]);
  const [imageViewerVisible, setimageViewerVisible] = useState(false);
  const mediaPictures = route.params.product.images;
  const ProductName = route.params.product.title;
  const description = route.params.product.description;
  const content = route.params.content;
  const Product = route.params.product;
  const buyURL = route.params.product.url;

  useEffect(() => {
    extractImageURL();
    console.log('LINK BUTTON', route.params.product.customButtonLabel);
    console.log('LINK', route.params.product.customButtonUrl);
  }, []);

  const toggleStoryModal = () => {
    setcModalVisible(!cModalVisible);
  };
  const imagetoggle = () => {
    setimageViewerVisible(!imageViewerVisible);
  };

  const extractImageURL = () => {
    if (mediaPictures) {
      let Images = [];
      for (var i = 0; i < mediaPictures.length; i++) {
        Images.push({uri: mediaPictures[i].image});
        console.log(i);
      }

      console.log('EXTRACTED IMAGES', Images);
      setimages(Images);
    }
  };

  const onShare = async url => {
    try {
      if (url == null || url == '') {
      } else {
        const result = await Share.share({
          message: isNaN(url) ? url : '',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
          } else {
          }
        } else if (result.action === Share.dismissedAction) {
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <View style={{backgroundColor: 'white', width: '100%'}}>
        {/* Story Screen PopUp Modal */}
        <Modal
          onBackdropPress={() => setcModalVisible(false)}
          onBackButtonPress={() => setcModalVisible(false)}
          isVisible={cModalVisible}
          onSwipeComplete={toggleStoryModal}
          swipeDirection="down"
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={500}
          style={styles.modal}>
          <StoryModal
            isVisible={cModalVisible}
            content={content}
            product={Product}
            closeCallback={() => {
              setcModalVisible(false);
            }}
          />
        </Modal>

        <BarcodeCopyModal
          modalVisible={modalVisible}
          setmodalVisibile={setmodalVisibile}
          barcode={route.params.barkod}
          copyToClipboard={copyToClipboard}
        />

        <ImageView
          doubleTapToZoomEnabled={true}
          images={images}
          imageIndex={0}
          visible={imageViewerVisible}
          onRequestClose={() => imagetoggle()}
        />

        <View
          style={{
            width: '100%',
            height: 43,
            position: 'absolute',

            zIndex: 100000,
            top: 50,
          }}>
          <TouchableOpacity
            underlayColor={'white'}
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{width: 30, height: 30, top: 5, tintColor: 'white'}}
              source={back}></Image>
          </TouchableOpacity>
          {content.length != 0 && (
            <TouchableOpacity
              underlayColor={'white'}
              style={
                screen_width < 400
                  ? styles.storyToggalSmallScreens
                  : styles.storyToggalBigScreens
              }
              onPress={() => {
                toggleStoryModal();
              }}>
              <Image
                style={{height: 25, width: 25, top: 6, tintColor: 'white'}}
                source={status}></Image>
            </TouchableOpacity>
          )}
          {buyURL && (
            <TouchableOpacity
              underlayColor={'white'}
              style={
                screen_width < 400
                  ? styles.buyNowButtonSmallScreens
                  : styles.buyNowButtonBigScreens
              }
              onPress={() => {
                onShare(buyURL);
              }}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  top: 10,

                  tintColor: 'white',
                }}
                source={share}></Image>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView style={{height: '100%', width: '100%'}}>
          <LinearGradient
            colors={['rgba(0,0,0,1)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 200,
              zIndex: 1000,
            }}
          />
          <View style={styles.carouselContainer}>
            {mediaPictures.length == 0 ? (
              <Image
                style={{width: '100%', height: 450}}
                source={placeholder}></Image>
            ) : (
              <CustomImageCarousal
                data={mediaPictures}
                autoPlay={true}
                pagination={true}
                press={() => {
                  console.log('I got pressed');
                  imagetoggle();
                }}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: undefined,

              width: '75%',
              top: 0,
            }}>
            <Text
              style={{
                width: undefined,

                marginHorizontal: '10%',
                right: '5%',
                fontSize: 19,
                fontWeight: 'bold',
              }}>
              {ProductName}
            </Text>
            <TouchableOpacity
              underlayColor={'white'}
              style={styles.copyBarcodeButton}
              onPress={() => {
                setmodalVisibile(true);
              }}>
              <Image style={{height: 25, width: 25}} source={codeLogo}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              underlayColor={'white'}
              style={[styles.copyBarcodeButton, {left: '93%'}]}
              onPress={() => {
                Linking.openURL(route.params.product.url);
              }}>
              <Image style={{height: 25, width: 25}} source={linkURL}></Image>
            </TouchableOpacity>
          </View>
          {/* <View style={{flexDirection: 'row', left: 30}}>
            {buyURL != null && (
              <Image style={{width: 20, height: 20}} source={earth}></Image>
            )}

            <Text style={{marginHorizontal: '3%', fontSize: 15}}>{buyURL}</Text>
          </View> */}
          {buyURL != null && (
            <Button
              mode="contained"
              style={{
                width: '87%',
                height: 50,
                marginBottom: 20,
                alignSelf: 'center',
                borderRadius: 30,
                top: 25,
                borderWidth: 2,
                borderColor: '#008DFE',
              }}
              buttonColor="#008dfe"
              onPress={() => Linking.openURL(route.params.product.url)}>
              <Text style={{fontSize: 15, top: 3, color: '#FFF'}}>
                Buy Product
              </Text>
            </Button>
          )}
          {route.params.product.customButtonUrl != null && (
            <Button
              mode="contained"
              style={styles.buyNowBigButton}
              buttonColor="#FFF"
              onPress={() =>
                Linking.openURL(route.params.product.customButtonUrl)
              }>
              <Text style={{fontSize: 15, top: 3, color: '#008DFE'}}>
                {route.params.product.customButtonLabel}
              </Text>
            </Button>
          )}

          <View
            style={[
              styles.productDescription,
              {
                display:
                  description == '' || description == null ? 'none' : 'flex',
              },
            ]}>
            <View style={styles.productDescriptionHeader}>
              <View style={{width: '85%'}}>
                <Text
                  style={{
                    fontSize: SizeFont.font17,
                    color: colors.black,
                    // fontWeight: "bold",
                    fontFamily: fontFamilyBold,
                  }}>
                  Description
                </Text>
              </View>
              <View>
                <TouchableHighlight
                  underlayColor={'white'}
                  onPress={() => {
                    setdisplayDescription(!displayDescription);
                  }}
                  style={styles.arrowContainer}>
                  <Image
                    source={displayDescription == false ? arrowup : arrowdown}
                    style={styles.productImages}
                  />
                </TouchableHighlight>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                display: displayDescription == false ? 'flex' : 'none',
              }}>
              <Text
                style={{fontSize: SizeFont.font15, color: colors.dark_grey}}>
                {description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default ProductInfoPage;
const styles = StyleSheet.create({
  //Loader
  LoaderBlackBackround: {
    height: '130%',
    width: '100%',
    backgroundColor: 'black',
    zIndex: 10000,
    position: 'absolute',
  },
  LoaderCenterContainer: {
    backgroundColor: '#ededed',
    alignSelf: 'center',
    top: '40%',
    width: 60,
    height: 60,
    borderRadius: 9,
    position: 'absolute',
    zIndex: 1000,
  },
  LoaderAnimation: {
    alignSelf: 'center',
    top: '35%',
    zIndex: 1001,
    color: '#00c8ff',
    position: 'absolute',
  },
  //StoryModal
  modal: {
    justifyContent: 'flex-end',
    width: '100%',
    margin: 0,
  },
  //backButton Style
  backButton: {
    left: 10,
    height: 40,
    width: 40,
    shadowOpacity: 0.1,
    shadowOffset: '1',
    position: 'absolute',
    zIndex: 1000,
    elevation: 5,
    borderRadius: 444 / 2,
    alignItems: 'center',
  },

  //Story Toggal
  storyToggalSmallScreens: {
    height: 40,
    width: 40,
    shadowOpacity: 0.1,
    shadowOffset: '1',
    position: 'absolute',
    zIndex: 1000,
    elevation: 5,
    top: '5%',
    left: '73%',
    borderRadius: 444 / 2,
    alignItems: 'center',
  },
  storyToggalBigScreens: {
    height: 40,
    width: 40,
    shadowOpacity: 0.1,
    shadowOffset: '1',
    position: 'absolute',
    zIndex: 1000,
    elevation: 5,
    left: '75%',
    borderRadius: 444 / 2,
    alignItems: 'center',
  },

  //Buy Now Button
  buyNowButtonSmallScreens: {
    height: 40,
    width: 40,
    shadowOpacity: 0.1,
    shadowOffset: '1',
    position: 'absolute',
    zIndex: 1000,
    elevation: 5,
    left: '85%',
    borderRadius: 444 / 2,
    alignItems: 'center',
  },
  buyNowButtonBigScreens: {
    height: 40,
    width: 40,
    shadowOpacity: 0.1,
    shadowOffset: '1',
    position: 'absolute',
    zIndex: 1000,
    elevation: 5,
    left: '88%',
    borderRadius: 444 / 2,
    alignItems: 'center',
  },

  //Copy Barcode Modal
  copyBarcodeButton: {
    height: 40,
    width: 40,
    shadowOpacity: 0.1,
    shadowOffset: '1',
    position: 'absolute',
    zIndex: 1000,

    elevation: 5,

    left: '110%',
    borderRadius: 444 / 2,
    alignItems: 'center',
  },

  //BuyNow Big Button
  buyNowBigButton: {
    width: '87%',
    height: 50,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#008DFE',
    top: 13,
  },

  carouselContainer: {
    width: '100%',
    marginBottom: 5,
    zIndex: 1,

    elevation: 1,
  },
  productDescription: {
    paddingTop: '5%',
    width: '92%',
    display: 'flex',
    left: '3%',
    borderColor: 'grey',
    marginTop: '10%',
    padding: '4%',
    bottom: '5%',
  },
  productDescriptionHeader: {
    width: '100%',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productImages: {
    width: '100%',
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  arrowContainer: {
    // backgroundColor: 'black',
    width: 27,
    height: 27,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
