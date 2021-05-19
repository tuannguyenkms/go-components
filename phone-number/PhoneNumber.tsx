// tslint:disable: variable-name
import { first, findKey } from 'lodash'
import { countries } from './Country'
import numberType from './number-type.json'
import libPhoneNumber from 'google-libphonenumber'

const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance()

const asYouTypeFormatter = libPhoneNumber.AsYouTypeFormatter

let instance = null

class PhoneNumber {
  static getInstance() {
    if (!instance) {
      instance = new PhoneNumber()
    }
    return instance
  }

  getAllCountries() {
    return countries.getAll()
  }

  getNumber(number: any) {
    return phoneUtil.parse(number)
  }

  getDialCode(number: string) {
    let dialCode = ''
    // only interested in international numbers (starting with a plus)
    if (number.charAt(0) === '+') {
      let numericChars = ''
      // iterate over chars
      for (let i = 0; i < number.length; i++) {
        const c = number.charAt(i)
        // if char is number
        if (c === ' ') {
          break
        }
        if (this.isNumeric(c)) {
          numericChars += c
          // if current numericChars make a valid dial code
          // if (this.countryCodes[numericChars]) {
          const mak = countries.getCountryCodes()
          const matchedNumber = `+${numericChars}`
          if (mak[matchedNumber]) {
            // store the actual raw string (useful for matching later)
            dialCode = number.substr(0, i + 1)
          }
          // longest dial code is 4 chars
          if (numericChars.length === 4) {
            break
          }
        }
      }
    }
    return dialCode
  }

  getNumeric(str: string) {
    return str.replace(/\D/g, '')
  }

  isNumeric(n: import('react').ReactText) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  getCountryCodeOfNumber(number: any) {
    const dialCode = this.getDialCode(number)
    const numeric = this.getNumeric(dialCode)
    const countryCode = countries.getCountryCodes()[numeric]

    if (countryCode) {
      return first(countryCode.filter((code: any) => code))
    }

    return ''
  }

  parse(number: any, code: any) {
    try {
      return phoneUtil.parse(number, code)
    } catch (err) {
      return null
    }
  }

  isValidNumber(number: any, code: any) {
    const phoneInfo = this.parse(number, code)

    if (phoneInfo) {
      return phoneUtil.isValidNumber(phoneInfo)
    }

    return false
  }

  format(number: string, code: any) {
    const formatter = new asYouTypeFormatter(code)
    let formatted: any

    number
      .replace(/-/g, '')
      .replace(/ /g, '')
      .split('')
      .forEach((n: any) => (formatted = formatter.inputDigit(n)))

    return formatted
  }

  getNumberType(number: any, code: any) {
    const phoneInfo = this.parse(number, code)
    const type = phoneInfo ? phoneUtil.getNumberType(phoneInfo) : -1
    return findKey(numberType, (noType) => noType === type)
  }

  getCountryDataByCode(code: any) {
    return countries.getCountryDataByCode(code)
  }
}

export default PhoneNumber.getInstance()
