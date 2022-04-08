import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {COLORS, SIZES} from '../../constants/index';
import Header from '../../components/Notifications/Header';
import moment from 'moment';
import 'moment/locale/tr';
import {SwipeListView} from 'react-native-swipe-list-view';
import axiosInstance from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableHighlight} from 'react-native-gesture-handler';
import images from '../../constants/images';
import {NotificationContext} from '../../AuthContextProvider/NotificationContext';
import ModalLoader from '../../components/Modal';
import {deviceLanguage} from '../../constants/index';
//import { getDeviceLocale } from "react-native-device-info";

export default function NotificationsView(props) {
  const [notifState, setNotifState] = React.useContext(NotificationContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [smth, setsmth] = useState();

  const [activeTab, setActiveTab] = useState('Tümü');

  // console.log('\n notif:', notifState.notifData, '\n');

  // api call to dleete selected notif, rowKey act as notif Id
  const handleDelete = async rowKey => {
    setNotifState({loading: true, notifData: notifState.notifData});
    await axiosInstance
      .delete(`notifications/delete/${rowKey}/`)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(data => {
        // make the api call to list all notif again since we've made change on it by performing successful deletion
        updateNotifData();
      })
      .catch(error => {
        // 401
        console.log('\nerror:', error); //Please Authenticate or whatever returned from server
      });
  };

  // makes an api call  to get list of current notifs
  const updateNotifData = async () => {
    const apiUrl = 'notifications/'; //needs to be applied only if OS == android
    await axiosInstance
      .get(apiUrl)
      .then(response => {
        // console.log('server notif response:', response.data);
        // console.log(typeof notifState, notifState);
        setNotifState({loading: false, notifData: response.data});
        console.log('updated data:\n', notifState.notifData);
      })
      .catch(err => console.log('error server:', err));
  };

  // whenever user clicks on a notification, we need to change the read field of notif by making api call to update it
  //it's bc of I've chosen to store read data in db,
  //however you can remove read field from db and store it to async storage if u wish
  //just make sure that you reflect those changes in this method and double check the read data's undefined status
  //since it takes a time to read a stored value from async storage
  const handleRead = async item => {
    setNotifState({loading: true, notifData: notifState.notifData});
    await axiosInstance
      .put(`notifications/update/${item.key}/`, {
        title: item.title,
        content: item.content,
        read: !item.read,
        receipent: item.receipent,
      })
      .then(response => {
        if (typeof notifState != 'undefined') {
          updateNotifData();
        }
      })
      .catch(error => {
        // 401
        console.log('\nerror happended:', error); //Please Authenticate or whatever returned from server
      });
  };

  // converting date to formatted version based on device lang
  const getDate = datetime => {
    let date = moment(datetime).locale(deviceLanguage)
    if (deviceLanguage == 'tr') {
      date = moment(datetime).locale(deviceLanguage).format('DD MMMM YYYY ');
    }

    return date.replace('-', ' ');
  };

  const getTime = datetime => {
    const date = moment(datetime).locale('tr').format(' hh:mm:ss ');
    return date.replace('-', ' ');
  };

  // to close the swiped container
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  // first close the row then call handDelete method to perform deletion
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    handleDelete(rowKey);
  };

  // content of swipeable container's swiped context (delete and close buttons which will be displayed only if 
  //container is swiped otherwise woudl stay as hidden)
  const HiddenItemWithActions = props => {
    const {onClose, onDelete} = props;
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 15,
          margin: 5,
          marginBottom: 15,
          borderRadius: 5,
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            bottom: 0,
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            width: 75,
            paddingRight: 17,
            backgroundColor: 'gray',
            right: 75,
          }}
          onPress={onClose}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Kapat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            bottom: 0,
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            width: 75,
            paddingRight: 27,
            backgroundColor: 'rgb(219, 57, 57)',
            right: 0,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
          onPress={onDelete}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Sil</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // notif container

  const renderItem = (data, rowMap) => {
    const item = data.item;
    return (
      // Notification Container
      <View
        style={{
          backgroundColor: item.read ? COLORS.light : COLORS.white,
          borderRadius: 5,
          flex: 1,
          margin: 5,
          marginBottom: 15,
          shadowColor: '#999',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}>
        <TouchableHighlight
          style={{
            backgroundColor: item.read ? COLORS.light : COLORS.white,
            borderRadius: 5,
            height: SIZES.width > 400 ? 200 : 120,
            padding: 10,
            marginBottom: 15,
          }}
          //onPress={() => handleRead( data.item)}
        >
          {/* when notif item is clicked call handleRead method */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}
            onPress={() => handleRead(item)}>
              {/*Notif container divided into three cols */}
              {/* 1st col that has image */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={images.notiflogo}
                style={{
                  width: SIZES.width > 400 ? 70 : 50,
                  height: SIZES.width > 400 ? 70 : 50,
                }}
                resizeMode="contain"
              />
            </View>
            {/* second col taht displays notif item title and content */}
            <View
              style={{
                position: 'absolute',
                left: SIZES.width > 400 ? 90 : 70,
                flex: 1,
                marginTop: SIZES.width > 400 ? 20 : 15,
                width:
                  SIZES.width > 400 ? SIZES.width - 150 : SIZES.width - 110,
              }}>
              <Text
                style={{
                  fontSize: SIZES.width > 400 ? 22 : 18,
                  fontWeight: 'bold',
                  marginBottom: 5,
                  color: '#666',
                }}
                numberOfLines={1}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: SIZES.width > 400 ? 18 : 14,
                  marginBottom: 5,
                  color: 'gray',
                }}>
                {item.content}
              </Text>
            </View>
            {/* 3rd col displays Notif date created info */}
            <View>
              <Text
                style={{
                  fontSize: SIZES.width > 400 ? 16 : 12,
                  color: '#999',
                }}
                numberOfLines={10}>
                {getDate(item.created_at)}
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableHighlight>
      </View>
    );
  };

  // mapping retrieved notif object 
  const getData = () => {
    if (typeof notifState != 'undefined' && notifState.notifData != null) {
      const data = notifState.notifData.map(notifItem => ({
        key: `${notifItem.id}`,
        title: notifItem.title,
        content: notifItem.content,
        published: notifItem.published,
        read: notifItem.read,
        receipent: notifItem.receipent,
        created_at: notifItem.created_at,
        category: notifItem.category,
      }));

      return data;
    }
  };

  // since user can navigate to filter tabs of notif based on notif category (tümü,otoyol,geçişler)
//what this method does is filtering the notifData based on its selected category by user
  const getFilteredData = () => {
    const data = getData();

    if (activeTab == 'Tümü') {
      return data;
    } else if (activeTab == 'Geçişlerim') {
      return data.filter(item => item.category == 2);
    }
    return data.filter(item => item.category == 3);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Header */}
      <Header
        navigation={props.navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Notifications List */}
      <View style={{flex: 1, top: SIZES.double}}>
        {typeof notifState.notifData != 'undefined' && notifState.notifData ? (
          // FlatList for swipeable container
          <SwipeListView
            data={getFilteredData()}
            renderHiddenItem={(data, rowMap) => (
              <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onClose={() => closeRow(rowMap, data.item.key)} //onPressedClose
                onDelete={() => deleteRow(rowMap, data.item.key)} //onPressedDelete
              />
            )}
            refreshing={notifState.loading}
            leftOpenValue={75}
            disableRightSwipe={true}
            rightOpenValue={-150} 
            renderItem={renderItem}></SwipeListView>
        ) : (
          <ModalLoader />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dateStyle: {
    fontSize: 20,
    color: '#333',
  },
  titleStyle: {
    color: '#333',
    fontSize: 18,
  },
});
