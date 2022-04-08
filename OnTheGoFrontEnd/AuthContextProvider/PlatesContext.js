import React, {useContext, useEffect, useState} from 'react';
import axiosInstance from '../axios';

export const PlatesContext = React.createContext();

const PlatesProvider = props => {
  const [plates, setPlates] = React.useState({
    loading: true,
    data: null,
    error: false,
  });
  const [updated, setUpdated] = React.useState(false);

  const getPlateData = async () => {
    console.log('loading..');

    setPlates({loading: true, data: null, error: false});
    const apiUrl = 'getPlates/';
    const res = await axiosInstance
      .get(apiUrl)
      .then(response => {
        console.log('context res:', response.data);
        setPlates({loading: false, data: response.data, error: false});
      })
      .catch(err => {
        console.log('error server fetch:', err);
        setPlates({loading: false, data: null, error: true});
      });
    print(":",res)
    return res
  };

  React.useEffect(() => {
    getPlateData();

  }, []);

  // React.useEffect(() => {
  //   if (updated) {
  //     console.log('updated from context');
  //     getPlateData();

  //   }
  // }, [updated]);

  return (
    <PlatesContext.Provider
      value={{
        plateDataa: [plates, setPlates],
        updateData: [updated, setUpdated],
      }}>
      {props.children}
    </PlatesContext.Provider>
  );
};

export default PlatesProvider;
