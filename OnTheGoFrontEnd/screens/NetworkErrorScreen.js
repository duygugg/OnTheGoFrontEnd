import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {DebtPassContext} from '../ContextProvider/DebtPassContext';
import {COLORS, SIZES} from '../constants/index';
import LottieView from 'lottie-react-native';
import {NewsContext} from '../ContextProvider/NewsContext';
export default function NetworkErrorScreen(props) {
  const {PassData, plateData} = React.useContext(DebtPassContext);
  const [DebtPasses, setDebtPasses] = PassData;
  const [news, setNews] = React.useContext(NewsContext);

  React.useEffect(() => {
    console.log('\nreload', news.reload);
    if (DebtPasses.fetching) {
      console.log('from vehicle screen:', DebtPasses.fetching);
      //props.navigation.navigate('DebtPassesResults')
      if (news.reload) {
        props.navigation.push('MainHome', {screen: 'HomeScreen'});
      }
    }
  }, [DebtPasses.fetching, news.reload]);

  return (
    <View
      style={{
        justifyContent: 'center',
        height: SIZES.height,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          marginTop: SIZES.height / 20,
          height: SIZES.height * 0.4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../assets/animations/89809-no-result-green-theme.json')}
          autoPlay
          loop
          style={{height: SIZES.height * 0.35, width: SIZES.width * 0.35}}
        />
      </View>
      <View
        style={{
          paddingBottom: SIZES.height / 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderColor: COLORS.themegreen,
            borderWidth: 2,
            alignItems: 'center',
            borderRadius: 15,
            width: SIZES.width / 1.2,
            paddingHorizontal: 20,
            paddingVertical: 20,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', textAlign: 'center'}}>
            {DebtPasses.error.includes('JSON Parse')
              ? 'Sorgulama kriterine ait borç bulunamamıştır.'
              : 'İnternet bağlantında bir sorun var, lütfen kontrol et.'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setNews({loading: true, newsData: null, reload: true});
          }}
          style={{
            borderRadius: 15,
            paddingHorizontal: 15,
            padding: 15,
            backgroundColor: COLORS.neongreen,
            paddingHorizontal: 20,
            marginTop: SIZES.height / 12,
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.height * 0.025,
              fontWeight: 'bold',
            }}>
            {DebtPasses.error.includes('JSON Parse')
              ? 'Yeniden Sorgulama Yap'
              : 'Tekrar Dene'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
