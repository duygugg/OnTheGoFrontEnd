import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {LineChart, BarChart, StackedBarChart} from 'react-native-chart-kit';
import {COLORS, SIZES} from '../../constants';

export default function PassActivityPeriod() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [60, 45, 28, 80, 99, 43],
        colors: [
          (opacity = 1) => `${COLORS.royalblue}`,
          (opacity = 1) => `${COLORS.royalblue}`,
          (opacity = 1) => `${COLORS.royalblue}`,
          (opacity = 1) => `${COLORS.royalblue}`,
          (opacity = 1) => `${COLORS.royalblue}`,
          (opacity = 1) => `${COLORS.royalblue}`,
        ],
      },
    ],
  };
  return (
    <>
      <Text style={styles.header}>Bu Ay </Text>
      <Text style={styles.header}>Geçişlerim </Text>
      <Text style={[styles.header,{color:'black',left:30,top:30,fontWeight:'bold'}]}>60 Adet Geçiş </Text>
      
      <BarChart
        style={{
          marginLeft: 0,
          borderRadius: 25,
          paddingRight: 20,
          height: 280,
          width: SIZES.width / 1.2,
          top: 40,
        }}
        data={data}
        width={SIZES.width / 1.2}
        height={220}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientTo: 'white',
          backgroundGradientFromOpacity: 1,
          backgroundGradientFrom: 'white',
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `${COLORS.black}`,
          barPercentage: 0.58,
          barRadius: 2,
        }}
        withHorizontalLabels={false}
        fromZero={true}
        withCustomBarColorFromData={true}
        flatColor={true}
        withInnerLines={false}
        showBarTops={false}
        showValuesOnTopOfBars={false}
        verticalLabelRotation={0}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: '500',
    top: 20,
    left: 20,
    color:'lightgrey',
  },
});
