import {View, Text, Image, SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS, deviceLanguage, SIZES} from '../../constants/index';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import 'moment/locale/tr';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NewsContext} from '../../ContextProvider/NewsContext';
import {NewsDetailContext} from '../../ContextProvider/NewsDetailContext';

export default function NewsFeed(props) {
  const [news, setNews] = React.useContext(NewsContext);
  const {selectedNews} =
    React.useContext(NewsDetailContext);
  const [newsId, setNewsId] = selectedNews;

  // formatting the data based on deviceLanguage
  const getDate = datetime => {
    let date = moment(datetime).locale(deviceLanguage);
    if (deviceLanguage == 'tr') {
      date = date.format('DD.MM.YY');
    }
    return date;
  };

  return (
    // News Feed Container
    <SafeAreaView>
      {/* Mapping each news object in news, similar to what flatlist does, so that we can list them */}
      {news.newsData.map(item => (
        // for each container that belongs to single news object,
        //we want to set selected news id whenever this news item is clicked
        //we also want to navigate user to this news item's own screen so that user can see details of this item
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            // api call in context only works whenever newsId has been updated
            //so we set news id first before navigating user to news screen
            setNewsId(item.id);
            props.navigation.navigate('NewsScreen');
          }}
          style={{
            flex: 1,
            elevation: 8,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            marginVertical: 10,
            marginHorizontal: 10,
            paddingHorizontal: SIZES.width > 400 ? 30 : 15,
          }}>
          {/* News Feed Container Division into two cols */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* 1st COL -> News Image  */}
            <View
              style={{
                borderRadius: 10,
              }}>
              <Image
                source={{uri: item.image}}
                resizeMode="cover"
                style={{
                  width: SIZES.width > 400 ? 100 : 80,
                  height: SIZES.width > 400 ? 80 : 70,
                  borderRadius: 10,
                }}
              />
            </View>

            {/* 2nd COL-> News Title,Date published and time to read info */}
            <View
              style={{
                marginLeft: 20,

                paddingVertical: 10,
                marginRight: 20,
              }}>
                {/* News title */}
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  flexShrink: 1,
                  flexWrap: 'wrap',
                }}>
                {SIZES.width > 400
                  ? item.title.substring(0, 20) 
                  : item.title.substring(0, 15)}
                ...
              </Text>
              {/* date published info */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexShrink: 1,
                  flexWrap: 'wrap',
                  marginVertical: 20,
                }}>
                <Text style={{paddingRight: 20}}>
                  {getDate(item.published)}
                </Text>
                {/* time to read info */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Icon name="clockcircleo" size={16}  />
                  <Text style={{paddingLeft: 10}}>10 min</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}
