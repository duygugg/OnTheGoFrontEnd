import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../../../constants/index';
import {SearchContext} from '../../../AuthContextProvider/SearchContext';

export default function QuestionContainer() {
  const [text, onChangeText] = React.useContext(SearchContext);

  // dummy data , needs to be replaced with FAQ data coming from db
  //(an api call to faq inquiry endpoint from db needs to be written and needs to be setted as data))
  const questions = [
    {
      id: 0,
      question:
        'Lorem ipsum dolor sit amet, consectetur adipisctis consectetur?',
      answer:
        'Phasellus aliquet rhoncus ipsum, ac lacinia nisl finibus sit amet. Phasellus at quam nunc. Nam libero urna, efficitur et arcu vitae, dapibus aliquam augue. Phasellus tempor metus vel elit pulvinar finibus a in felis. Sed sagittis eleifend nisi sit amet commodo. Aenean mattis, mauris id dignissim pretium, urna urna tempor ex, rutrum consequat nibh dolor quis magna. Sed at orci quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam nisi sapien, faucibus vel malesuada vel, congue in massa. Nullam erat magna, porta ac urna quis, dignissim suscipit libero.',
    },
    {
      id: 1,
      question:
        'War Lorem ipsum dolor sit amet, consectetur adipisctis consectetur?',
      answer:
        'Phasellus aliquet rhoncus ipsum, ac lacinia nisl finibus sit amet. Phasellus at quam nunc. Nam libero urna, efficitur et arcu vitae, dapibus aliquam augue. Phasellus tempor metus vel elit pulvinar finibus a in felis. Sed sagittis eleifend nisi sit amet commodo. Aenean mattis, mauris id dignissim pretium, urna urna tempor ex, rutrum consequat nibh dolor quis magna. Sed at orci quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam nisi sapien, faucibus vel malesuada vel, congue in massa. Nullam erat magna, porta ac urna quis, dignissim suscipit libero.',
    },
    {
      id: 2,
      question:
        'Love Lorem ipsum dolor sit amet, consectetur adipisctis consectetur?',
      answer:
        'Phasellus aliquet rhoncus ipsum, ac lacinia nisl finibus sit amet. Phasellus at quam nunc. Nam libero urna, efficitur et arcu vitae, dapibus aliquam augue. Phasellus tempor metus vel elit pulvinar finibus a in felis. Sed sagittis eleifend nisi sit amet commodo. Aenean mattis, mauris id dignissim pretium, urna urna tempor ex, rutrum consequat nibh dolor quis magna. Sed at orci quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam nisi sapien, faucibus vel malesuada vel, congue in massa. Nullam erat magna, porta ac urna quis, dignissim suscipit libero.',
    },
    {
      id: 3,
      question:
        'Lonely Lorem ipsum dolor sit amet, consectetur adipisctis consectetur?',
      answer:
        'Phasellus aliquet rhoncus ipsum, ac lacinia nisl finibus sit amet. Phasellus at quam nunc. Nam libero urna, efficitur et arcu vitae, dapibus aliquam augue. Phasellus tempor metus vel elit pulvinar finibus a in felis. Sed sagittis eleifend nisi sit amet commodo. Aenean mattis, mauris id dignissim pretium, urna urna tempor ex, rutrum consequat nibh dolor quis magna. Sed at orci quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam nisi sapien, faucibus vel malesuada vel, congue in massa. Nullam erat magna, porta ac urna quis, dignissim suscipit libero.',
    },
    {
      id: 4,
      question:
        'Honey Lorem ipsum dolor sit amet, consectetur adipisctis consectetur?',
      answer:
        'Phasellus aliquet rhoncus ipsum, ac lacinia nisl finibus sit amet. Phasellus at quam nunc. Nam libero urna, efficitur et arcu vitae, dapibus aliquam augue. Phasellus tempor metus vel elit pulvinar finibus a in felis. Sed sagittis eleifend nisi sit amet commodo. Aenean mattis, mauris id dignissim pretium, urna urna tempor ex, rutrum consequat nibh dolor quis magna. Sed at orci quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam nisi sapien, faucibus vel malesuada vel, congue in massa. Nullam erat magna, porta ac urna quis, dignissim suscipit libero.',
    },
    {
      id: 5,
      question:
        'Somewhere Lorem ipsum dolor sit amet, consectetur adipisctis consectetur?',
      answer:
        'Phasellus aliquet rhoncus ipsum, ac lacinia nisl finibus sit amet. Phasellus at quam nunc. Nam libero urna, efficitur et arcu vitae, dapibus aliquam augue. Phasellus tempor metus vel elit pulvinar finibus a in felis. Sed sagittis eleifend nisi sit amet commodo. Aenean mattis, mauris id dignissim pretium, urna urna tempor ex, rutrum consequat nibh dolor quis magna. Sed at orci quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam nisi sapien, faucibus vel malesuada vel, congue in massa. Nullam erat magna, porta ac urna quis, dignissim suscipit libero.',
    },
  ];

  const [detailClick, setDetailClick] = React.useState(
    new Array(questions.length).fill(false),
  );
  // Check out MyPlates.js getMapData() to re-contsruct db object into an array
  const handleDetailsChange = item => {
    id = item.id;
    const data = detailClick.map((item, index) =>
      id === index ? !item : item,
    );
    setDetailClick(data);
  };

  // based on input that user provides to search field, return the filtered data
  const getFilteredData = () => {
    let filteredData = questions;
    // if user entered an input, based on that search input filter the question data
    if (text != '') {
      let filteredData = questions.filter(function (item) {
        return item.question.includes(
          text ||
            text.charAt(0).toUpperCase() + text.slice(1) ||
            text.toUpperCase() ||
            text.toLowerCase(),
        );
      });
      return filteredData;
    } else {
      return filteredData;
    }
  };
  React.useEffect(() => {}, [text]);
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 20,
      }}>
        {/* questions displayed as list */}
      <FlatList
        data={getFilteredData().length > 0 ? getFilteredData() : questions}
        renderItem={({item}) => (
          <>
          {/* onPress update detailClick state of questions */}
            <TouchableOpacity
              style={styles.containerStyle}
              onPress={() => handleDetailsChange(item)}>
              <View style={{width: SIZES.width * 0.85}}>
                <Text style={styles.textStyle}>{item.question}</Text>
                {/* based on detailClick res, dispay the details of question context or not */}
                {detailClick[item.id] && (
                  <View style={{flex: 1, marginTop: 10, paddingBottom: 10}}>
                    <Text style={{fontSize: 18}}>{item.answer}</Text>
                  </View>
                )}
              </View>
                 {/* based on detailClick res, show arrow icons */}
              <Icon
                name={detailClick[item.id] ? 'up' : 'down'}
                size={20}
                color={'black'}
                style={{alignItems: 'center'}}
              />
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
                opacity: 0.85,
              }}></View>
          </>
        )}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    color: 'black',
    opacity: 0.8,
    fontWeight: '500',
  },
});
