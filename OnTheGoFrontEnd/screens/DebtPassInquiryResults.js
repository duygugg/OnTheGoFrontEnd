import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Header from '../components/Header';
import {COLORS, SIZES} from '../constants/index';
import LottieView from 'lottie-react-native';
import SearchFilterTabs from '../components/Passes/SearchFilterTabs';
import PassContainer from '../components/DebtPasses/PassContainer';
import {DebtPassContext} from '../ContextProvider/DebtPassContext';
import {useIsFocused} from '@react-navigation/native';
import ResultsFilters from '../components/DebtPasses/ResultsFilters';
import NoResult from '../components/DebtPasses/NoResult';

export default function DebtPassInquiryResults(props) {
  //listing filters
  const [activeTab, setActiveTab] = useState('Trip Date');
  const [activeFilter2, setActiveFilter2] = useState('Avrupa');

  // Pass data retrieved from backend api
  const {PassData, plateData, totalData} = React.useContext(DebtPassContext);
  const [DebtPasses, setDebtPasses] = PassData;
  const [results, setResults] = useState({data: null, text: null});
  const [loading, setLoading] = useState(true); //main loader that will be updated whenever debtPass data from context provider has been loaded
  const [plateNo, setPlateNo] = plateData;
  const [total, setTotal] = totalData;

  useEffect(() => {
    console.log('dlfl:', loading);
    //context will make a call to backend as long as plateNo!=null so each time plateNo is changed, we need to reset everythinhg
    //so that we can make a call to backend again and retrieve the debt pass data
    if (plateNo != null) {
      setResults({data: null, text: null});
      //LOADER OF THE SCREEN NOT DEPENDENT TO DEBT PASS CONTEXT
      setTotal(0);
    }
  }, [plateNo]);

  useEffect(() => {
    console.log(
      '2:',
      DebtPasses.loading,
      DebtPasses.fetching,
      results.text,
      results.data,
    );
    // API CALL HAS ENDED AND BACKEND RETURNED A VALID RESPONSE

    if (!DebtPasses.loading && DebtPasses.fetching) {
      // IF EUROPE PASS DATA IS VALID

      if (DebtPasses.EuropeData != null) {
        setResults({data: DebtPasses.EuropeData, text: 'Avrupa'});

        //IF EUROPE PASS DATA DOES NO EXIST BUT ASIA DOES
      } else if (DebtPasses.AsiaData != null) {
        setResults({data: DebtPasses.AsiaData, text: 'Asya'});
        //SO THAT WHEN RESULTS SCREEN OPENS, ONLY FILTER OPTION ASIA IS DISPLAYED
        setActiveFilter2('Asya');
        //WHEN DATA BELONGS TO BOTH OF THE CONTINENT DOES NOT EXIST
      } else {
        setResults({data: null, text: null});
      }
      // Api call has handed but smth went wrong on backend side
    } else if (!DebtPasses.fetching && !DebtPasses.loading) {
      setResults({data: null, text: null});
    }
  }, [DebtPasses.loading, DebtPasses.fetching]);

  // useEffect(() => {
  //   console.log('\nlaoding:', loading);
  // }, [loading]);

  useEffect(() => {
    handle(); //WHEN USER CLIKS TO TABS, it changes results state so that filters can be applied

    //console.log('filter changed:', activeFilter2);
  }, [activeFilter2]);

  const handle = () => {
    if (activeFilter2 == 'Avrupa') {
      //console.log('avrupa');
      setResults({data: DebtPasses.EuropeData, text: 'Avrupa'});
    } else {
      //console.log('asia');
      setResults({data: DebtPasses.AsiaData, text: 'Asya'});
    }
  };

  useEffect(() => {
    console.log('hy', DebtPasses.fetching, results);
    if (!DebtPasses.loading) {
      let timerFunc = setTimeout(() => {
        setLoading(false);
      }, 10000);
      return clearTimeout(timerFunc);
    }
  }, [DebtPasses.loading]);

  const filterby = () => {
    var data = [];

    if (activeTab == 'Payment Date') {
      data = results.data?.sort(
        (item1, item2) =>
          new Date(item1.last_payment_date) - new Date(item2.last_payment_date),
      );
    } else if (activeTab == 'Total Cost') {
      data = results.data?.sort(
        (item1, item2) => Number(item2.total_cost) - Number(item1.total_cost),
      );
      // Pass Date
    } else {
      data = results.data?.sort(
        (item1, item2) => new Date(item2.exit_date) - new Date(item1.exit_date), //trip data
      );
    }

    return data;
  };
  const totalState = () => {
    var num = Number(0);
    console.log(typeof total, isNaN(total));

    if (total == num || isNaN(total)) {
      return false;
    } else {
      return true;
    }
  };
  const HeaderContent = () => {
    return (
      <>
        <Header navigation={props.navigation} />
        <SearchFilterTabs
          activeTab2={activeFilter2} //europe or asia filter states
          setActiveTab2={setActiveFilter2}
          notif={results.data != null ? results.data.length : 0}
        />
        {/* sorting states of trip date,total cost and payment date */}
        <ResultsFilters activeTab={activeTab} setActiveTab={setActiveTab} />

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

  if (DebtPasses.loading) {
    return (
      <View
        style={{
          flex: 1,
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
      {/* API CALL HAS ENDED AND A VALID PASS DATA IS RECEIVED */}
      {/* results.text being checked whether its value equalts to filter value of europe and asia filters */}
      {DebtPasses.fetching ? (
        <SafeAreaView>
          {results.data != null ? (
            <FlatList
              data={filterby()} //check filterBy method it returns sorted data (trip data as an initial sorting parameter )
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
          ) : 
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
                  source={require('../assets/animations/89809-no-result-green-theme.json')}
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
          }
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
      {/* ıf any of the passes are selected, meaning TOTAL WOULD BE DIFF THAN ZERO, THEN SHOW TOTAL PASS SELECTEDT COMPONENT*/}
      {totalState() && (
        <View
          style={{
            backgroundColor: 'lightgray',
            height: 150,
            width: SIZES.width,
            top: -30,
            borderRadius: 50,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingLeft: 10,
            }}>
            <View style={{marginTop: 30, alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: SIZES.width > 1200 ? 20 : 18,
                  color: 'black',
                  fontWeight: '600',
                }}>
                TOTAL COST
              </Text>
              <Text
                style={{
                  fontSize: SIZES.width > 1200 ? 22 : 20,
                  color: 'black',
                  fontWeight: '800',
                }}>
                {total}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                borderRadius: 25,
                backgroundColor: 'rgba(74, 220, 106, 1)',
                paddingVertical: SIZES.width > 1200 ? 20 : 10,
                paddingHorizontal: 15,
                justifyContent: 'center',
                marginTop: 30,
              }}
              onPress={() =>
                props.navigation.navigate('PaymentPreviewScreen', {})
              }>
              <Text
                style={{
                  fontSize: SIZES.width > 1200 ? 16 : 14,
                  textAlign: 'center',
                  fontWeight: '500',
                  color: 'white',
                }}>
                Make Payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
