import React from 'react';
import {JumpingTransition} from 'react-native-reanimated';
import axiosInstance from '../axios';

export const DebtPassContext = React.createContext();

const DebtPassProvider = props => {
  const [DebtPasses, setDebtPasses] = React.useState({
    loading: true,
    EuropeData: null,
    AsiaData: null,
    fetching: true, //fetched
    error: 'None',
  });

  const [total, setTotal] = React.useState(0);

  const [plateNo, setPlateNo] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState({
    myArray: [],
    itemDeleted: null,
  });

  const DebtInquiryPassData = async () => {
    console.log('query started with parameter:', plateNo);
    let controller = new AbortController();
    setDebtPasses({
      loading: true,
      EuropeData: null,
      AsiaData: null,
      fetching: true,
      error: null,
    });


    await fetch(`http://10.0.2.2:8000/api/debt/${plateNo}/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // timeout: setTimeout(() => controller.abort(), 3000),
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(response => {
        console.log('fetch working',  response[0]['Avrupa']);
        setDebtPasses({
          loading: false,
          EuropeData:
          // response[0]['Avrupa'],
            response[0]['Avrupa'] != null
              ? response[0]['Avrupa'].filter(
                  item => item.exit_station != 'Bilinmiyor',
                )
              : response[0]['Avrupa'],
          AsiaData:
          // response[1]['Asya'],
            response[1]['Asya'] != null
              ? response[1]['Asya'].filter(
                  item => item.exit_station != 'Bilinmiyor',
                )
              : response[1]['Asya'],

          fetching: true, //FETCHED DATA
          error: 'None',
        });
      })
      .catch(err => {
        console.log('\nSomething went wrong fetching the data:\n', err.message);
        setDebtPasses({
          loading: false,
          EuropeData: null,
          AsiaData: null,
          fetching: false,
          error: err.message,
        });
      });
    // console.log('debt:', debt);
  };

  React.useEffect(() => {
    console.log('plate no changed from context side:', plateNo);
    if (plateNo !== null) {
      DebtInquiryPassData();
    }
  }, [plateNo]);

  //VALUE={[DebtPasses, setDebtPasses]} -->İF U WANT TO RETURN ONLY 1 STATE HOOK

  return (
    <DebtPassContext.Provider
      value={{
        PassData: [DebtPasses, setDebtPasses],
        plateData: [plateNo, setPlateNo],
        totalData: [total, setTotal],
        selectedData: [selectedItem, setSelectedItem],
      }}>
      {props.children}
    </DebtPassContext.Provider>
  );
};

export default DebtPassProvider;
