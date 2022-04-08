import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/Profile/FAQ//SearchBar';
import QuestionContainer from '../../components/Profile/FAQ/QuestionContainer';

export default function FAQ(props) {

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      {/* Search Bar for the question topics */}
      <SearchBar />
      {/* Question Topics List */}
      <QuestionContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
