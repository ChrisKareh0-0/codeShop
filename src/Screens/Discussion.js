import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Linking,
  FlatList,
  Alert,
} from 'react-native';

import {placeholder, buyLink, BackUI} from '../Library/icons';
import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Received from '../Components/Received';
import Sent from '../Components/Sent';
import StoryFoundModal from '../Components/StoryFoundModal';
import Input from '../Components/Input';
import {TouchableHighlight} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import {Store} from '../Redux/Store';
import {colors} from '../Library/colors';
import {SizeFont} from '../Library/Styles';
import {screen_height} from '../Library/Styles';
import {setMessage, setMessageLoader} from '../Redux/Slice';
import {resetState, setstoryLoader} from '../Redux/Slice';
import StoryModal from '../Components/StoryModal';
import {chat, sendMessage} from '../API/API';
import {fontFamilyBold} from '../Library/Styles';
import Toast from 'react-native-toast-message';

const Discussion = ({navigation, route}) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [predefVisible, setpredefVisible] = useState(true);
  const [cModalVisible, setcModalVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [storyAutomatic, setstoryAutomatic] = useState(false);
  const storyLoader = useSelector(state => state.Barcode.storyLoader);
  const isChatLoading = useSelector(state => state.Barcode.isChatLoading);
  const chatData = useSelector(state => state.Barcode.chatData);
  const Message = useSelector(state => state.Barcode.Message);
  const [profilePic, setprofilePic] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    Store.dispatch(setstoryLoader(true));
    console.log(chatData);
    // setprofilePic(route.params.product.images[0].image);

    //Opens the story automatically if exists
    if (route.params.product.story.length != 0) {
      setcModalVisible(true);
      setstoryAutomatic(true);
    }
  }, []);

  //auto scrolls the flatlist to the end
  const endScroll = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  //auto open close keyboard
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    //Chat Data API
    chat(route.params.product.id);
    Store.dispatch(setstoryLoader(true));
    endScroll();
    Store.dispatch(resetState());
  }, []);

  const sendText = async () => {
    console.log(Message);
    if (Message == '') {
      Toast.show({
        type: 'error',
        text1: 'Insert Text',
      });
      Store.dispatch(setMessageLoader(false));
    } else {
      const response = await sendMessage(Message, route.params.product.id);

      setTimeout(() => {
        if (response) {
          Alert.alert('Error', 'No response ');
        } else {
          console.log('clear text field');
          setMessage('');
        }
      }, 500);
    }
  };

  var txt = [];

  // (chatData);

  const toggleStoryModal = () => {
    setcModalVisible(!cModalVisible);
    setstoryAutomatic(false);
  };

  return (
    <>
      {/* Story Screen PopUp Modal */}
      <Modal
        onBackdropPress={() => setcModalVisible(false)}
        onBackButtonPress={() => setcModalVisible(false)}
        isVisible={cModalVisible}
        onSwipeComplete={toggleStoryModal}
        swipeDirection="down"
        animationInTiming={300}
        animationOutTiming={10}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        <StoryModal
          isVisible={cModalVisible}
          content={route.params.product.story}
          product={route.params.product}
          closeCallback={() => {
            setcModalVisible(false);
            setstoryAutomatic(false);
          }}
        />
      </Modal>

      <StoryFoundModal
        modalVisible={modalVisible}
        closeCallback={() => {
          setmodalVisible(false);
        }}
      />
      {storyAutomatic ? (
        <>
          <View
            style={{
              top: 0,
              height: '100%',
              width: '100%',
              zIndex: 10000000,
              backgroundColor: 'black',
            }}></View>
        </>
      ) : null}

      <View
        style={
          screen_height > 800
            ? {
                height: '13%',
                width: '100%',
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                backgroundColor: '#008DFE',
                flexDirection: 'row',
                alignItems: 'center',
                top: 0,
                zIndex: 800,
              }
            : {
                height: '13%',
                width: '100%',
                backgroundColor: '#008DFE',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                zIndex: 800,
              }
        }>
        <TouchableHighlight
          underlayColor={'#008DFE'}
          style={
            screen_height > 800
              ? {
                  top: '4%',
                  borderRadius: 444 / 2,
                  width: 30,
                  height: 30,
                  left: 3,
                }
              : {
                  top: '2%',
                  borderRadius: 444 / 2,

                  width: 30,
                  height: 30,
                  left: 1,
                }
          }
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={BackUI}
            style={{
              width: 12,
              height: 20,
              alignSelf: 'center',
              top: 5,

              tintColor: 'white',
            }}
          />
        </TouchableHighlight>
        <View
          style={
            screen_height > 800
              ? {
                  height: 40,
                  width: 200,
                  marginTop: '8%',
                  flexDirection: 'row',
                  zIndex: 999,
                }
              : {
                  height: 40,
                  width: 200,
                  flexDirection: 'row',
                  zIndex: 999,
                  marginTop: '3%',
                }
          }>
          <View
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '1.2%',
              paddingBottom: '2%',
              zIndex: 999,
            }}>
            {route.params.product.storySeen == true ? (
              <View
                style={{
                  borderWidth: 2,
                  height: 40,
                  width: 40,
                  borderRadius: 444 / 2,
                  position: 'absolute',
                  borderColor: '#7d828a', //Grey
                }}></View>
            ) : (
              <View
                style={{
                  borderWidth: 2,
                  height: 40,
                  width: 40,
                  borderRadius: 444 / 2,
                  position: 'absolute',
                  borderColor: '#1f93ff',
                  zIndex: 999, //blue
                }}></View>
            )}
            <TouchableHighlight
              underlayColor={'#008DFE'}
              style={{zIndex: 1000}}
              onPress={() => {
                if (route.params.product.story.length) {
                  console.warn('OPTION 1');
                  setcModalVisible(true);
                } else {
                  console.warn('OPTION 2');
                  setmodalVisible(true);
                }
              }}>
              {!route.params.product.images.length ? (
                <Image
                  source={placeholder}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 400 / 2,
                  }}
                />
              ) : (
                <Image
                  source={{
                    uri: route.params.product.images[0].image,
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 400 / 2,
                  }}
                />
              )}
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            underlayColor={'#008DFE'}
            style={{
              width: 250,
              height: 35,
              top: 0,
              left: 10,
              overflow: 'hidden',
            }}
            onPress={() => {
              navigation.navigate('ProductInfoPage', {
                barkod: route.params.barkodo || route.params.barkod,
                product: route.params.product,
                content: route.params.product.story,
              });
            }}>
            <Text
              ellipsizeMode="tail"
              style={{
                justifyContent: 'center',
                top: 12,
                fontFamily: fontFamilyBold,

                color: colors.white,
                fontSize: SizeFont.font17,
                fontFamily: fontFamilyBold,
              }}>
              {route.params.product.title}
            </Text>
          </TouchableHighlight>
          {route.params.product.url != null && (
            <TouchableHighlight
              underlayColor={'#008DFE'}
              style={{
                height: 20,
                width: 90,
                position: 'absolute',
                left: '150%',
              }}
              onPress={() => {
                Linking.openURL(route.params.product.url);
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  top: 10,
                  left: 10,
                }}
                source={buyLink}></Image>
            </TouchableHighlight>
          )}
        </View>
      </View>

      <KeyboardAvoidingView
        style={{flex: 1, zIndex: 300}}
        behavior="padding"
        keyboardVerticalOffset={30}>
        <View style={{height: '100%'}}>
          {storyLoader && (
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(255, 255 , 255, 0.9)',
                zIndex: 10000,
                position: 'absolute',
                elevation: 10,
              }}>
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
              screen_height < 800
                ? {
                    backgroundColor: '#F2F2F2',

                    height: 570,
                    paddingHorizontal: 20,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                  }
                : [styles.main]
            }>
            <FlatList
              ref={scrollViewRef}
              style={{
                paddingTop: 10,

                backgroundColor: '#F2F2F2',
              }}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={endScroll()}
              data={chatData}
              renderItem={({item, index}) => {
                Store.dispatch(setstoryLoader(false));
                return (
                  <>
                    <Sent item={item} />
                    <Received item={item} />
                  </>
                );
              }}></FlatList>
            <Input
              ref={endScroll}
              inputMessage={Message}
              setMessage={inputMessage =>
                Store.dispatch(setMessage(inputMessage))
              }
              onSendPress={() => {
                sendText();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      {predefVisible == true &&
        typeof Array.isArray(chatData) &&
        !chatData.length &&
        !isChatLoading && (
          <>
            <View style={{zIndex: 10000, bottom: 300}}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#515151',
                  fontFamily: 'Poppins-Bold.ttf',
                }}>
                Tap to send
              </Text>
              <Text
                style={{
                  top: 3,
                  alignSelf: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                Seeking Answers?
              </Text>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              style={
                screen_height > 800
                  ? {
                      borderRadius: 10,

                      width: '80%',
                      height: '20%',
                      zIndex: 10000,
                      top: '66%',
                      marginTop: 0,

                      alignSelf: 'center',
                      position: 'absolute',
                    }
                  : {
                      borderRadius: 10,
                      width: '80%',
                      height: '20%',
                      zIndex: 10000,
                      top: 480,
                      marginTop: 5,
                      alignSelf: 'center',
                      position: 'absolute',
                    }
              }
              data={route.params.product.predefinedQuestions}
              renderItem={({item}) => {
                return (
                  <>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',

                        width: '100%',
                        height: 46,
                        borderRadius: 40,
                        justifyContent: 'center',
                        marginVertical: 5,
                        paddingVertical: 15,
                      }}
                      onPress={() => {
                        setpredefVisible(false);

                        Store.dispatch(setMessage(item));
                        console.log(route.params.product.id);

                        sendMessage(item, route.params.product.id);
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: '#008DFE',
                          fontWeight: 'bold',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              }}></FlatList>
          </>
        )}
    </>
  );
};
export default Discussion;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    zIndex: 100000,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    zIndex: 999,
  },
  main: {
    backgroundColor: '#F2F2F2',

    height: 700,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerContainer: {
    height: '8%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
    zIndex: 800,
  },
  headerContainer2: {
    height: '8%',
    width: '100%',
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
    zIndex: 800,
  },
  username: {
    color: '#000119',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
