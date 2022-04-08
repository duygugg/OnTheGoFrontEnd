import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Image, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Home from './Home';
import images from '../constants/images';

export default function SplashScreen() {
    const edges = useSafeAreaInsets();

    const startAnimation = useRef(new Animated.Value(0)).current;

    const scaleLogo = useRef(new Animated.Value(1)).current;

    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;



    useEffect(() => {
        setTimeout(() => {
            Animated.sequence([
                Animated.timing(
                    startAnimation,
                    {
                        toValue: -Dimensions.get('window').height + (edges.top + 25),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        toValue: 0.35,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        toValue: {
                            x: 0,

                            y: (Dimensions.get('window').height / 2) - 90
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ]).start();
        }, 500)

    }, [])

    return (
        <View style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
        }}>
            <Animated.View style={{
                flex: 1,
                zIndex: 1,
                backgroundColor: 'rgb(21, 133, 225)',
                transform: [
                    { translateY: startAnimation }
                ]
            }}>
                <Animated.View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                    <Animated.Image source={images.kmoLogo}
                        style={{
                            width: 100,
                            height: 100,
                            transform: [
                                { scale: scaleLogo },
                                {translateX:moveLogo.x},
                                {translateY:moveLogo.y}
                            ]
                        }} />
                </Animated.View>
            </Animated.View>

            <Animated.View style={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute',
                zIndex:0,
                transform:[{translateY: contentTransition}],
                backgroundColor:'rgba(0,0,0,0.04)'
            }}>

                

            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: 'rgb(21, 133, 225)',
    }
})
