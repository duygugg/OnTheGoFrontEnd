import React from 'react';
import axiosInstance from '../axios';

export const PassContext = React.createContext();

const PassProvider = props => {
  const [Passes, setPasses] = React.useState({
    loading: true,
    EuropeData: null,
    AsiaData: null,
    fetching: true,
  });

  const [plateNo, setPlateNo] = React.useState(null);
  const [ownerDate, setOwnerDate] = React.useState(null);

  const InquiryPassData = async () => {
    console.log('plate changed:', plateNo);
    setPasses({
      loading: true,
      EuropeData: null,
      AsiaData: null,
      fetching: true,
    });
    console.log('api date:', ownerDate);

    await axiosInstance
      .get(`passes/${plateNo}`, {
        params: {
          owner_start_date: ownerDate,
        },
      })
      .then(response => {
        console.log(response.data);
        console.log(typeof response.data);

        setPasses({
          loading: false,
          EuropeData: response.data[0]['Avrupa'],
          AsiaData: response.data[1]['Asya'],
          fetching: true,
        });
      })
      .catch(err => {
        setPasses({
          loading: false,
          EuropeData: null,
          AsiaData: null,
          fetching: false,
        });
        console.log('\nSomething went wrong fetching the data:\n', err.message);
      });
  };

  React.useEffect(() => {
    if (plateNo !== null && ownerDate != null) {
      InquiryPassData();
    }
  }, [plateNo, ownerDate]);

  return (
    <PassContext.Provider
      value={{
        PassData: [Passes, setPasses],
        plateData: [plateNo, setPlateNo],
        ownerDateData: [ownerDate, setOwnerDate],
      }}>
      {props.children}
    </PassContext.Provider>
  );
};

export default PassProvider;
