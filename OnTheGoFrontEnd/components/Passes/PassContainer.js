import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Moment from 'moment';
import {COLORS, SIZES} from '../../constants/index';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PassContainer({item,length}) {

  const [isDetailsClicked, setDetailsClicked] = useState(new Array(length).fill(false));

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

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 25,
        elevation: 4,
        marginRight: 10,
        marginLeft: 10,
        top: 20,
        marginBottom: 20,
        paddingVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '60%'}}>
          <TouchableOpacity>
            <View style={{marginLeft: 40, marginBottom: 20, marginTop: 20}}>
              {/* Plate Number Info */}
              <View>
                <Text style={{fontSize: 18}}>Plaka Numarası</Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '700',
                    color: 'rgba(74, 220, 106, 1)',
                  }}>
                  {item.plate_no}
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 10,
                }}>
                <Text style={{fontSize: 16}}>Geçiş Tarihi</Text>
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
                <Text style={{fontSize: 16}}>Çıkış İstasyonu</Text>
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
                    <Text style={{fontSize: 16, marginRight: 4}}>
                      Araç Sınıfı:
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: 'black',
                      }}>
                      {item.class}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingTop: 10,
                    }}>
                    <Text style={{fontSize: 16, marginRight: 4}}>
                      Giriş İstasyonu:
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
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
                    <Text style={{fontSize: 16, marginRight: 4}}>
                      Geçiş Bedeli:
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: 'black',
                      }}>
                      {item.pass_cost} TRY
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Ödenecek Tutar ve Detay collapsable button column */}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            right: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 16,
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
              fontSize: 18,
              fontWeight: '700',
              color: COLORS.neongreen,
              marginLeft: 8,
              textAlign: 'center',
            }}>
            ÖDENMİŞ
          </Text>
          <Pressable
            onPress={() => handleDetailsChange(item)}
            style={{
              alignItems: 'center',
              backgroundColor: COLORS.neongreen,
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
                style={{color: COLORS.white, fontWeight: 'bold', fontSize: 16}}>
                Detay
              </Text>
              <Icon
                style={{marginLeft: 10}}
                name={isDetailsClicked[item.id] ? 'chevron-up' : 'chevron-down'}
                color="white"
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
