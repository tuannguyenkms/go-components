import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { View, UIManager, StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
import { RadioButton } from './RadioButton'
import { ISIOS } from '@utils'
import { noop, isEmpty, isArray, map } from 'lodash'
const DEFAULT_BUTTON_SIZE = 10

const Button = (props) => {
  const {
    selectedButtonColor,
    buttonColor,
    onPress,
    buttonSize = DEFAULT_BUTTON_SIZE,
    buttonOuterSize,
    labelHorizontal,
    labelColor,
    selectedLabelColor,
    labelStyle,
    radioStyle,
    animation,
    disabled,
    item,
    activeIndex,
    setIsActiveIndex,
    index,
  } = props
  const isSelected = useMemo(() => activeIndex === item.value, [activeIndex])
  const selecteButtonColor = useMemo(() => (activeIndex === index ? selectedButtonColor : buttonColor), [activeIndex])
  const activeLabelColor = useMemo(() => (activeIndex === index ? selectedLabelColor : labelColor), [])

  const handleOnPress = useCallback(
    (value) => {
      onPress(value)
      setIsActiveIndex(value)
    },
    [index, onPress, setIsActiveIndex]
  )

  return (
    <RadioButton
      isSelected={isSelected}
      item={item}
      key={index}
      index={index}
      buttonColor={selecteButtonColor}
      buttonSize={buttonSize}
      buttonOuterSize={buttonOuterSize}
      labelHorizontal={labelHorizontal}
      labelColor={activeLabelColor}
      labelStyle={labelStyle}
      style={radioStyle}
      animation={animation}
      disabled={disabled}
      onPress={handleOnPress}
    />
  )
}

const RadioForm = (props) => {
  useEffect(() => {
    if (!ISIOS) {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }, [])
  const { data, style, formHorizontal, initialValue } = props
  const [activeIndex, setIsActiveIndex] = useState(initialValue)

  return (
    <View style={[Style.radioForm, style, formHorizontal && Style.formHorizontal]}>
      {!isEmpty(data) && isArray(data)
        ? map(data, (item, index) => (
            <Button
              key={index}
              {...props}
              item={item}
              index={index}
              activeIndex={activeIndex}
              setIsActiveIndex={setIsActiveIndex}
            />
          ))
        : props.children}
    </View>
  )
}

RadioForm.defaultProps = {
  data: [],
  initial: 0,
  buttonColor: Colors.mainWhite,
  selectedButtonColor: Colors.mainWhite,
  formHorizontal: false,
  labelHorizontal: true,
  animation: true,
  labelColor: '#000',
  selectedLabelColor: '#000',
  wrapStyle: {},
  disabled: false,
  onPress: noop,
  buttonInnerColor: Colors.mainWhite,
}

const Style = StyleSheet.create({
  radioForm: {
    flex: 1,
    justifyContent: 'space-between',
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

export { RadioForm }
