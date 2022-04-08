import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/index';
export default function PopularVehicles() {
  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
        Populer Araçlarım
      </Text>
      <View style={styles.innerContainer}></View>
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
    padding: 30,
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
  innerContainer: {
    backgroundColor: 'rgb(208, 241, 254)',
    borderRadius: 25,
    padding: 20,
    width: '100%',
    height: '80%',
    top:20,
    elevation:2
  },
});
