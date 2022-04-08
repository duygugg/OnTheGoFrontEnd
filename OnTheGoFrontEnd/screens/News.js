import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/News/Header';
import NewsComponent from '../components/News/NewsComponent';
import NewsFeed from '../components/News/NewsFeed';
import {NewsDetailContext} from '../ContextProvider/NewsDetailContext';
import LottieView from 'lottie-react-native';
import {SIZES} from '../constants/index';

export default function News(props) {
  const [readMore, setReadMore] = useState(false); //hook for managing showing full text of news content
  const {selectedNewsDetails, selectedNews} =
    React.useContext(NewsDetailContext); //api call where we retrieve specific news detail by its id its handled by context
  const [newsDetail, setNewsDetail] = selectedNewsDetails; //specific news object
  const [newsId, setNewsId] = selectedNews; //id of this specific news object

  React.useEffect(() => {
    console.log('news clicked page:', newsId);
  }, [newsId]);

  // Loader that'll be shown till news are loaded
  const Loader = () => {
    return (
      <View
        style={{
          height: SIZES.height,
          width: SIZES.width,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFF',
        }}>
        <LottieView
          source={require('../assets/animations/8428-loader.json')}
          autoPlay
          loop
          style={{height: SIZES.height * 0.35, width: SIZES.width * 0.35}}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={true}>
        <View style={{flex: 1}}>
          <Header navigation={props.navigation} />
        </View>
        <View style={{flex: 1}}>
          {/* if news are not loaded yet(api call still is fetching the data no response yet) then show loader */}
          {newsDetail.loading ? (
            <Loader />
          ) : (
            <View>
              {/* News Component that takes readMore and setReadMore states as props */}
              {/* This component is therefore for single news object, since we display all news objects on home page 
              and through a click to one of these objects on home, lead us to this News.js page which at the end 
              shows a NewsComponent which displays a clicked news object's info*/}
              <NewsComponent
                readDetails={readMore}
                setReadDetails={setReadMore}
              />
              <View style={{marginTop: 30}}>
                {/*Rest of the news listed as feed so that user can navigate through the page of the specific news that they want to read or check it out */}
                <NewsFeed navigation={props.navigation} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
