import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {COLORS, SIZES} from '../../constants/index';
import images from '../../constants/images';
import {faLocationDot, faCircleDot} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function PopularRoutes(props) {
  data = [
    {
      id: 0,
      from: 'ILIMTEPE',
      to: 'MERMERCILER',
    },
    {
      id: 1,
      from: 'KURNAKOY 2',
      to: 'ISTANBULPARK',
    },
    {
      id: 2,
      from: 'AKMEŞE',
      to: 'KMO AKYAZI',
    },
  ];

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
    <View style={styles.container}>
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
        style={{width: SIZES.width / 1.1, height: '100%'}}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          // Container
          <View style={styles.routeContainer}>
            {/* Title */}
            <Text
              style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
              Popüler Rotalarım
            </Text>
            {/* Content */}

            {/* Graphic */}
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{left: 60}}>
                <FontAwesomeIcon
                  icon={faCircleDot}
                  color={COLORS.babyblue}
                  size={18}
                />
              </View>
              <View style={styles.imageContainerStyle}>
                <Image
                  source={images.carlogo}
                  resizeMode={'cover'}
                  style={{height: 80, width: 80, alignSelf: 'center'}}
                />
              </View>
              <View style={{right: 60}}>
                <FontAwesomeIcon icon={faLocationDot} color={'red'} size={20} />
              </View>
            </View>
            {/* Dash */}

            <View
              style={{
                borderWidth: 3,
                borderRadius: 1,
                borderStyle:'dashed',
                borderColor: 'gray',
                marginHorizontal: 50,
                top:-20,
              }}></View>

            {/* Station Text info */}
            <View style={styles.routes}>
              <Text style={[styles.text,{color:'gray'}]}>{item.from}</Text>
              <Text style={[styles.text,{color:'gray'}]}>{item.to}</Text>
            </View>
          </View>
        )}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: SIZES.height * 0.3,
    padding: 20,
  },
  routeContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: SIZES.height * 0.22,
    width: SIZES.width / 1.1,
    paddingVertical: 10,
  },
  routes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZES.double,
  },
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',

  },
});
