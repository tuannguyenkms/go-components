import React, { useMemo, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

export const ScrollViewIndicator = ({ children }) => {
    const [scrollYState] = useState(new Animated.Value(0))
    const scrollY = Animated.add(scrollYState, 0)

    return (
        <View style={styles.base}>
            <Animated.ScrollView
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYState } } }], {
                    useNativeDriver: false,
                })}
                scrollEventThrottle={1}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </Animated.ScrollView>
            <Animated.View style={[styles.indicator, { transform: [{ translateY: scrollY }] }]}>

            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {

    },
    indicator: {
        height: 400,
        width: '2',
        backgroundColor: 'red',
        position: 'absolute',
    },
})