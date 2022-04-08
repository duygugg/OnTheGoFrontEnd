import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES} from '../../constants/index';
import {NewsContext} from '../../ContextProvider/NewsContext';
import {NewsDetailContext} from '../../ContextProvider/NewsDetailContext';
import moment from 'moment';
import 'moment/locale/tr';
// import 'moment/locale/en';
import {deviceLanguage} from '../../constants/index';

export default function News({navigation}) {
  const [news, setNews] = React.useContext(NewsContext);
  const {selectedNews} = React.useContext(NewsDetailContext);
  const [newsId, setNewsId] = selectedNews;

  //console.log('news id:', newsId);
  //console.log(news);

  const getDate = datetime => {
    const date = moment(datetime)
      .locale(deviceLanguage)
      .format('DD MMMM YYYY ');
    return date.replace('-', ' ');
  };
  return (
    <View>
      <FlatList
        data={news.newsData}
        horizontal
        showsHorizontalScrollIndicator={true}
        refreshing={news.loading}
        renderItem={({item}) => (
          <View style={{paddingHorizontal: 10}}>
            <View>
              <TouchableOpacity
                style={{
                  height: SIZES.width > 400 ? 250 : 170,
                  width: SIZES.width > 400 ? 300 : 200,
                  borderRadius: SIZES.padding,
                  marginTop: SIZES.base,
                  marginRight: SIZES.double,
                }}
                onPress={() => {
                  setNewsId(item.id);
                  navigation.navigate('NewsScreen');
                }}>
                {/* Backgorund Image */}

                <Image
                  source={{uri: item.image}}
                  resizeMode="cover"
                  style={{
                    height: SIZES.width > 400 ? 250 : 170,
                    width: SIZES.width > 400 ? 300 : 200,
                    borderRadius: SIZES.padding,
                  }}
                />

                {/* News Card Info */}

                <View
                  style={{
                    ...styles.cardStyle,
                    backgroundColor: COLORS.black,
                    opacity: 0.7,
                  }}>
                  {/* Details */}
                  <View style={{flex: 1}}>
                    {/* Name */}
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          width: '100%',
                          color: COLORS.white,
                          fontSize: 18,
                          fontFamily: 'Nunito-Bold',
                        }}>
                        {item.title.substring(0, 20)}...
                      </Text>
                    </View>

                    {/* Posted Info */}
                    <Text
                      style={{
                        color: COLORS.light,
                      }}>
                      {getDate(item.published)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.double,
    borderRadius: 12,
  },
});
