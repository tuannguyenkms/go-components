import React, { useRef } from 'react'
import { Animated, PanResponder, StyleSheet, ViewStyle } from 'react-native'
import { width } from '@utils'

interface SliderViewProps {
  children: any
  onPress?: () => void
  handleArchive?: () => void
  containerStyle?: ViewStyle
}
export const SliderView = (props: SliderViewProps) => {
  const { handleArchive, children, containerStyle } = props
  const pan: any = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          const dx = gestureState.dx
          return dx > 15 || dx < -15
        },
        onPanResponderMove: (evt, gestureState) => {
          const dx = gestureState.dx
          Animated.timing(pan, {
            toValue: { x: dx, y: 0 },
            duration: 1,
            useNativeDriver: false,
          }).start()
        },
        onPanResponderRelease: (evt, gestureState) => {
          const dx = gestureState.dx
          if (dx > width(50) || dx < -width(50)) {
            Animated.spring(pan, {
              toValue: { x: width(100), y: 0 },
              useNativeDriver: false,
            }).start()
            handleArchive && handleArchive()
            Animated.timing(pan, {
              toValue: { x: 0, y: 0 },
              duration: 1,
              useNativeDriver: false,
            }).start()
          } else {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start()
          }
        },
        onPanResponderTerminate: (evt, gestureState) => {
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 1,
            useNativeDriver: false,
          }).start()
          return false
        },
      }),
    []
  )
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          transform: [{ translateX: pan.x }],
        },
        styles.containerNewsItem,
        containerStyle,
      ]}
    >
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  containerNewsItem: {
    zIndex: 10,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 8,
    marginHorizontal: 12,
  },
})
