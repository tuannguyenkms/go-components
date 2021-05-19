import { CalendarIcon } from '@assets'
import React from 'react'
import { Text, TouchableWithoutFeedback, View, StyleSheet, Keyboard, TextStyle } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Colors from 'themes/Colors'
import { FONTS } from '@constants'
import { dateToString } from 'utils/date'
import { Appearance } from 'react-native-appearance'
import { getUTCString } from 'utils/date/date-to-string'

interface PropsType {
  value?: string
  onChange?: (value: string) => void
  validate?: (value: Date) => boolean
  maximumDate?: Date
  placeHolder?: string
  labelStyle?: TextStyle
  hideIcon?: boolean
}

interface StateType {
  pickedDate: Date
  isDateTimePickerVisible: boolean
}

class SimpleDatePicker extends React.Component<PropsType, StateType> {
  constructor(props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
      pickedDate: props.value ? new Date(dateToString(props.value)) : new Date(),
    }
  }

  showDateTimePicker = () => {
    Keyboard.dismiss()
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }

  handleDatePicked = (date: Date) => {
    const changeValue = getUTCString(date)

    const { onChange, validate } = this.props
    if (validate) {
      const result = validate(date)
      if (result) {
        this.hideDateTimePicker()
        setTimeout(() => {
          onChange(changeValue)
        }, 500)
        return
      }
    }
    this.setState({ pickedDate: date })

    this.hideDateTimePicker()
    setTimeout(() => {
      onChange(changeValue)
    }, 500)
  }

  render() {
    const colorScheme = Appearance.getColorScheme()
    const { pickedDate, isDateTimePickerVisible } = this.state
    const { maximumDate, placeHolder = 'Select Date', value, labelStyle, hideIcon } = this.props

    const isDefaultStyle = !value ? { opacity: 0.7 } : {}

    return (
      <View style={styles.view}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.showDateTimePicker}>
            <View style={styles.textViewDate}>
              <Text style={[styles.textDate, isDefaultStyle, labelStyle]} numberOfLines={1}>
                {value ? dateToString(getUTCString(pickedDate)) : placeHolder}
              </Text>
              {!hideIcon && <CalendarIcon fill={Colors.primaryColor.main} />}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <DateTimePickerModal
          date={pickedDate}
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          isDarkModeEnabled={colorScheme === 'dark'}
          maximumDate={maximumDate}
        />
      </View>
    )
  }
}
export default SimpleDatePicker

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textViewDate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDate: {
    flex: 1,
    fontFamily: FONTS.REGULAR,
    lineHeight: 20,
    fontSize: 15,
    letterSpacing: -0.32,
    color: '#0e223d',
  },
})
