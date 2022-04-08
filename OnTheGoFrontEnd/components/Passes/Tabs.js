import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/index';
export default function Tabs(props) {
  return (
    // We will have four tab buttons, therefore we will need 4 separete cols 
    <View
      style={{
        flexDirection: 'row',
        top: SIZES.base,
        marginLeft: SIZES.padding,
        justifyContent: 'center',
      }}>
      <HeaderButton
        text="Plaka No"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="TCKN"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="VKNN"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="IGB No"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}

// Tabs Button Component 
const HeaderButton = props => {
  return (
    <TouchableOpacity
      style={{
        marginRight: SIZES.padding,
        borderRadius: 25,
        // based on whether the active tab(tab is clicked by user) is equals to the specific header button
        backgroundColor: props.activeTab == props.text ? COLORS.royalblue : 'gray',
        padding: SIZES.padding,
        paddingHorizontal:SIZES.double,
      }}
      // update active tab whenever user clicks on tab 
      onPress={() => props.setActiveTab(props.text)}>
      <Text
        style={{
          fontSize: SIZES.width>400 ?15:12,
          color:'white'
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
