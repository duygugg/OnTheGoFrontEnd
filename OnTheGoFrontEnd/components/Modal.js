import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants/index';
import LottieView from 'lottie-react-native';

import {StatusBar} from 'react-native';

export default class ModalLoader extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <Modal
        visible={this.props.loading}
        transparent={true}
        
        animationType={'fade'}>
        <StatusBar hidden={this.props.loading} />
        <TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
              height: SIZES.height,
              width: SIZES.width,
            }}>
            <LottieView
              style={{top: SIZES.height / 8}}
              ref={animation => {
                this.animation = animation;
              }}
              width={450}
              height={300}
              source={require('../assets/animations/8428-loader.json')}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({});
