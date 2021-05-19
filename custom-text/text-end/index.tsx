import React from 'react'
import { Text, TextProps, StyleSheet } from 'react-native'
import { designColors } from 'themes/design-color'

type TextEndProps = TextProps

export const TextEnd = (props: TextEndProps) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {``}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginTop: 15,
    lineHeight: 20,
    letterSpacing: 0,
    alignSelf: 'center',
    // fontFamily: FONTS.LIGHT,
    color: designColors.coolGrey,
  },
})
