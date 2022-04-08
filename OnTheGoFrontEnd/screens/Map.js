import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import Header from '../components/Header';

export default function Map(props) {
  return (
    <>
      <Header navigation={props.navigation} />

      <WebView
        source={{
          uri: 'https://harita.avrupaotoyolisletmesi.com/',
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
