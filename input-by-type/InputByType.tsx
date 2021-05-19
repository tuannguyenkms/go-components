import SimpleDatePicker from '@components/SimpleDatePicker'
import { FONTS } from '@constants'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from 'themes/Colors'
import { Select } from '../../components/multi-select'
import { PhoneInput } from '@components/phone-number'
import { isNumber } from 'lodash'
import { RadioForm } from '@components/simple-radio-button/RadioForm'
import { icEdit } from '@assets'
import { designColors } from 'themes/design-color'

const MIN_NUMBER = 0
const MAX_NUMBER = 999999999

const DEFAULT_MAXLENGTH = 80

const INPUT_BY_TYPE = {
  INPUT: 'input',
  DROPDOWN: 'Dropdown',
  DATETIME_PICKER: 'Date',
  PHONE_NUMBER: 'phone',
  NUMERIC: 'Number',
  CASCADING_DROPDOWN: 'cascading_dropdown',
  DOCUMENT: 'document',
  EMAIL: 'email',
  SINGLE_LINE_TEXT: 'SingleLineText',
  MULTIPLE_LINE: 'MultiLineText',
  CHECK_BOX: 'YesNo',
  MULTI_SELECT: 'MultipleSelection',
  SINGLE_SELECT: 'SINGLE_SELECT',
}

interface PropTypes {
  type: string
  value: any
  data: { _id: string; value: string }[]
  index: number
  onChange: (newValue: string, index: number) => void
  cascadingIndex: string | number
  autoFocus?: boolean
  placeholder?: string
  maxLength?: number
  getLabel?: (item) => string
  testID?: {}
  validate?: (value) => boolean
  getValue?: (item) => string
  maximumDate?: Date
  hideEditIcon?: boolean
}

const InputByType: React.SFC<PropTypes> = ({
  type,
  value,
  onChange,
  data = [],
  index,
  autoFocus,
  placeholder,
  maxLength,
  testID,
  validate,
  maximumDate,
  hideEditIcon,
}) => {
  const [componentValue, changeValue] = useState(value)
  const handleOnChange = useCallback((newValue) => {
    onChange(newValue, index)
    changeValue(newValue)
  }, [])

  useEffect(() => {
    changeValue(value)
  }, [value, changeValue])

  const handleOnChangeNumericInput = useCallback((newValue) => {
    const changedValue = newValue ? parseInt(newValue).toString() : ''
    if (!isNumber(parseInt(newValue)) || parseInt(changedValue) <= MIN_NUMBER || parseInt(changedValue) > MAX_NUMBER) {
      return
    }

    onChange(changedValue, index)
    changeValue(changedValue)
  }, [])

  switch (type) {
    case INPUT_BY_TYPE.INPUT:
    case INPUT_BY_TYPE.SINGLE_LINE_TEXT:
      return (
        <View style={[styles.container, styles.multipleLine]}>
          <TextInput
            {...testID}
            autoFocus={autoFocus}
            style={[styles.textInput, styles.editInput]}
            value={componentValue}
            onChangeText={handleOnChange}
            numberOfLines={1}
            placeholder={placeholder}
            placeholderTextColor={`#c3c3c3`}
            maxLength={maxLength || DEFAULT_MAXLENGTH}
          />
          {!hideEditIcon && icEdit(20, Colors.primaryColor.main)}
        </View>
      )
    case INPUT_BY_TYPE.MULTIPLE_LINE:
      return (
        <View style={[styles.container, styles.multipleLine]}>
          <TextInput
            {...testID}
            autoFocus={autoFocus}
            style={[styles.textInput, styles.editInput, { minHeight: 120 }]}
            value={componentValue}
            onChangeText={handleOnChange}
            multiline
            numberOfLines={3}
            placeholder={placeholder}
            placeholderTextColor={`#c3c3c3`}
            maxLength={1000}
          />
          {!hideEditIcon && icEdit(20, Colors.primaryColor.main)}
        </View>
      )
    case INPUT_BY_TYPE.DATETIME_PICKER:
      return (
        <View style={styles.container}>
          <SimpleDatePicker
            {...testID}
            value={componentValue}
            onChange={handleOnChange}
            validate={validate}
            maximumDate={maximumDate}
          />
        </View>
      )
    case INPUT_BY_TYPE.PHONE_NUMBER:
      return (
        <View style={[styles.container, styles.multipleLine]}>
          <PhoneInput value={componentValue} onChange={handleOnChange} />
          {!hideEditIcon && icEdit(20, Colors.primaryColor.main)}
        </View>
      )
    case INPUT_BY_TYPE.NUMERIC:
      const inputValue = isNumber(componentValue) ? componentValue.toString() : componentValue
      return (
        <View style={[styles.container, styles.multipleLine]}>
          <TextInput
            {...testID}
            style={[styles.textInput, styles.editInput]}
            value={inputValue}
            onChangeText={handleOnChangeNumericInput}
            keyboardType="numeric"
            numberOfLines={1}
            placeholderTextColor={`#c3c3c3`}
            autoFocus={autoFocus}
            maxLength={maxLength || DEFAULT_MAXLENGTH}
            placeholder={placeholder}
          />
          {icEdit(20, Colors.primaryColor.main)}
        </View>
      )
    case INPUT_BY_TYPE.EMAIL:
      return (
        <View style={[styles.container, styles.multipleLine]}>
          <TextInput
            textContentType="emailAddress"
            {...testID}
            style={[styles.textInput, styles.editInput]}
            value={componentValue}
            onChangeText={handleOnChange}
            keyboardType="email-address"
            numberOfLines={1}
            placeholderTextColor={`#c3c3c3`}
            autoFocus={autoFocus}
            maxLength={maxLength || DEFAULT_MAXLENGTH}
            autoCapitalize="none"
            placeholder={placeholder}
          />
          {icEdit(20, Colors.primaryColor.main)}
        </View>
      )
    case INPUT_BY_TYPE.CHECK_BOX:
      const dataOptions = [
        { label: 'Yes   ', value: true },
        { label: 'No', value: false },
      ]
      return (
        <View style={[styles.container, styles.yesNoCheckbox]}>
          <RadioForm
            formHorizontal={false}
            data={dataOptions}
            initialValue={componentValue}
            onPress={(value) => {
              handleOnChange(value)
            }}
            buttonInnerColor={Colors.mainWhite}
            buttonColor={Colors.mainWhite}
            style={{ alignSelf: 'flex-start' }}
            buttonSize={14}
          />
        </View>
      )
    case INPUT_BY_TYPE.MULTI_SELECT:
      return (
        <View style={styles.container}>
          <Select
            placeholder={`Select ${placeholder}`}
            style={styles.multiSelect}
            data={data}
            onChange={handleOnChange}
            value={componentValue}
          />
        </View>
      )
    case INPUT_BY_TYPE.DROPDOWN:
    case INPUT_BY_TYPE.SINGLE_SELECT:
      return (
        <View style={styles.container}>
          <Select
            isSelectSingle
            placeholder={`Select ${placeholder}`}
            style={styles.multiSelect}
            data={data}
            onChange={handleOnChange}
            value={componentValue}
          />
        </View>
      )
    default:
      return <Text />
  }
}
export { InputByType, INPUT_BY_TYPE }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textInput: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.32,
    color: designColors.darkBlueGreyTwo,
    flex: 1,
    padding: 0,
  },
  editInput: {
    height: 28,
  },
  multiSelect: {
    borderColor: Colors.mainWhite,
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  multipleLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesNoCheckbox: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 10,
  },
})
