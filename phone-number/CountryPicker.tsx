import React, { useState, useCallback } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { countries } from './Country'
import noop from 'lodash/noop'
import { MYWIDTH } from '@utils'
import Colors from 'themes/Colors'
import { FONTS } from '@constants'
import { Picker } from '@react-native-community/picker'
const PickerItem = Picker.Item

const renderItem = (country: { name: string; code: string; flag: string }, index: number) => {
  return <PickerItem key={`${country.name}_${index}`} value={country.code} label={`${country.flag} ${country.name}`} />
}

const renderPickerItem = () => {
  return countries.getAll().map((country, index) => {
    return renderItem(country, index)
  })
}

const CountryPicker = (props) => {
  const {
    pickerBackgroundColor,
    buttonTextStyle,
    cancelText,
    confirmText,
    itemStyle = { paddingHorizontal: 8 },
    onPressConfirm,
    onSubmit,
    onPressCancel,
    showPicker,
    handlePicker,
  } = props

  const buttonColor = props.buttonColor || Colors.primaryColor.main
  const [selectedCountry, updateSelectedCountry] = useState(props.selectedCountry || countries.getAll()[0])

  const handlePressCancel = useCallback(() => {
    if (onPressCancel) {
      onPressCancel()
    }

    handlePicker(false)
  }, [handlePicker])

  const onPressSubmit = useCallback(() => {
    if (onPressConfirm) {
      onPressConfirm()
    }

    if (onSubmit) {
      onSubmit(selectedCountry)
    }

    handlePicker(false)
  }, [handlePicker, selectedCountry, onSubmit, onPressConfirm])

  const onValueChange = useCallback(
    (value) => {
      updateSelectedCountry(value)
    },
    [updateSelectedCountry]
  )

  return (
    <Modal animationType="slide" transparent visible={showPicker} onRequestClose={noop}>
      <View style={styles.basicContainer}>
        <View style={[styles.modalContainer, { backgroundColor: pickerBackgroundColor || Colors.mainWhite }]}>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={handlePressCancel}>
              <Text style={[{ color: buttonColor }, buttonTextStyle]}>{cancelText || 'Cancel'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressSubmit}>
              <Text style={[{ color: buttonColor }, buttonTextStyle]}>{confirmText || 'Confirm'}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Picker
              style={styles.bottomPicker}
              selectedValue={selectedCountry}
              onValueChange={(country) => onValueChange(country)}
              itemStyle={itemStyle}
              mode="dialog"
            >
              {renderPickerItem()}
            </Picker>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: MYWIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  buttonView: {
    width: MYWIDTH,
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottomPicker: {
    width: MYWIDTH,
  },
  flag: {
    height: 20,
    width: 30,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#cecece',
    backgroundColor: '#cecece',
  },
  text: {
    height: 20,
    padding: 0,
    justifyContent: 'center',
    fontFamily: FONTS.BOLD,
  },
})

export default CountryPicker
