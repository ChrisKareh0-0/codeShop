import React, {useState, useEffect, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {StyleSheet, Linking} from 'react-native';

import {colors} from '../Library/colors';
import {View, Animated, Dimensions, StatusBar, Image, Text} from 'react-native';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {readStory} from '../API/API';
import convertToProxyURL from 'react-native-video-cache';
import {pause} from '../Library/icons';
import {muted, noMute} from '../Library/icons';
import {noProfile, closy} from '../Library/icons';

// import {setCurrent} from '../Redux/Slice';

const StoryModal = ({isVisible, content, product, closeCallback}) => {
  const [vidPause, setvidPause] = useState(false);
  const [buffering, setBuffering] = useState(false);
  // const current = state => state.Barcode.current;
  const [current, setCurrent] = useState(0);
  const [progressArray, setprogressArray] = useState([]);
  // const content = useSelector(state => state.Barcode.content);

  const [mute, setmute] = useState(false);
  const [title, settitle] = useState('');
  const [url, setURl] = useState('');
  const [type, settype] = useState(null);

  useEffect(() => {
    setCurrent(0);
  }, []);

  useEffect(() => {
    let data = [];

    if (content?.length != 0) {
      //(' I am at line 46');
      for (i = 0; i <= content?.length - 1; i++) {
        data[i] = content[i]?.finish;
      }
    }

    setprogressArray(data);
    //('DATA Line 45', data);
  }, [content]);

  // for get the duration
  const [end, setEnd] = useState(0);
  // current is for get the current content is now playing

  // if load true then start the animation of the bars at the top
  const [load, setLoad] = useState(false);
  // progress is the animation value of the bars content playing the current state
  const progress = useRef(new Animated.Value(0)).current;

  const {width, height} = Dimensions.get('window');
  const videoRef = useRef(null);

  // useEffect(() => {
  //   handlePause(30);
  // }, []);

  const handlemute = () => {
    setmute(!mute);
  };

  handlebuffer = () => {
    let data = [...content];
    data[current].finish = 1;
    handleAnimation(13);
  };

  const handlePause = n => {
    setvidPause(!vidPause);
    let data = [...content];
    data[current].finish = 1;
    setLoad(true);
    handleAnimation(13);
  };
  const handleAnimation = n => {
    if (vidPause == false) {
      progress.stopAnimation();
    } else {
      if (content[current].type == 'video') {
        Animated.timing(progress, {
          toValue: 1,
          duration: n * 1000,
          useNativeDriver: false,
        }).start(({finished}) => {
          if (finished) {
            next();
          }
        });
      } else {
        Animated.timing(progress, {
          toValue: 1,
          duration: 5 * 1000,
          useNativeDriver: false,
        }).start(({finished}) => {
          if (finished) {
            next();
          }
        });
      }
      // setPaused(false);
    }
  };

  function closed() {
    closeCallback();
  }
  // start() is for starting the animation bars at the top
  function start(n) {
    //('How much am I geting called per iteration');
    readStory(content[current].id);
    // progress.setValue(0);
    let kontent = progressArray;
    kontent[current] = 1;
    setprogressArray(kontent);
    //('KONTENT', progressArray);
    //////('Line 109 KONTENT', content[current]);
    // checking if the content type is video or no
    if (content[current].type == 'video') {
      // type video

      // console.warn('Video Loaded');
      settype(false);
      Animated.timing(progress, {
        toValue: 1,
        duration: n * 1000,
        // useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          next();
        }
      });
    } else {
      // type image
      settype(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
      }).start(({finished}) => {
        if (finished) {
          next();
        }
      });
    }
  }

  // handle playing the animation
  function play() {
    // setvidPause(true);
    // setCurrent(0);
    //(current);
    // progress.stopAnimation();
    start(end);
  }

  // next() is for changing the content of the current content to +1
  function next() {
    // check if the next content is not empty
    // let data = [...content];
    if (current !== content.length - 1) {
      // setPaused(!paused);
      // contentr[current].finish = 1;
      // setContent(data);

      setCurrent(current + 1);
      settitle(content[current].title);
      setURl(content[current].buttonUrl);
      //(url);
      progress.setValue(0);
      setLoad(true);
    } else {
      // the next content is empty
      //('I am in else line 175');
      progress.setValue(0);
      let progressData = [];
      //('Content after for', content);
      setCurrent(0);

      for (var i = 0; i <= content.length - 1; i++) {
        progressData[i] = 0;
      }
      progress.setValue(0);
      setprogressArray(progressData);
    }
  }

  // previous() is for changing the content of the current content to -1
  function previous() {
    progress.setValue(0);

    // checking if the previous content is not empty
    if (current - 1 >= 0) {
      // setContent();
      let kontent = progressArray;
      kontent[current] = 0;
      setprogressArray(kontent);
      setCurrent(current - 1);

      setvidPause(false);
      progress.setValue(0);
      setLoad(false);
    } else {
      // the previous content is empty
      setCurrent(0);
    }
  }

  // closing the modal set the animation progress to 0

  const onRefresh = () => {
    setRefreshing(true);
    // getProducts();
  };

  return (
    <View style={styles.modal}>
      <View style={{height: height, backgroundColor: '#000'}}>
        <View style={styles.containerModal}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          {content?.length && (
            <View style={styles.backgroundContainer}>
              {content[current].type == 'video' ? (
                <View>
                  <Video
                    source={{
                      uri: convertToProxyURL(content[current].content),
                    }}
                    onLoad={data => {
                      setBuffering(true);
                      setEnd(data.duration);
                    }}
                    rate={1.0}
                    muted={mute}
                    volume={1.0}
                    paused={vidPause}
                    onBuffer={({isBuffering}) => {
                      if (isBuffering) {
                        setBuffering(true);
                      } else {
                        setBuffering(false);
                      }
                    }}
                    resizeMode="cover"
                    shouldPlay={true}
                    positionMillis={0}
                    onReadyForDisplay={data => {
                      //('am I here ?');
                      play(data);
                    }}
                    onPlaybackStatusUpdate={AVPlaybackStatus => {
                      setLoad(AVPlaybackStatus.isLoaded);
                      setEnd(AVPlaybackStatus.durationMillis);
                    }}
                    style={{height: height, width: width}}
                  />
                  {/* <MediaControls onPaused={onPaused} /> */}
                </View>
              ) : (
                <View>
                  <Image
                    onLoadEnd={() => {
                      progress.setValue(0);
                      // handleAnimation(3);
                      // setPaused(false);
                      // setBuffering(false);
                      //('why am I here ?');
                      play();
                    }}
                    // onLoadStart={() => setPaused(false)}
                    source={{
                      uri: content[current].content,
                    }}
                    style={{
                      width: width,
                      height: height,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              )}
              {content[current].buttonUrl && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.storyButton}
                    onPress={() => {
                      Linking.openURL('https://' + content[current].buttonUrl);
                    }}>
                    <Text style={styles.storyButtonText}>
                      {content[current].title}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          <View
            style={{
              flexDirection: 'column',
              flex: 1,

              position: 'absolute',
              width: '100%',
              height: height - 150,
            }}>
            <LinearGradient
              colors={['rgba(0,0,0,1)', 'transparent']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 100,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingHorizontal: 10,
              }}>
              {progressArray?.map((index, key) => {
                return (
                  <View
                    key={key}
                    style={{
                      height: 2,
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: 'rgba(117, 117, 117, 0.5)',
                      marginHorizontal: 2,
                    }}>
                    <Animated.View
                      style={{
                        flex: current == key ? progress : index,
                        //flex: progress,
                        height: 2,
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      }}
                    />
                  </View>
                );
              })}
            </View>

            <View
              style={{
                height: 50,
                flexDirection: 'row',

                justifyContent: 'space-between',
                paddingHorizontal: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {product.images[0]?.image ? (
                  <Image
                    style={{height: 30, width: 30, borderRadius: 25}}
                    source={{
                      uri: product.images[0].image,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: 444 / 2,
                      height: 30,
                      width: 30,
                    }}>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        alignSelf: 'center',
                        marginTop: '15%',
                      }}
                      source={noProfile}
                    />
                  </View>
                )}
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    paddingLeft: 10,
                  }}>
                  {product.title}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  closed();
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',

                    height: 50,
                    paddingHorizontal: 15,
                  }}>
                  <Image
                    source={closy}
                    style={{height: 30, width: 30, tintColor: 'white'}}></Image>
                </View>
              </TouchableOpacity>

              {mute ? (
                <TouchableOpacity
                  onPress={() => {
                    handlemute();
                  }}
                  style={{
                    position: 'absolute',
                    left: '70%',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: type == false ? 'flex' : 'none',
                      height: 50,
                      paddingHorizontal: 15,
                    }}>
                    <Image
                      source={muted}
                      style={{height: 30, width: 30}}></Image>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    handlemute();
                  }}
                  style={{
                    position: 'absolute',
                    left: '70%',
                    display: type == false ? 'flex' : 'none',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',

                      height: 50,
                      paddingHorizontal: 15,
                    }}>
                    <Image
                      source={noMute}
                      style={{height: 30, width: 30}}></Image>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                bottom: 0,
                position: 'absolute',
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                alignContent: 'space-between',
                height: height - 250,
                // backgroundColor: "red",
              }}>
              <TouchableWithoutFeedback
                style={{}}
                onPress={() => {
                  // progress.setValue(1);
                  Animated.timing(progress, {
                    toValue: 0,
                    duration: 5,
                  }).start(({finished}) => {
                    if (finished) {
                      previous();
                    }
                  });
                }}>
                <View style={{flex: 1}} />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                style={
                  {
                    // minWidth: 100,
                  }
                }
                onPress={() => handlePause(end)}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: width / 3,
                  }}>
                  {vidPause && (
                    <Image
                      style={{width: 70, height: 70}}
                      source={pause}></Image>
                  )}
                  {buffering && (
                    <ActivityIndicator
                      animating={true}
                      style={{
                        alignSelf: 'center',
                        // position: "absolute",
                      }}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                style={{}}
                onPress={() => {
                  progress.setValue(0);
                  Animated.timing(progress, {
                    toValue: 1,
                    duration: 5,
                  }).start(({finished}) => {
                    if (finished) {
                      next();
                    }
                  });
                  // next();
                }}>
                <View style={{flex: 1}} />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    zIndex: 10000,
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
    bottom: 90,
    width: '100%',
    // backgroundColor: colors.black,
  },
  storyButton: {
    // height: "5%",
    width: '90%',
    alignSelf: 'center',
    // marginBottom: "10%",
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  storyButtonText: {
    color: '#008DFE',
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingVertical: 15,
  },
});
export default StoryModal;
