import React, { SFC } from 'react'
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { FONTS } from '@constants'
import { designColors } from 'themes/design-color'

interface PropsType {
  disabled?: boolean
  onPress?: (value?: boolean, index?: number) => void
  index: number
  labelWrapStyle?: {}
  labelHorizontal?: boolean
  labelColor?: string
  labelStyle?: {}
  item?: {
    value: boolean
    label: string
  }
}

const RadioButtonLabel: SFC<PropsType> = ({
  disabled,
  onPress,
  index,
  labelWrapStyle,
  labelHorizontal,
  labelColor,
  labelStyle,
  item,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!disabled) {
          onPress(item.value, index)
        }
      }}
    >
      <View style={[labelWrapStyle, style.labelWrapStyle]}>
        <Text
          style={[
            style.radioLabel,
            !labelHorizontal && style.labelVertical,
            { color: labelColor },
            labelStyle,
            style.radioLabel,
          ]}
        >
          {item.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const style = StyleSheet.create({
  labelWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  radioLabel: {
    paddingLeft: 10,
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    lineHeight: 22,
    color: designColors.darkSlateBlue,
    letterSpacing: -0.32,
  },
  labelVertical: {
    paddingLeft: 0,
  },
})

export { RadioButtonLabel }
