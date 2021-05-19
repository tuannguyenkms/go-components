import autobind from 'autobind-decorator'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import Colors from 'themes/Colors'
import { numberMarginOrPadding } from 'themes/Constants'
import XDate from 'xdate'
import { DateComponent } from './Date'
import noop from 'lodash/noop'

const theme = {
  arrowColor: Colors.mainBlack,
  monthTextColor: Colors.mainBlack,
  textMonthFontWeight: '500',
  textMonthFontSize: 15,
  textDayHeaderFontWeight: '500',
  textDayHeaderColor: Colors.labelColor.mediumLight,
  textDayHeaderFrontSize: 16,
  stylesheet: {
    calendar: {
      header: {
        week: {
          paddingHorizontal: 12,
          paddingTop: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 1,
          borderTopColor: Colors.backgroundColor.input,
        },
      },
    },
  },
}
const color = Colors.primaryColor.main
const subColor = Colors.primaryColor.main

interface PropsType {
  handleChangeDate: (fromDate: string, toDate: string) => any
  minDate?: string
}

interface StateType {
  markedDates: {}
  fromDate: string
  toDate: string
}

const renderDayComponent = (props: PropsType) => {
  return <DateComponent {...props} borderRadius={40} dateStyle={{ width: 40, height: 40 }} />
}

class DateRangePicker extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    const currentDate = new XDate().toString('yyyy-MM-dd')
    this.state = {
      markedDates: {
        [currentDate]: {
          startingDay: true,
          color,
        },
      },
      fromDate: currentDate,
      toDate: currentDate,
    }
  }

  @autobind
  onDayPress(day: XDate): void {
    const { handleChangeDate = noop } = this.props
    const { fromDate, toDate } = this.state

    const [markedDates, range] = this.setupMarkedDates(fromDate, toDate, day.dateString)

    if (range > 0) {
      this.setState({
        markedDates,
        toDate: day.dateString,
      })
      handleChangeDate(fromDate, day.dateString)
    } else {
      this.setState({
        markedDates,
        fromDate: day.dateString,
        toDate: null,
      })
      handleChangeDate(null, day.dateString)
    }
  }

  setupMarkedDates = (fromDate: string, toDate: string, selectedDate: string): unknown => {
    if ((!fromDate && !toDate) || toDate === selectedDate || fromDate === selectedDate) {
      return [
        {
          [selectedDate]: {
            startingDay: true,
            color,
          },
        },
        0,
      ]
    }

    const mFromDate = new XDate(fromDate)
    const mToDate = new XDate(selectedDate)
    const range = mFromDate.diffDays(mToDate)
    const markedDates = {}

    if (range >= 0) {
      markedDates[fromDate] = {
        startingDay: true,
        color,
      }

      for (let i = 1; i <= range; i++) {
        const tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
        if (i < range) {
          markedDates[tempDate] = {
            color: subColor,
          }
        } else {
          markedDates[tempDate] = {
            endingDay: true,
            color,
          }
        }
      }
    } else {
      return [
        {
          [selectedDate]: {
            startingDay: true,
            color,
          },
        },
        0,
      ]
    }

    return [markedDates, range]
  }

  render() {
    const { fromDate, toDate, markedDates } = this.state
    const { minDate } = this.props
    return (
      <Calendar
        style={styles.calendars}
        markingType="period"
        theme={theme}
        current={toDate || fromDate}
        markedDates={markedDates}
        onDayPress={this.onDayPress}
        dayComponent={renderDayComponent}
        minDate={minDate}
      />
    )
  }
}

const styles = StyleSheet.create({
  calendars: {
    paddingLeft: numberMarginOrPadding,
    paddingRight: numberMarginOrPadding,
  },
})

export { DateRangePicker }
