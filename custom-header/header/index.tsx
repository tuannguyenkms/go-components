import { icBackPro } from '@assets'
import { HIT_SLOP } from '@constants'
import React from 'react'
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { designColors } from 'themes/design-color'

interface HeaderProps {
  backgroundColor?: string
  leftAction?: () => void
}
export const Header  = (props:HeaderProps) => {
  const { backgroundColor = designColors.white100, leftAction } = props
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.container, { backgroundColor,  paddingTop: insets.top + 16}]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      {
        leftAction &&
        <TouchableOpacity hitSlop={HIT_SLOP} style={{ marginHorizontal: 16 }} onPress={leftAction}>
          {icBackPro(20, designColors.dark100)}
        </TouchableOpacity>
      }
    </View>
  )
}
const styles  = StyleSheet.create({
  container: {

  }
})