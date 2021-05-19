import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'
const DEFAULT_SIZE = 36
const DEFAULT_OUTER_SIZE = DEFAULT_SIZE + 10

const RadioButtonInput = (props) => {
  const innerSize = {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    borderRadius: DEFAULT_SIZE / 2,
  }

  const outerSize = {
    width: DEFAULT_OUTER_SIZE,
    height: DEFAULT_OUTER_SIZE,
    borderRadius: DEFAULT_OUTER_SIZE / 2,
  }

  const {
    buttonSize,
    buttonOuterSize,
    buttonOuterColor,
    borderWidth = 2,
    isSelected,
    buttonColor,
    buttonInnerColor,
    buttonStyle,
    disabled,
    buttonWrapStyle,
    item,
    accessible,
    accessibilityLabel,
    onPress,
    index,
  } = props

  if (buttonSize) {
    innerSize.width = buttonSize
    innerSize.height = buttonSize
    innerSize.borderRadius = buttonSize / 2
    outerSize.width = buttonSize + 10
    outerSize.height = buttonSize + 10
    outerSize.borderRadius = (buttonSize + 10) / 2
  }

  if (buttonOuterSize) {
    outerSize.width = buttonOuterSize
    outerSize.height = buttonOuterSize
    outerSize.borderRadius = buttonOuterSize / 2
  }

  let outerColor = buttonOuterColor
  let innerColor = buttonInnerColor

  if (buttonColor) {
    outerColor = buttonColor
    innerColor = buttonColor
  }

  const radioStyle = [
    Style.radio,
    {
      borderColor: outerColor,
      borderWidth,
    },
    buttonStyle,
    outerSize,
  ]

  return (
    <View style={[buttonWrapStyle, { width: 24, height: 24, opacity: disabled ? 0.7 : 1, justifyContent: 'center' }]}>
      <TouchableOpacity
        disabled={disabled}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        style={[
          radioStyle,
          {
            backgroundColor: isSelected ? Colors.primaryColor.main : undefined,
            borderColor: isSelected ? Colors.primaryColor.main : designColors.slateBlue,
            width: isSelected ? 24 : 18,
            height: isSelected ? 24 : 18,
          },
          Style.innerStyle,
        ]}
        onPress={() => {
          onPress(item.value, index)
        }}
      >
        <View
          style={[
            Style.radioNormal,
            isSelected && Style.radioActive,
            isSelected && innerSize,
            isSelected && { backgroundColor: innerColor },
          ]}
        ></View>
      </TouchableOpacity>
    </View>
  )
}

export { RadioButtonInput }

RadioButtonInput.defaultProps = {
  buttonInnerColor: Colors.primaryColor.main,
  buttonOuterColor: Colors.primaryColor.main,
  disabled: false,
}

const Style = StyleSheet.create({
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    alignSelf: 'center',
    borderColor: Colors.primaryColor.main,
    borderRadius: 14,
  },
  radioNormal: {
    borderRadius: 10,
  },
  radioActive: {
    width: 16,
    height: 16,
    backgroundColor: Colors.mainWhite,
  },
  innerStyle: {
    borderWidth: 1,
    shadowColor: '#14d747',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
})
