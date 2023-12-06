import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {ActivityIndicator, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import {Loading} from '../Components/Loading';
import {colors} from '../Library/colors';
import {fontFamilyBold, fontFamilyRegular, SizeFont} from '../Library/Styles';
import Modal from 'react-native-modal';
import {getStoryHistory} from '../API/API';
import {back} from '../Library/icons';

import {check, placeholder, scan} from '../Library/icons';

import StoryModal from '../Components/StoryModal';
import {Store} from '../Redux/Store';
import {SetshowScanner, setLoading} from '../Redux/Slice';

import StoryFoundModal from '../Components/StoryFoundModal';
import {screen_height} from '../Library/Styles';

const ScanHistory = ({navigation}) => {
  const edit = useSelector(state => state.Barcode.edit);
  const historyProducts = useSelector(state => state.Barcode.historyProducts);
  const Apikey = useState('');
  const [loadedImage, setLoadedImage] = useState([]);
  const storyLoader = useSelector(state => state.Barcode.storyLoader);
  const [modalVisible, setmodalVisible] = useState(false);
  const [storyVisible, setstoryVisible] = useState(false);
  const [activeProduct, setactiveProduct] = useState(null);

  const toggleStoryModal = () => {
    setstoryVisible(!storyVisible);
  };
  useEffect(() => {
    Store.dispatch(SetshowScanner(false));
  });
  useEffect(() => {
    navigation.addListener('focus', route => {
      getStoryHistory();

      Store.dispatch(setLoading(true));
    });
    getStoryHistory();
  }, []);

  if (historyProducts.data?.length == 0) {
    return (
      <>
        <Text style={{alignSelf: 'center', top: '40%'}}> No History </Text>
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
                    fontSize: 19,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    left: '165%',
                    top: '5%',
                  }
                : {
                    fontSize: 17,
                    fontWeight: 'bold',
                    backgroundColor: 'black',
                    top: '2%',
                    right: 10,
                  }
            }>
            Scan History
          </Text>
          <TouchableHighlight
            underlayColor={'white'}
            style={
              screen_height > 800
                ? {
                    top: '3%',
                    borderRadius: 444 / 2,
                    width: 30,
                    height: 40,

                    right: '120%',
                  }
                : {
                    top: '1%',
                    borderRadius: 444 / 2,
                    right: '160%',
                    width: 30,
                    height: 40,
                    position: 'absolute',
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
                tintColor: '#008dfe',
                right: 10,
              }}
            />
          </TouchableHighlight>
        </View>
      </>
    );
  } else {
    return (
      <>
        <StoryFoundModal
          modalVisible={modalVisible}
          closeCallback={() => {
            setmodalVisible(false);
          }}
        />

        <Modal
          onBackdropPress={() => setstoryVisible(false)}
          onBackButtonPress={() => setstoryVisible(false)}
          isVisible={storyVisible}
          onSwipeComplete={toggleStoryModal}
          swipeDirection="down"
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={500}
          style={styles.modal}>
          <StoryModal
            isVisible={storyVisible}
            content={activeProduct ? activeProduct.story : null}
            product={activeProduct}
            closeCallback={() => {
              setstoryVisible(false);
            }}
          />
        </Modal>

        {storyLoader && (
          <View
            style={
              screen_height < 800
                ? {
                    height: '85%',
                    width: '100%',
                    backgroundColor: 'rgba(255, 255 , 255, 0.9)',
                    zIndex: 10000,
                    position: 'absolute',
                    bottom: 0,
                  }
                : {
                    height: '87%',
                    width: '100%',
                    backgroundColor: 'rgba(255, 255 , 255, 0.9)',
                    zIndex: 10000,
                    position: 'absolute',
                    bottom: 0,
                  }
            }>
            <View
              style={{
                backgroundColor: '#ededed',
                alignSelf: 'center',
                top: '40%',
                width: 60,
                height: 60,
                borderRadius: 9,
                position: 'absolute',
                zIndex: 1000,
              }}>
              <ActivityIndicator
                animating={storyLoader}
                style={{
                  alignSelf: 'center',
                  top: '35%',
                  zIndex: 1001,
                  color: '#00c8ff',
                  position: 'absolute',
                }}
              />
            </View>
          </View>
        )}

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
                    left: '125%',
                    top: '5%',
                  }
                : {
                    color: 'white',
                    fontSize: 17,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    left: '155%',
                    top: '2%',
                  }
            }>
            Scan History
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

                    right: '90%',
                  }
                : {
                    top: '1%',
                    borderRadius: 444 / 2,
                    right: '100%',
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

        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.maincontainer}
          data={historyProducts.data}
          renderItem={({item, index}) => {
            Store.dispatch(setLoading(false));
            return (
              <View
                style={[
                  styles.itemContainer,
                  {marginTop: index == 0 ? 0 : 10},
                ]}>
                <View
                  style={[
                    styles.checkContainer,
                    {
                      display: edit ? 'flex' : 'none',
                      // borderWidth:1
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      checkSelectedIds(item);
                    }}
                    style={[styles.iconCheckContainer]}>
                    <Image
                      source={check}
                      style={[
                        styles.checkImage,
                        {
                          tintColor: colors.white,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  key={index}
                  style={[styles.EachItem, {width: edit ? '90%' : '100%'}]}>
                  <TouchableOpacity
                    style={styles.ImageContainer}
                    onPress={() => {
                      // Store.dispatch(setstoryLoader(true));
                      if (item.product.story.length > 0) {
                        setactiveProduct(item.product);
                        // setTimeout(() => {
                        setstoryVisible(true);
                        // }, 1000);
                      } else {
                        setmodalVisible(true);
                      }
                    }}>
                    {item.product.storySeen == true ? (
                      <View
                        style={{
                          borderWidth: 2,
                          height: 55,
                          width: 55,
                          borderRadius: 444 / 2,
                          position: 'absolute',
                          borderColor: '#7d828a', //Grey
                        }}></View>
                    ) : (
                      <View
                        style={{
                          borderWidth: 2,
                          height: 55,
                          width: 55,
                          borderRadius: 444 / 2,
                          position: 'absolute',
                          borderColor: '#1f93ff',
                          zIndex: 999, //blue
                        }}></View>
                    )}

                    {item.product.story == 0 && (
                      <View
                        style={{
                          borderWidth: 2,
                          height: 55,
                          width: 55,
                          borderRadius: 444 / 2,
                          position: 'absolute',
                          borderColor: '#7d828a',
                          zIndex: 1000, //Grey
                        }}></View>
                    )}

                    <View style={styles.ProductImage}>
                      <ImageBackground
                        source={
                          item.product.images.length == 0
                            ? placeholder
                            : {uri: item.product.images[0].image}
                        }
                        style={styles.backgroundImg}
                        imageStyle={{width: '100%', height: '100%'}}
                        onLoadEnd={() =>
                          setLoadedImage([...loadedImage, item.id])
                        }>
                        {loadedImage.findIndex(e => e == item.id) == -1 ? (
                          <Loading
                            Swidth="100%"
                            Sheight="100%"
                            size="small"
                            bgColor={colors.white}
                          />
                        ) : (
                          <></>
                        )}
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Discussion', {
                        barkodo: item.product.barcode,
                        product: item.product,
                        isFromHistory: true,
                      });
                    }}
                    style={styles.titleContainer}>
                    <View style={{width: edit ? '100%' : '70%'}}>
                      <View style={[styles.textItem, {marginTop: 5}]}>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: colors.black,
                            fontSize: SizeFont.font17,
                            fontFamily: fontFamilyBold,
                          }}>
                          {item.product.title}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.textItem,
                          {
                            display: Apikey == '' ? 'none' : 'flex',
                            paddingVertical: '2%',
                            paddingBottom: '4%',
                          },
                        ]}>
                        <Image
                          source={scan}
                          style={[
                            styles.scanImage,
                            {
                              display: edit ? 'none' : 'flex',
                            },
                          ]}
                        />
                        {edit ? (
                          <>
                            <Text
                              style={{
                                color: colors.textcolor,
                                fontSize: SizeFont.font13,
                                fontFamily: fontFamilyRegular,
                              }}>
                              {item.product.barcode}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text
                              style={{
                                color: colors.textcolor,
                                fontSize: SizeFont.font13,
                                fontFamily: fontFamilyRegular,
                              }}>
                              {' ' + item.product.barcode}
                            </Text>
                          </>
                        )}
                      </View>
                    </View>
                    <View
                      style={[
                        styles.dateContainer,
                        {display: edit ? 'none' : 'flex'},
                      ]}>
                      <Text
                        style={{
                          color: colors.light_grey,
                          fontSize: SizeFont.font13,
                          fontFamily: fontFamilyRegular,
                        }}>
                        {item.date}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </>
    );
  }
};

const styles = StyleSheet.create({
  maincontainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '4%',
    bottom: '1%',

    paddingTop: 15,
    backgroundColor: colors.white,
    zIndex: 700,
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: '2%',
    paddingBottom: '0%',
  },
  imageHeaderContainer: {
    width: 25,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCheckContainer: {
    width: 25,
    height: 25,
    borderRadius: 50,
    padding: 5,
    borderColor: colors.primary_color,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  EachItem: {
    width: '90%',
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textItem: {
    width: '100%',
    marginTop: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageContainer: {
    width: 48,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '1%',
    paddingBottom: '2%',
  },
  ProductImage: {
    width: 48,
    height: 48,
    borderRadius: 400 / 2,
    overflow: 'hidden',
  },
  dateContainer: {
    width: '30%',
    display: 'flex',
    alignItems: 'flex-end',
    paddingTop: '1%',
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  emptyProductsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    tintColor: colors.primary_color,
  },
  checkContainer: {
    width: '10%',
    padding: '2%',
    paddingTop: '6%',
    alignItems: 'center',
  },
  titleContainer: {
    width: '83%',
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    justifyContent: 'space-between',
  },
  scanImage: {
    width: 15,
    height: 15,
    resizeMode: 'cover',
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

export default ScanHistory;
