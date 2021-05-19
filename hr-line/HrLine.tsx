import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FONTS } from '@constants'

interface HrLineProps {
  thickness?: number
  lineColor?: string
  text?: number | string
  textPadding?: number
  hrPadding?: number
  hrStyles?: any
  textStyles?: any
}

export const HrLine: React.FC<HrLineProps> = (props: HrLineProps) => {
  const { text, hrStyles, textStyles, thickness = 1, hrPadding = 15, textPadding = 5, lineColor = 'black' } = props

  return (
    <View style={[styles.row, { marginHorizontal: hrPadding }, hrStyles]}>
      <View style={[styles.side, { height: thickness, backgroundColor: lineColor }]} />
      <Text style={[styles.text, { paddingHorizontal: textPadding }, textStyles]}>{text}</Text>
      <View style={[styles.side, { height: thickness, backgroundColor: lineColor }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  side: {
    flex: 1,
    height: 1,
    alignSelf: 'center',
  },
  text: {
    fontSize: 11,
    color: '#7d95a8',
    fontFamily: FONTS.MEDIUM,
  },
})
