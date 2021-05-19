import React from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
interface AppProps {
  children: any
}
type TextTimeProps = AppProps & TextProps
export const TextTime = (props: TextTimeProps) => {
  return (
    <Text style={[styles.text, props.style]} {...props}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    lineHeight: 22,
    letterSpacing: 0.6,
    color: Colors.primary,
  },
})
