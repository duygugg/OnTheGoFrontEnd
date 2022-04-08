import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, ImageBackground} from 'react-native';
import {COLORS, SIZES} from '../../constants/index';
import alldata from '../../constants/dummyData';
import images from '../../constants/images';

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);
  //const navigation = useNavigation();

  const FlatListRef = useRef();

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
    <FlatList
      data={alldata.sliderData}
      pagingEnabled
      horizontal
      ref={FlatListRef}
      onViewableItemsChanged={handleChange.current}
      viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
      initialNumToRender={1}
      extraData={SIZES.width}
      showsHorizontalScrollIndicator={false}
      style={{width: SIZES.width, height: '100%'}}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        // Slider Content
        <ImageBackground
          source={images.passImage}
          resizeMode={'cover'}
          blurRadius={1}
          imageStyle={{
            opacity: 0.85,
          }}
          style={{
            width: SIZES.width,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            {/* <Text
              style={{
                fontFamily: 'SourceSansPro-SemiBold',
                fontSize: SIZES.double * 1.5,
                color: COLORS.navyblue,
                elevation: 5,
              }}>
              {item.title}
            </Text> */}
          </View>

          <View
            style={{
              alignItems: 'center',
            }}>
            {/* <Text
              style={{
                fontFamily: 'SourceSansPro-SemiBold',
                fontSize: SIZES.double,
              }}>
              {item.description}
            </Text> */}
          </View>

          {/* Pagination */}
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: SIZES.double * 3,
              right: SIZES.width / 2.2,
            }}>
            {
              //No of Dots
              alldata.sliderData.map((_, index) => {
                return (
                  <View
                    key={`indicator-${index}`}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 15,
                      backgroundColor:
                        index == currentSlide
                          ? COLORS.neongreen
                          : 'rgba(255, 255, 255,0.7)',
                      marginRight: 8,
                      elevation: 8,
                    }}></View>
                );
              })
            }
          </View>
        </ImageBackground>
      )}></FlatList>
  );
}

const styles = StyleSheet.create({});
