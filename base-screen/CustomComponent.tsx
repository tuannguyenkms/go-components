import React, { ReactNode, ReactText } from 'react'
import { Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface AppProps {
  style?: any
  children: ReactNode
  colors: ReactText[]
  isLinearGradient?: boolean
}

const CustomComponent = (props: AppProps) => {
  const { style, colors, isLinearGradient = false } = props

  return !isLinearGradient ? (
    <Animated.View style={style}>{props.children}</Animated.View>
  ) : (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={colors}
      style={style}
    >
      {props.children}
    </LinearGradient>
  )
}
export default CustomComponent
