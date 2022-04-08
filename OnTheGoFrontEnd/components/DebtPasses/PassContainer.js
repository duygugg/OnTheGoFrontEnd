import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Moment from 'moment';
import {COLORS, SIZES} from '../../constants/index';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DebtPassContext} from '../../ContextProvider/DebtPassContext';
import {useIsFocused} from '@react-navigation/native';
export default function PassContainer({item, length}) {
  const [isDetailsClicked, setDetailsClicked] = useState(
    new Array(length).fill(false),
  );
  const [isSelected, setSelected] = useState(new Array(length).fill(false));
  const [isAllSelected, setAllSelected] = useState(false);
  const {totalData, selectedData} = React.useContext(DebtPassContext);
  const [selectedItem, setSelectedItem] = selectedData;
  const [total, setTotal] = totalData;

  const format_date = date => {
    if (date == null) {
      return 'Bilinmiyor';
    }
    const date_form = Moment(date).format('DD-MM-YYYY');
    return date_form;
  };

  const handleDetailsChange = item => {
    id = item.id;
    const data = isDetailsClicked.map((item, index) =>
      id === index ? !item : item,
    );
    setDetailsClicked(data);
  };

  const handleSelectChange = item => {
    const pos = item.id;
    console.log('pos.', pos);
    const checkedState = isSelected.map((item, index) =>
      index === pos ? !item : item,
    );

    setSelected(checkedState);

    // if (typeof Number(item.total_cost) == 'undefined') {
    //   console.log('problem');
    // } else {
    //   console.log('works');
    // }
    console.log('cost of pass:', item.total_cost, checkedState[pos]);
  };

  return (
    <View
      style={{
        borderRadius: 25,
        elevation: 4,
        marginRight: 10,
        marginLeft: 10,
        top: 20,
        marginBottom: 20,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          backgroundColor: isSelected[item.id]
            ? COLORS.neongreen
            : 'transparent',
          justifyContent: 'space-between',
          borderRadius: 25,
          paddingVertical: 10,
        }}>
        <View style={{width: '60%'}}>
          {/* comment it */}
          <TouchableOpacity
            onPress={() => {
              handleSelectChange(item);
              if (!isSelected[item.id]) {
                setTotal(prev => prev + item.total_cost);
                setSelectedItem({myArray: [...selectedItem.myArray, item]});

                console.log(item);
              } else {
                if (total >= item.total_cost) {
                  setTotal(prev => prev - item.total_cost);

                  const arr = selectedItem.myArray.filter(
                    arrayItem => arrayItem.id != item.id,
                  );
                  console.log('arr:', arr);
                  setSelectedItem({myArray: arr});
                }
              }
            }}>
            <View style={{marginLeft: 40, marginBottom: 20, marginTop: 20}}>
              {/* Plate Number Info */}
              <View>
                <Text style={{fontSize: SIZES.width > 1200 ? 18 : 15}}>
                  Plaka Numarası
                </Text>
                <Text
                  style={{
                    fontSize: SIZES.width > 1200 ? 22 : 18,
                    fontWeight: '700',
                    color: isSelected[item.id]
                      ? COLORS.white
                      : 'rgba(74, 220, 106, 1)',
                  }}>
                  {item.plate_no}
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 10,
                }}>
                <Text style={{fontSize: SIZES.width > 1200 ? 16 : 15}}>
                  Geçiş Tarihi
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  {format_date(item.exit_date)}
                </Text>
              </View>

              <View
                style={{
                  paddingTop: 10,
                }}>
                <Text style={{fontSize: SIZES.width > 1200 ? 16 : 14}}>
                  Çıkış İstasyonu
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  {item.exit_station}
                </Text>
              </View>
              {isDetailsClicked[item.id] ? (
                <View style={{marginBottom: 20, marginTop: 20}}>
                  <View>
                    <Text
                      style={{
                        fontSize: SIZES.width > 1200 ? 16 : 14,
                        marginRight: 4,
                      }}>
                      Giriş İstasyonu:
                    </Text>
                    <Text
                      style={{
                        fontSize: SIZES.width > 1200 ? 16 : 13,
                        fontWeight: '700',
                        color: 'black',
                      }}>
                      {item.entry_station}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: SIZES.width > 1200 ? 16 : 14,
                        marginRight: 4,
                      }}>
                      Araç Sınıfı:
                    </Text>
                    <Text
                      style={{
                        fontSize: SIZES.width > 1200 ? 16 : 13,
                        fontWeight: '700',
                        color: 'black',
                      }}>
                      {item.class}
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Detay collapsable button column */}
        <View
          style={{
            backgroundColor: 'transparent',
            right: 10,
            width: '40%',
            // backgroundColor:'pink'
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: SIZES.width > 1200 ? 16 : 15,
                marginRight: 4,
                marginLeft: 3,

                textAlign: 'center',
                top: 20,
              }}>
              Ödenecek Tutar
            </Text>
          </View>
          <Text
            style={{
              marginTop: 25,
              fontSize: SIZES.width > 1200 ? 24 : 20,
              fontWeight: '700',
              color: isSelected[item.id]
                ? COLORS.white
                : 'rgba(74, 220, 106, 1)',
              marginLeft: 8,
              textAlign: 'center',
            }}>
            {item.total_cost} TRY
          </Text>
          <View
            style={{
              paddingTop: 10,
              left: 10,
            }}>
            <Text
              style={{fontSize: SIZES.width > 1200 ? 16 : 14, marginRight: 4}}>
              Son Ödeme Tarihi
            </Text>
            <Text
              style={{
                left: 20,
                fontSize: SIZES.width > 1200 ? 16 : 14,
                fontWeight: '700',
                color: 'black',
              }}>
              {format_date(item.last_payment_date)}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 10,
              left: 10,
            }}>
            <Text
              style={{fontSize: SIZES.width > 1200 ? 16 : 14, marginRight: 4}}>
              Geçiş Bedeli
            </Text>
            <Text
              style={{
                left: 20,
                fontSize: SIZES.width > 1200 ? 16 : 14,
                fontWeight: '700',
                color: 'black',
              }}>
              {item.pass_cost} TRY
            </Text>
          </View>
          <View
            style={{
              paddingTop: 10,
              left: 10,
            }}>
            <Text
              style={{fontSize: SIZES.width > 1200 ? 16 : 14, marginRight: 4}}>
              Ceza Bedeli
            </Text>
            <Text
              style={{
                left: 20,
                fontSize: SIZES.width > 1200 ? 16 : 14,
                fontWeight: '700',
                color: 'black',
              }}>
              {item.debt_fee} TRY
            </Text>
          </View>
          <Pressable
            onPress={() => handleDetailsChange(item)}
            style={{
              alignItems: 'center',
              backgroundColor: isSelected[item.id]
                ? COLORS.white
                : 'rgba(74, 220, 106, 1)',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 25,
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: isSelected[item.id]
                    ? 'rgba(74, 220, 106, 1)'
                    : COLORS.white,
                  fontWeight: 'bold',
                  fontSize: SIZES.width > 1200 ? 16 : 14,
                }}>
                Detay
              </Text>
              <Icon
                style={{marginLeft: 10}}
                name={isDetailsClicked[item.id] ? 'chevron-up' : 'chevron-down'}
                color={
                  isSelected[item.id] ? 'rgba(74, 220, 106, 1)' : COLORS.white
                }
                size={16}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
