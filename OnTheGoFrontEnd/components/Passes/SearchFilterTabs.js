import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants/index';

export default function SearchFilterTabs(props) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 10,
        }}>
        <ContinentFilterButton
          text={'Avrupa'}
          activeTab2={props.activeTab2}
          setActiveTab2={props.setActiveTab2}
          notif = {props.notif}
        />
        <ContinentFilterButton
          text={'Asya'}
          activeTab2={props.activeTab2}
          setActiveTab2={props.setActiveTab2}
          notif={props.notif}
        />
      </View>
    </View>
  );
}

const ContinentFilterButton = props => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity
        style={{
          borderRadius: 30,
          backgroundColor:
            props.text == props.activeTab2
              ? COLORS.neongreen
              : 'rgba(187, 187, 187, 0.44)',
          padding: 15,
          paddingHorizontal: SIZES.width>1200 ? 45 :SIZES.width>900 ? 38:35,
          alignContent: 'center',
          marginRight: 20,
          marginLeft: 20,
        }}
        onPress={() => props.setActiveTab2(props.text)}>
        <Text
          style={{
            color: props.text == props.activeTab2 ? 'white' : 'green',
            fontWeight: props.text == props.activeTab2 ? '800' : '500',
          }}>
          {props.text}
        </Text>
      </TouchableOpacity>

      {props.text === props.activeTab2 && (
        <View
          style={{
            height: 27,
            width: 27,
            backgroundColor: 'red',
            alignItems: 'center',
            borderRadius: 50,
            right: 35,
          }}>
          <Text style={{color: COLORS.white, fontWeight: 'bold',top:3}}>{props.notif}</Text>
        </View>
      )}
    </View>
  );
};
