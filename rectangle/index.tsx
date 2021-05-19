import { width } from '@utils'
import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { designColors } from 'themes/design-color'

export const Rectangle = (props: ViewProps) => {
  const { style } = props
  return <View style={[styles.container, style]} />
}
const styles = StyleSheet.create({
  container: {
    height: 4,
    marginTop: 10,
    width: width(100),
    backgroundColor: designColors.bird3,
  },
})
