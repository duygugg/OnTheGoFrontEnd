import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {COLORS, SIZES} from '../../constants/index';
import Header from '../../components/PassSummary/Header';
import images from '../../constants/images';
import PopularRoutes from '../../components/PassSummary/PopularRoutes';
import ProgressChartComponent from '../../components/PassSummary/ProgressChart';
import PassActivityPeriod from '../../components/PassSummary/PassActivityPeriod';
import Highlights from '../../components/PassSummary/Highlights';
import PopularVehicles from '../../components/PassSummary/PopularVehicles';

export default function MyPassActivitySummary(props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header navigation={props.navigation} />
      {/* Content */}
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
          }}>
          {/* Profile container */}
          <View
            style={{
              // backgroundColor: 'white',
              width: SIZES.width,
              justifyContent: 'center',
              alignItems: 'center',
              top: 10,
            }}>
            {/* Profile frame*/}
            <View style={[styles.profileImgContainer]}>
              {/* Profile photo */}
              <View style={styles.imageContainerStyle}>
                <Image
                  resizeMode="cover"
                  style={styles.imageStyle}
                  source={images.profileImg}
                />
              </View>
            </View>
          </View>

          {/* popular routes container */}
          <View style={{marginTop: 15}}>
            <PopularRoutes />
          </View>
          {/* pass activity progress ring */}
          <View style={{marginTop: 15, marginBottom: 20}}>
            <ProgressChartComponent />
          </View>
          {/* Pass Activity Bar Chart */}
          <View
            style={{
              marginTop: 15,
              marginBottom: 20,
              backgroundColor: 'white',
              borderRadius: 25,
            }}>
            <PassActivityPeriod />
          </View>

          <View
            style={{
              marginTop: 15,
              marginBottom: 20
            }}>
            <Highlights />
          </View>
          {/* Popular vehicles section */}
          {/* <View
            style={{
              marginTop: 15,
              marginBottom: 20
            }}>
              <PopularVehicles />
          
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(228, 241, 254)',
  },
  profileImgContainer: {
    backgroundColor: COLORS.white,
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  imageContainerStyle: {
    height: 120,
    width: 120,
    backgroundColor: 'white',
    borderRadius: 75,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 75,
  },
});
