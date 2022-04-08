import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS,SIZES } from '../../constants/index';

export default function ResultsFilters(props) {
    
    return (
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ height: 100, marginTop: -12 }}>
            <View style={{
                flexDirection: 'row', flex: 1, justifyContent:'center', alignItems: 'center', marginLeft: 10
            }}>
               
                <View style={{ flexDirection: 'row', height: 50, alignItems: 'center',alignContent:'center',justifyContent:'center' }}>
                    <SearchFilterButton text='Trip Date' activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
                    <SearchFilterButton text='Total Cost' activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
                    <SearchFilterButton text='Payment Date' activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
                </View>
                <View style={{flexDirection:'row',height:300,backgroundColor:'pink'}}>

                </View>
            </View>
            
        </View>
       </ScrollView>
    )
}

const SearchFilterButton = (props) => {
    return (
        <TouchableOpacity
            style={{
                borderRadius: 10,
                backgroundColor: props.text == props.activeTab ? COLORS.themeblue : 'white',
                padding: 8,
                paddingHorizontal: 20,
                alignContent: 'center',
                marginRight: 10,
                elevation:5,

            }}
            onPress={() => props.setActiveTab(props.text)}

        >
            <Text style={{
                color: props.text == props.activeTab ? 'white' : 'black',
                fontWeight: props.text == props.activeTab ? '800' : '600'
            }}>
                {props.text}

            </Text>
        </TouchableOpacity>
    )
}