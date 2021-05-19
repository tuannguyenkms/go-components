import React, { ReactElement } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { designColors } from 'themes/design-color'

type ShadowViewProps = {
  children?: ReactElement
  containerStyle?: any
  type?: 'light' | 'dark'
} & ViewProps
export const ShadowView = (props: ShadowViewProps) => {
  const { type = 'light', containerStyle, children } = props
  const stylesContainer = type === 'dark' ? styles.container : styles.container2
  return (
    <View {...props} style={[stylesContainer, containerStyle]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowColor: designColors.greyblue,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 8,
  },
  container2: {
    shadowColor: designColors.greyblue,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 0,
    elevation: 1,
  },
})
