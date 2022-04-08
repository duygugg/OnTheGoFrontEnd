import React from 'react';
import axiosInstance from '../axios';

export const NotificationContext = React.createContext();

const NotificationProvider = (props) => {
  const [notifState, setNotifState] = React.useState({
    loading: true,
    notifData: null,
  });

  const getNotifData = async () => {
    setNotifState({loading: true, notifData:null});
    const apiUrl = 'notifications/'; //needs to be applied only if OS == android
    await axiosInstance
      .get(apiUrl)
      .then(response => {
        //console.log('notif ok:', response.data);
        setNotifState({loading: false, notifData: response.data});
      })
      .catch(err => console.log('error server notif:', err));
  };

  React.useEffect(() => {
    getNotifData();
  }, []);

  return (
    <NotificationContext.Provider value={[notifState, setNotifState]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
