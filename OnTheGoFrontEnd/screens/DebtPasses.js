import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import Tabs from '../components/Passes/Tabs';
import SearchBar from '../components/DebtPasses/SearchBar';
import images from '../constants/images';
import {COLORS, SIZES} from '../constants/index';
import {DebtPassContext} from '../ContextProvider/DebtPassContext';

export default function DebtPasses(props) {
  const [activeTab, setActiveTab] = useState('Plaka No');

  return (
    <View>
      <Header navigation={props.navigation} />
      {/* Plate no, tckn,vkn and igb no inquiry options are listed using custom Tabs component */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Search Bar which handles getting input data from user and setting it so that inquiries can be made using this data */}
      <SearchBar navigation={props.navigation} />

      {/* Image Container */}
      <View style={{marginTop: 60, height: '90%', width: '100%'}}>
        <Image
          style={{height: SIZES.height, width: SIZES.width}}
          resizeMode="cover"
          source={images.passImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
