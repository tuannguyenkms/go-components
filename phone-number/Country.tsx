import { find, orderBy } from 'lodash'
import { countries } from './countries'

class Country {
  countryCodes: string[] = []
  countriesData: { name: string; code: string; flag: string; dial_code: string }[]
  countries = countries

  constructor() {
    this.countryCodes = []
    this.countriesData = null
  }

  setCustomCountriesData(json) {
    this.countriesData = json
  }

  addCountryCode(code: string, dialCode: string, priority) {
    if (!(dialCode in this.countryCodes)) {
      this.countryCodes[dialCode] = []
    }

    const index = priority || 0
    this.countryCodes[dialCode][index] = code
  }

  getAll() {
    if (!this.countries) {
      this.countries = orderBy(this.countriesData || countries.name, ['asc'])
    }

    return this.countries
  }

  getCountryCodes() {
    if (!this.countryCodes.length) {
      this.getAll().map((country) => {
        this.addCountryCode(country.code, country.dial_code, 0)
      })
    }
    return this.countryCodes
  }

  getCountryDataByCode(code) {
    return find(this.getAll(), (country) => country.code == code) || null
  }

  getCountryDataByDialCode(dial_code) {
    return find(this.getAll(), (country) => country.dial_code == dial_code) || null
  }
}

const country = new Country()
export { country as countries }
