import React, { useEffect } from 'react'
import { View, LayoutAnimation, StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
import { RadioButtonLabel } from './RadioButtonLabel'
import { RadioButtonInput } from './RadioButtonInput'

const RadioButton = (props) => {
  useEffect(() => {
    if (props.animation) {
      LayoutAnimation.spring()
    }
  }, [])
  const { children, wrapStyle, style, labelHorizontal } = props
  return (
    <View style={wrapStyle}>
      {children ? (
        <View
          style={[
            Style.radioWrap,
            style,
            !labelHorizontal && Style.labelVerticalWrap,
          ]}
        >
          {children}
        </View>
      ) : (
        <View
          style={[
            Style.radioWrap,
            style,
            !labelHorizontal && Style.labelVerticalWrap,
          ]}
        >
          <RadioButtonInput {...props} />
          <RadioButtonLabel {...props} />
        </View>
      )}
    </View>
  )
}

RadioButton.defaultProps = {
  isSelected: false,
  buttonColor: Colors.primaryColor.main,
  selectedButtonColor: Colors.primaryColor.main,
  labelHorizontal: true,
  disabled: false,
  idSeparator: '|',
}

export { RadioButton }

const Style = StyleSheet.create({
  radioForm: {},
  radioWrap: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    alignSelf: 'center',
    borderColor: Colors.primaryColor.main,
    borderRadius: 30,
  },
  radioLabel: {
    paddingLeft: 10,
    lineHeight: 20,
  },
  radioNormal: {
    borderRadius: 10,
  },
  radioActive: {
    width: 20,
    height: 20,
    backgroundColor: Colors.primaryColor.main,
  },
  labelWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  labelVerticalWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  labelVertical: {
    paddingLeft: 0,
  },
  formHorizontal: {
    flexDirection: 'row',
  },
})
