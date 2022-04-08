import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Header from '../../components/Header';
import {COLORS, SIZES} from '../../constants/index';
import LottieView from 'lottie-react-native';
import SearchFilterTabs from '../../components/Passes/SearchFilterTabs';
import PassContainer from '../../components/DebtPasses/PassContainer';
import {PassContext} from '../../AuthContextProvider/PassContext';
import {useIsFocused} from '@react-navigation/native';
import NoResult from '../../components/DebtPasses/NoResult';

export default function PassInquiryResults(props) {
  //listing filters
  const [activeFilter2, setActiveFilter2] = useState('Avrupa');
  const {PassData, plateData} = React.useContext(PassContext);
  const [Passes, setPasses] = PassData;
  const [results, setResults] = useState({data: null, text: null});


  const isFocused = useIsFocused();

  useEffect(() => {
    setResults({data: null, text: null});
    console.log('results:', Passes.fetching);
  }, [isFocused]);

  useEffect(() => {
    if (!Passes.loading && Passes.fetching && Passes.EuropeData != null) {
      setResults({data: Passes.EuropeData, text: 'Avrupa'});
    } else if (!Passes.fetching && !Passes.loading) {
      setResults({data: null, text: null});
    }
  }, [Passes.loading, Passes.fetching]);

  useEffect(() => {
    handle();
    //console.log('filter changed:', activeFilter2);
  }, [activeFilter2]);

  const handle = () => {
    if (activeFilter2 == 'Avrupa') {
      //console.log('avrupa');
      setResults({data: Passes.EuropeData, text: 'Avrupa'});
    } else {
      //console.log('asia');
      setResults({data: Passes.AsiaData, text: 'Asya'});
    }
  };

  const HeaderContent = () => {
    return (
      <>
        <Header navigation={props.navigation} />
        <SearchFilterTabs
          activeTab2={activeFilter2}
          setActiveTab2={setActiveFilter2}
          notif={results.data != null ? results.data.length : 0}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '75%',
            left: 20,
          }}>
          <Text style={{color: COLORS.neongreen, fontWeight: 'bold'}}>
            Anadolu Otoyolu İşletmesinden Yapmış Olduğunuz{' '}
            {results.data != null ? results.data.length : 0} Adet Geçişiniz
            Bulunmaktadır
          </Text>
        </View>
      </>
    );
  };

  const FooterContent = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
        }}></View>
    );
  };

  if (Passes.loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFF',
        }}>
        <LottieView
          source={require('../../assets/animations/8428-loader.json')}
          autoPlay
          loop
          style={{height: SIZES.height * 0.35, width: SIZES.width * 0.35}}
        />
      </View>
    );
  }
  return (
    <View
      style={{
        backgroundColor: 'white',
        justifyContent: 'center',
        backgroundColor: '#FFFF',
        alignItems: 'center',
        flex: 1,
      }}>
      {!Passes.fetching ? (
        <SafeAreaView>
          {typeof results.data != 'undefined' && results.data != null ? (
            <FlatList
              data={results.data} //check filterBy method it returns sorted data (trip data as an initial sorting parameter )
              ListHeaderComponent={HeaderContent}
              ListFooterComponent={FooterContent}
              renderItem={({item}) => (
                <PassContainer
                  item={item}
                  key={results.data?.id}
                  length={results.data?.length}
                  navigation={props.navigation}
                />
              )}></FlatList>
          ) : (
            <View>
              <HeaderContent />
              <View
                style={{
                  marginTop: SIZES.height / 20,
                  height: SIZES.height * 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LottieView
                  source={require('../../assets/animations/89809-no-result-green-theme.json')}
                  autoPlay
                  loop
                  style={{
                    height: SIZES.height * 0.35,
                    width: SIZES.width * 0.35,
                  }}
                />
                <Text style={{color: 'black', textAlign: 'center'}}>
                  {activeFilter2} yakasına ait hiçbir ihlalli geçişiniz
                  bulunamamıştır
                </Text>
              </View>
              <FooterContent />
            </View>
          )}
        </SafeAreaView>
      ) : (
        // WHEN SMTH WENT WRONG ON BACKEND SIDE BUT API CALL HAS ENDED
        //error component as WHOLE
        <NoResult
          navigation={props.navigation}
          setResults={setResults}
          text={'İnternet bağlantında bir sorun var, lütfen kontrol et.'}
        />
      )}
    </View>
  );
}
