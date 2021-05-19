import React from 'react'
import { StyleSheet, View } from 'react-native'
import { designColors } from 'themes/design-color'

export const IconView = (props: any) => {
  const { children, size = 24, style } = props
  return (
    <View style={[
      styles.container,
      { width: size, height: size, borderRadius: size / 2 },
      style
    ]}>
      {children}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: designColors.bird15
  }
})