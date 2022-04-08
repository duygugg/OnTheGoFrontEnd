import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
//import React Native chart Kit for different kind of Chart
import {ProgressChart} from 'react-native-chart-kit';
import {SIZES, COLORS} from '../../constants/index';
import Svg, {Line, G} from 'react-native-svg';
export default function Highlights() {
  const cezaPercentage = 40; //for percentage <15, 15 will be taken as min
  //and for percentages >70, 70 will be taken as max value
  const ihlalliPercentage = 100 - cezaPercentage;
  const SVGHeight = SIZES.width;
  const SVGWidth = SIZES.width;

  console.log(SIZES.width);
  return (
    <View style={styles.container}>
      <View style={{flex: 1, maxWidth: SIZES.width / 1.1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{left: 20}}>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Highlights
            </Text>
          </View>
          <View
            style={{
              right: 20,
              width: 40,
              height: 40,
              borderRadius: 50,
              backgroundColor:
                cezaPercentage < ihlalliPercentage
                  ? COLORS.neongreen
                  : 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={
                cezaPercentage < ihlalliPercentage ? 'arrow-up' : 'arrow-down'
              }
              size={20}
              color="white"
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              left: 20,
              fontSize: 30,
              fontWeight: '500',
              color: 'black',
            }}>
            147
          </Text>
          <Text
            style={{
              left: 40,
              fontSize: 20,
              fontWeight: '500',
              color: 'lightgray',
              top: 10,
            }}>
            ihlalli geçiş/{new Date().getFullYear()}
          </Text>
        </View>

        <View
          flexDirection="row"
          style={{
            flex: 1,
            top: 5,
          }}>
          <Svg width={SVGWidth} height={SVGHeight}>
            <Line
              x1="10%" //left=10
              y1="50"
              x2={`${cezaPercentage}%`}
              y2="50"
              stroke="rgb(236, 77, 86)"
              strokeWidth="50"
              strokeLinecap="round"
            />
            <Text
              style={{
                left: SIZES.width>400?55:30,
                top: 32,
                fontSize: SIZES.width>400?22:18,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Cezalı
            </Text>
            <Line
              x1={`${cezaPercentage}%`}
              y1="50"
              x2={`${70}%`}
              y2="50"
              stroke="rgb(250, 196, 89)"
              strokeWidth="50"
              strokeLinecap="square"
            />
            <Text
              style={{
                left: SIZES.width>400?230:180,
                top: 5,
                fontSize: SIZES.width>400?22:18,
                fontWeight: 'bold',
                color: 'white',
              }}>
              İhlalli
            </Text>
            <Line
              x1={`${70}%`}
              y1="50"
              x2={`${75}%`}
              y2="50"
              stroke="rgb(250, 196, 89)"
              strokeWidth="50"
              strokeLinecap="round"
            />
            <View
              style={{
                flexDirection: 'row',
                width: 360,
                marginBottom: 10,
                top: 22,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  left: SIZES.width>400?70:40,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'rgb(236, 77, 86)',
                }}>
                {cezaPercentage}%
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'orange',
                  right: SIZES.width>400?70:120,
                }}>
                {ihlalliPercentage}%
              </Text>
            </View>
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: SIZES.width / 1.1,
    backgroundColor: 'white',
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
