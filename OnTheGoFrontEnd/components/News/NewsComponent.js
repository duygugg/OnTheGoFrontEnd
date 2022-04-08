import {View, Text, Image} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import 'moment/locale/tr';
import {deviceLanguage} from '../../constants/index';
import {NewsDetailContext} from '../../ContextProvider/NewsDetailContext';

export default function NewsComponent(props) {
  const {selectedNewsDetails} = React.useContext(NewsDetailContext);
  const [newsDetail, setNewsDetail] = selectedNewsDetails;
  const newsObject = newsDetail.newsData; //newsDetail comes with loading and newsData info, so we extract newsData

  // Based on device's language, we format te date
  const getDate = datetime => {
    const date = moment(datetime)
      .locale(deviceLanguage)
      .format('DD MMMM YYYY ');
    return date.replace('-', ' ');
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {/* News Cover Image */}
      <View>
        <Image
          source={{uri: newsObject.image}}
          resizeMode="cover"
          style={{
            width: SIZES.width,
            height: SIZES.height / 3.5,
          }}
        />
      </View>
      {/* News Title */}
      <View
        style={{
          padding: SIZES.double,
        }}>
        <Text
          style={{
            fontSize: 22,
            color: '#333',
            fontWeight: '500',
          }}>
          {newsObject.title.charAt(0).toUpperCase() + newsObject.title.slice(1)}
        </Text>
      </View>

      {/* News Content */}
      <View
        style={{
          paddingLeft: SIZES.double * 1.5,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'gray',
          }}>
          {/* js operations to make the first character uppercase and 
          showing full text context of news content if user clicked read more(details) */}
          {props.readDetails
            ? newsObject.content.charAt(0).toUpperCase() +
              newsObject.content.slice(1)
            : newsObject.content.charAt(0).toUpperCase() +
              newsObject.content.slice(1).substring(0, 200) +
              '...'}
        </Text>
      </View>

      {/* News Footer  */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: SIZES.double,
        }}>
        {/* News Details Button */}
        <View>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: COLORS.themeblue,
              padding: SIZES.padding,
              paddingHorizontal: SIZES.double,
              flexDirection: 'row',
            }}
            onPress={() => props.setReadDetails(!props.readDetails)}>
            {!props.readDetails ? (
              <>
                <Text style={{color: 'white', right: SIZES.base}}>
                  Haberin Devamını Oku
                </Text>
                <Icon
                  style={{left: SIZES.base}}
                  name="down"
                  color={'white'}
                  size={18}
                />
              </>
            ) : (
              <>
                <Text style={{color: 'white', right: SIZES.base}}>Gizle</Text>
                <Icon
                  style={{left: SIZES.base}}
                  name="up"
                  color={'white'}
                  size={18}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
        {/* News Created Date Info */}
        <View>
          <Text>{getDate(newsObject.published)}</Text>
        </View>
      </View>
    </View>
  );
}
