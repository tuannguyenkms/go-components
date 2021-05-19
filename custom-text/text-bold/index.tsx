import React from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'

interface TextBold {
  children: any
}

type TextBoldProps = TextBold & TextProps

export const TextBold = (props: TextBoldProps) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 23,
    color: '#0E223D',
    fontWeight: 'bold',
  },
})
