import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState, useMemo, useRef, useCallback} from 'react';
import {COLORS, SIZES} from '../../constants/index';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import images from '../../constants/images';

const HowTo = props => {
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => [SIZES.height/2.5, 500], []);

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      onClose={() => props.setVisible(false)}
      //onChange={handleSheetChanges}
    >
      <BottomSheetView>
        <View style={{marginHorizontal: 15}}>
          {/* Image */}
          <View style={{alignItems: 'center', marginBottom: 15}}>
            <Image style={{height: 200, width: 150}} source={images.howToImg} />
          </View>
          {/* Title */}
          <Text style={styles.title}>Plaka Ekleme</Text>
          {/* Descr */}
          <Text style={styles.description}>
            Navigasyon'da yer alan plakarım sayfasına ulaşarak manuel olarak
            plaka ekleyebilirsiniz.
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    left: 10,
    letterSpacing: 0.5,
    color: '#000',
  },
  description: {
    left: 10,
    color: 'gray',
    fontSize: 13,
  },
});

export default HowTo;
