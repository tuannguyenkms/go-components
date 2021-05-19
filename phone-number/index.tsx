// tslint:disable: variable-name
import React, { Component } from 'react'
import { Dimensions, StyleSheet, TextInput, TouchableWithoutFeedback, View, Text } from 'react-native'
import { countries } from './Country'
import CountryPicker from './CountryPicker'
import PhoneNumber from './PhoneNumber'
import autobind from 'autobind-decorator'
import { FONTS } from '@constants'

const { width } = Dimensions.get('window')

const SCREEN_WIDTH = width

interface PropsType {
  countriesList?: {}[]
  disabled?: boolean
  initialCountry?: string
  value?: string
  onChangePhoneNumber?: (value: string) => void
  onSelectCountry?: (value: string) => void
  pickerButtonColor?: string
  autoFormat?: boolean
  allowZeroAfterCountryCode?: boolean
  onChange?: (value: string) => void
}

interface StateType {
  code: string
  inputValue: string
  disabled: boolean
  formattedNumber: string
  value?: string
  showPicker: boolean
}

class PhoneInput extends Component<PropsType, StateType> {
  static setCustomCountriesData(json) {
    countries.setCustomCountriesData(json)
  }

  constructor(props) {
    super(props)

    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.getISOCode = this.getISOCode.bind(this)

    const { countriesList, disabled, initialCountry } = this.props

    if (countriesList) {
      countries.setCustomCountriesData(countriesList)
    }
    const countryData = PhoneNumber.getCountryDataByCode(initialCountry)

    const data = this.updateFlagAndFormatNumber(props.value) || {}

    this.state = {
      code: data.code || props.initialCountry,
      disabled,
      formattedNumber: countryData ? `${countryData.dialCode}` : '',
      value: null,
      inputValue: data.inputValue || '',
      showPicker: false,
    }
  }

  onChangePhoneNumber(number) {
    const data = PhoneNumber.getCountryDataByCode(this.state.code) || {}
    this.setState({ inputValue: number })
    this.props.onChange && this.props.onChange(`${data.dial_code} ${number}`)
  }

  @autobind
  onPressFlag() {
    this.setState({ showPicker: true })
  }

  getPickerData() {
    return PhoneNumber.getAllCountries().map((country, index) => ({
      key: index,
      label: country.name,
      dialCode: `${country.dialCode}`,
      code: country.code,
    }))
  }

  getCountryCode() {
    const countryData = PhoneNumber.getCountryDataByCode(this.state.code)
    return countryData ? countryData.dial_code : null
  }

  getAllCountries() {
    return PhoneNumber.getAllCountries()
  }

  getDialCode() {
    return PhoneNumber.getDialCode(this.state.formattedNumber)
  }

  getValue() {
    return this.state.formattedNumber.replace(/\s/g, '')
  }

  getNumberType() {
    return PhoneNumber.getNumberType(this.state.formattedNumber, this.state.code)
  }

  getISOCode() {
    return this.state.code
  }

  selectCountry(code) {
    if (this.state.code !== code) {
      const countryData = PhoneNumber.getCountryDataByCode(code)
      if (countryData) {
        this.setState(
          {
            code,
            formattedNumber: ` ${countryData.dialCode}`,
          },
          () => {
            if (this.props.onSelectCountry) this.props.onSelectCountry(code)

            const data = PhoneNumber.getCountryDataByCode(this.state.code) || {}
            this.props.onChange && this.props.onChange(`${data.dial_code} ${this.state.inputValue}`)
          }
        )
      }
    }
  }

  isValidNumber() {
    if (this.state.inputValue.length < 3) return false
    return PhoneNumber.isValidNumber(this.state.formattedNumber, this.state.code)
  }

  format(text) {
    return this.props.autoFormat ? PhoneNumber.format(text, this.state.code) : text
  }

  updateFlagAndFormatNumber(number) {
    if (!number) {
      return {}
    }
    const { initialCountry } = this.props

    try {
      const phoneNumber = PhoneNumber.getNumber(number)
      const countryCode = phoneNumber.getCountryCodeOrDefault()
      const code = `+${countryCode}` || initialCountry
      const formattedPhoneNumber = number || ''

      const inputValue = phoneNumber.getNationalNumber().toString() || number
      const data = countries.getCountryDataByDialCode(code)

      return {
        code: data.code,
        formattedNumber: formattedPhoneNumber,
        inputValue,
      }
    } catch (error) {
      const data = countries.getCountryDataByDialCode(number)
      const formattedPhoneNumber = number || ''
      return {
        code: data ? data.code : initialCountry,
        formattedNumber: formattedPhoneNumber,
        inputValue: data ? '' : number,
      }
    }
  }

  possiblyEliminateZeroAfterCountryCode(number) {
    const dialCode = PhoneNumber.getDialCode(number)
    return number.startsWith(`${dialCode}0`) ? dialCode + number.substr(dialCode.length + 1) : number
  }

  focus() {
    this.inputPhone.focus()
  }

  blur() {
    this.inputPhone.blur()
  }

  hidePicker = () => {
    this.setState({ showPicker: false })
  }

  render() {
    const { code, inputValue, disabled } = this.state
    const data = PhoneNumber.getCountryDataByCode(code) || {}

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback onPress={this.onPressFlag} disabled={disabled}>
          <View>
            <Text style={{ fontSize: 28, paddingRight: 8 }}>{data.flag}</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={[styles.text, this.props.textStyle]}>{data.dial_code ? data.dial_code : ''}</Text>
        <TextInput
          ref={(ref) => {
            this.inputPhone = ref
          }}
          editable={!disabled}
          autoCorrect={false}
          style={[styles.text, this.props.textStyle, { marginLeft: 8, minWidth: 60, flex: 1 }]}
          onChangeText={(text) => {
            this.onChangePhoneNumber(text)
          }}
          numberOfLines={1}
          keyboardType="phone-pad"
          value={inputValue}
        />
        <CountryPicker
          handlePicker={this.hidePicker}
          showPicker={this.state.showPicker}
          selectedCountry={code}
          onSubmit={this.selectCountry}
          buttonColor={this.props.pickerButtonColor}
          buttonTextStyle={this.props.pickerButtonTextStyle}
          cancelText={this.props.cancelText}
          cancelTextStyle={this.props.cancelTextStyle}
          confirmText={this.props.confirmText}
          confirmTextStyle={this.props.confirmTextStyle}
          pickerBackgroundColor={this.props.pickerBackgroundColor}
          itemStyle={this.props.pickerItemStyle}
          onPressCancel={this.props.onPressCancel}
          onPressConfirm={this.props.onPressConfirm}
        />
      </View>
    )
  }
}

PhoneInput.defaultProps = {
  initialCountry: 'VN',
  disabled: false,
  allowZeroAfterCountryCode: true,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  buttonView: {
    width: SCREEN_WIDTH,
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottomPicker: {
    width: SCREEN_WIDTH,
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
    padding: 0,
    justifyContent: 'center',
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    letterSpacing: -0.32,
    color: '#0e223d',
  },
})

export { PhoneInput }
