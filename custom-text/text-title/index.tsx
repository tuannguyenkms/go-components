import { FONTS } from '@constants'
import React from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'
import { designColors } from 'themes/design-color'
interface AppProps {
  children: any
}
type TextTitleProps = AppProps & TextProps
export const TextTitle = (props: TextTitleProps) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    lineHeight: 20,
    letterSpacing: -0.26,
    color: designColors.GreenText,
  },
})
