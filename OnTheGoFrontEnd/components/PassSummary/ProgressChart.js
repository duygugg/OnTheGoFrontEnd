import React from 'react';

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

//import React Native chart Kit for different kind of Chart
import {ProgressChart} from 'react-native-chart-kit';
import {SIZES, COLORS} from '../../constants/index';
import Svg, {Circle} from 'react-native-svg';

export default function ProgressChartComponent() {
  const size = SIZES.width / 2;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const svgProgress = 35; //remaining time (ödenmiş borçlar(geçişler)) diğer kalan 100-svgProgress=ihlalli borçlar

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={{textAlign: 'center', marginBottom: 20,fontSize:20,fontWeight: 'bold'}}>
          Geçiş Aktivitem
        </Text>
        <View flexDirection="row" style={{left: 20}}>
          <Svg height={size} width={size}>
            <Circle
              stroke={'lightgray'}
              fill="none"
              cy={size / 2}
              cx={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <Circle
              stroke={'rgb(47, 255, 50)'}
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
              strokeLinecap="round"
              transform={`rotate(90, ${size / 2}, ${size / 2})`}
              {...{strokeWidth}}
            />
          </Svg>
          <View
            style={{
              height: 60,
              width: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              backgroundColor: 'white',
              elevation: 6,
              right: SIZES.width>400?215:170,
              top: 80,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: COLORS.neongreen,
              }}>
              %{100 - svgProgress}
            </Text>
          </View>

          <View
            style={{
              height: 60,
              width: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              backgroundColor: 'white',
              elevation: 6,
              right: 105,
              top: 30,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: 'gray',
              }}>
              %{svgProgress}
            </Text>
          </View>

          <View
            style={{
              height: 60,
              width: 20,
              backgroundColor: 'rgb(47, 255, 50)',
              flexDirection: 'column',
              right: 100,
              top: 150,
            }}>
              <Text style={{top:70,textAlign: 'center',width: 60,right:20}}>İhlalli</Text>
            </View>
          <View
            style={{
              height: 60,
              width: 20,
              backgroundColor: 'lightgray',
              flexDirection: 'column',
              right: SIZES.width>1200?50:60,
              top: 150,
            }}>
               <Text style={{top:70,textAlign: 'center',width: 60,right:20}}>Ödenmiş</Text>
            </View>
        </View>
      </View>

      {/* <ProgressChart
        data={{labels:["İhalli Geçişler", "Geçişler"],data: [0.65, 0.35]}}
        width={Dimensions.get('window').width / 1.2}
        height={200}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(47, 195, 50, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
         
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: SIZES.width / 1.1,
    backgroundColor: 'white',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    borderRadius: 25,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.neongreen,
  },
});
