import React from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'

interface TextNormal {
  children: any
}

type TextNormalProps = TextNormal & TextProps

export const TextNormal = (props: TextNormalProps) => {
  return (
    <Text {...props} style={styles.text}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 23,
    color: '#0E223D',
    letterSpacing: -0.32,
  },
})
