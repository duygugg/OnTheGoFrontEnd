import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants/index';
export default function HeaderTabs(props) {
  return (
    <View style={{flexDirection:"row",top:100,marginLeft:SIZES.padding*3}}>
      <HeaderButton
        text="Tümü"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="Geçişlerim"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="Otoyol"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}

const HeaderButton = props => {
  return (
    <TouchableOpacity 
    style={{marginRight:SIZES.padding*3}}
    
    onPress={() => props.setActiveTab(props.text)}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: props.activeTab == props.text ? '#333' : 'lightgray',
        }}>
        {props.text}
      </Text>
      {props.activeTab == props.text && (
        <View
          style={{
            position: 'absolute',
            left:0,
            right: 0,
            top: 30,
            height: 5,
            borderRadius:5,
            //borderTopRightRadius: 5,
            //borderTopLeftRadius: 5,
            backgroundColor: COLORS.neongreen,
          }}></View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
