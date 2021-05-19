import React from 'react'
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient'
import { designColors } from 'themes/design-color'
import { StyleSheet } from 'react-native'
import { get } from 'lodash'

type GradientViewProps = { children?: any } & LinearGradientProps
export const GradientView = (props: GradientViewProps) => {
  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 0.9, y: 0.5 }}
      colors={[designColors.topaz, '#05c938']}
      style={styles.container}
      {...props}
    >
      {get(props, 'children')}
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    shadowColor: '#a3ebb6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 18,
    shadowOpacity: 1,
  },
})
