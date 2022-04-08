import {View, Text,TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';
import {COLORS, SIZES} from '../../constants/index';

export default function Header(props) {
    const route = useRoute();

  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: SIZES.double*2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        
      }}>
      {/* Back button */}
      <View style={{position: 'absolute',left:SIZES.double}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => props.navigation.goBack()}>
          <Icon name="left" size={25} />
          <Text style={{fontSize:18}}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View >
        <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{route.name}</Text>
      </View>
    </View>
  );
}
