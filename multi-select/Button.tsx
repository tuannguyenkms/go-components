import React, { SFC } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
import { FONTS } from '@constants'
import noop from 'lodash/noop'
interface PropsType {
  title?: string
  backgroundColor?: string
  textColor?: string
  style?: {}
  textStyle?: {}
  onPress: () => void
  disabled?: boolean
  defaultFont?: { fontFamily?: string }
}

const Button: SFC<PropsType> = (props) => {
  const {
    title,
    backgroundColor,
    textColor,
    style,
    textStyle,
    onPress = noop,
    disabled,
    defaultFont,
  } = props
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        defaultFont,
        {
          backgroundColor: disabled ? 'gray' : backgroundColor,
          alignSelf: 'center',
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          defaultFont,
          { color: textColor || Colors.mainBlack },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 2,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
  },
})

export { Button }
