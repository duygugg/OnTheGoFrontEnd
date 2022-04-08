import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../constants/themes';
import images from '../constants/images';

const data = [
  {
    id: 1,
    title: 'Kuzey Marmara Otoyolu Mobil Uygulamasına Hoş Geldiniz!',
    description:
      'Uygulamamızı kullanarak; Tüm geçişlerinizi sorgulayabilir ve ihlalli geçişleri ödeyebilir ',
  },
  {
    id: 2,
    title: 'İhlali geçişleriniz ile ilgili anlık bildirim alabilir',
    description: 'İhlali geçişleriniz ile ilgili anlık bildirim alabilir',
  },
  {
      id: 3,
      title: "Belirlediğiniz güzergâh için ücret bilgisini hesaplayabilir",
      description: "Belirlediğiniz güzergâh için ücret bilgisini hesaplayabilir",
     

  },
  {
      id: 4,
      title: "Harita Servisimizi Kullanarak",
      description: "Otoyol içerisinde yer alan tüm tesisleri görüntüleyebilir ve yol tarifi alabilir",
     

  },
  {
      id: 5,
      title: "Otoyol ile ilgili duyuruları görüntüleyebilirsiniz",
      description: "Otoyol ile ilgili duyuruları görüntüleyebilirsiniz.",
      

  }
];

export default function Intro({navigation}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);
  //const navigation = useNavigation();

  const FlatListRef = useRef();

  const handleSkip = () => {
    FlatListRef.current.scrollToIndex({
      animated: true,
      index: data.length - 1,
    });
  };

  const handleBack = () => {
    if (currentSlide == 0) {
      return;
    } else {
      FlatListRef.current.scrollToIndex({
        animated: true,
        index: currentSlide - 1,
      });
    }
  };

  const handleNext = () => {
    if (currentSlide == data.length - 1) {
      return;
    }
    FlatListRef.current.scrollToIndex({
      animated: true,
      index: currentSlide + 1,
    });
  };

  const handleChange = useRef(({viewableItems}) => {
    setViewableItems(viewableItems);
  });
  useEffect(() => {
    if (!viewableItems[0] || currentSlide === viewableItems[0].index) {
      return;
    }
    setCurrentSlide(viewableItems[0].index);
  }, [viewableItems]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        //paddingTop: 50
        justifyContent: 'center',
      }}>
      {/* TOP SECTION */}
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.base * 2,
          }}>
          <TouchableOpacity
            onPress={handleBack}
            style={{
              padding: SIZES.base,
            }}>
            <Icon
              name="arrow-left"
              style={{
                fontSize: SIZES.width * 0.07,
                color: COLORS.black,
                opacity: currentSlide == 0 ? 0 : 1,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.black,
                opacity: currentSlide == data.length - 1 ? 0 : 1,
              }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* FLATLIST CONTENT SECTION */}

      <FlatList
        data={data}
        pagingEnabled
        horizontal
        ref={FlatListRef}
        onViewableItemsChanged={handleChange.current}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
        initialNumToRender={1}
        extraData={SIZES.width}
        showsHorizontalScrollIndicator={false}
        //contentContainerStyle={{ paddingBottom: 400 }}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <View
                style={{
                  marginVertical: SIZES.base * 2,
                  alignContent: 'center',
                  marginHorizontal: SIZES.base * 2,
                }}>
                <ImageBackground
                  source={images.onBoardIcon}
                  resizeMode="contain"
                  style={{
                    width: SIZES.width * 0.8,
                    height: SIZES.height * 0.4,
                  }}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: SIZES.base * 4,
                  marginVertical: SIZES.base * 2,
                }}>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: SIZES.width / 16,
                    marginBottom: 10,
                    textAlign: 'center',
                  }}>
                  {item.title}
                </Text>

                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: SIZES.width / 22,
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}></FlatList>

      {/* BOTTOM SECTION */}
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: SIZES.base * 2,
            paddingVertical: SIZES.base * 2,
            //backgroundColor: 'pink'
          }}>
          {/* Pagination */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {
              //No of Dots
              data.map((_, index) => {
                return (
                  <View
                    key={`indicator-${index}`}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor:
                        index == currentSlide ? COLORS.themeblue : 'lightgray',
                      marginRight: 8,
                    }}></View>
                );
              })
            }
          </View>
          {currentSlide != data.length - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.8}
              style={{
                borderRadius: 45,
                width: 60,
                height: 60,
                backgroundColor: COLORS.primary,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="chevron-right" size={25} color={'white'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('MainHome')}
              activeOpacity={0.8}
              style={{
                borderRadius: 45,
                width: 120,
                height: 60,
                backgroundColor: COLORS.themeblue,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 17,
                  fontWeight: '500',
                }}>
                Get Started
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
