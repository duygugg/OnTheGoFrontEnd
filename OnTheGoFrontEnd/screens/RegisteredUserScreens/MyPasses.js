import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import Tabs from '../../components/Passes/Tabs';
import SearchBar from '../../components/Passes/SearchBar';
import images from '../../constants/images';
import {COLORS, SIZES} from '../../constants/index';
import HowTo from '../../components/Passes/HowTo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PlatesContext} from '../../AuthContextProvider/PlatesContext';
import LottieView from 'lottie-react-native';

export default function MyPasses(props) {
  // const sheetRef = React.createRef()
  const [activeTab, setActiveTab] = useState('Plaka No');
  const [visible, setVisible] = useState(true);
  const {plateDataa} = React.useContext(PlatesContext);
  const [plates, setPlates] = plateDataa;

  return (
    <View>
      <Header navigation={props.navigation} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {plates.loading ? (
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
      ) : (
        <SearchBar navigation={props.navigation} />
      )}
      <View style={{marginTop: 60, height: '90%', width: '100%'}}>
        <Image
          style={{height: SIZES.height, width: SIZES.width}}
          resizeMode="cover"
          source={images.passImage}
        />
      </View>
      {visible ? (
        // bottomview that shows how to add plates from where
        <HowTo visible={visible} setVisible={setVisible} />
      ) : (
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 24,
            justifyContent: 'center',
            backgroundColor: 'lightgray',
          }}></TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
