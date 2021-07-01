import { ScheduleClockBasedType } from '@constants'
import { MYWIDTH } from '@utils'
import { isString, isObject, isNumber, isUndefined } from 'lodash'
import noop from 'lodash/noop'
import moment from 'moment'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { CalendarList } from 'react-native-calendars'
import Icon from 'react-native-fontawesome-pro'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'
import XDate from 'xdate'
import { DateComponent } from './Date'
import styles from './date-list-styles'

const theme = {
  arrowColor: Colors.mainBlack,
  monthTextColor: Colors.mainBlack,
  textMonthFontWeight: '500',
  textMonthFontSize: 15,
  textDayHeaderFontWeight: '500',
  textDayHeaderColor: Colors.labelColor.mediumLight,
  textDayHeaderFrontSize: 16,
  'stylesheet.calendar.main': {
    monthView: {
      flex: 0,
      marginLeft: -16
    },
    week: {
      marginTop: 5,
      width: MYWIDTH - 64,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }
}
const color = Colors.primaryColor.main
const subColor = Colors.primaryColor.main

interface PropsType {
  handleChangeDate: (fromDate: any, toDate: any) => any
  checkIsHoliday?: (date: any) => boolean
  checkIsWorkingDate?: (date: any) => number | { hours: number } | ScheduleClockBasedType
  from?: any
  to?: any
  type: 'disable' | 'hide'
  calendarHeight?: number
  checkDurationBased?: () => boolean
}

interface StateType {
  markedDates: any
  fromDate: string
  toDate: string
}

type HeaderProps = {
  month: any
  onPressArrowLeft: any
  onPressArrowRight: any
}
let heightHeader = 0
const onLayoutHeader = (e) => {
  heightHeader = e.nativeEvent.layout.height
}
const CustomHeader = (props: HeaderProps) => {
  const { month, onPressArrowLeft, onPressArrowRight } = props
  return (
    <View onLayout={onLayoutHeader} style={{ marginLeft: -16, width: MYWIDTH - 64, paddingHorizontal: 16 }}>
      <View style={styles.headerStyle}>
        <View style={styles.monthStyles}>
          <Text style={styles.monthName}>{month.toString('MMMM yyyy')}</Text>
        </View>
        <View style={styles.headerInfo}>
          <TouchableOpacity onPress={() => { onPressArrowLeft(undefined, month) }}  >
            <View style={styles.iconStyles}>
              <Icon name="chevron-left" size={10} color={designColors.dark100} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { onPressArrowRight(undefined, month) }} >
            <View style={[styles.iconStyles, styles.leftIcon]}>
              <Icon name="chevron-right" size={10} color={designColors.dark100} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekContainer}>
        <Text style={styles.dayName}>M</Text>
        <Text style={styles.dayName}>T</Text>
        <Text style={styles.dayName}>W</Text>
        <Text style={styles.dayName}>T</Text>
        <Text style={styles.dayName}>F</Text>
        <Text style={styles.dayName}>S</Text>
        <Text style={styles.dayName}>S</Text>
      </View>
    </View>
  )
}

class DateRangeCalendarList extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    if (props.from && props.to) {
      const fromDate = props.from ? new XDate(props.from).toString('yyyy-MM-dd') : ''
      const toDate = props.to ? new XDate(props.to).toString('yyyy-MM-dd') : ''
      if (props.to) {
        const [markedDates, range] = this.setupMarkedDates(fromDate, fromDate, toDate)
        if (range > 0) {
          this.state = {
            markedDates,
            fromDate,
            toDate,
          }
        } else {
          this.state = {
            markedDates,
            fromDate,
            toDate: null,
          }
        }
      }
    } else if (isString(props.from) && !props.to) {
      const fromDate = new XDate(props.from).toString('yyyy-MM-dd')
      this.state = {
        markedDates: {
          [fromDate]: {
            startingDay: true,
            color,
          },
        },
        fromDate,
        toDate: fromDate,
      }
    } else if (!props.from || !props.to) {
      this.state = {
        markedDates: {},
        fromDate: '',
        toDate: '',
      }
    }
  }

  onDayPress = (day: XDate) => {
    const { handleChangeDate = noop, checkIsHoliday, checkIsWorkingDate, checkDurationBased } = this.props
    const { fromDate, toDate } = this.state
    const isDurationBased = checkDurationBased()
    if (checkIsHoliday && checkIsHoliday(moment(day.dateString))) {
      return
    }

    if (checkIsWorkingDate) {
      const checkDate = checkIsWorkingDate(moment(day.dateString))
      if (isObject(checkDate) &&
        ((isDurationBased && checkDate.hours === 0) ||
          (!isDurationBased && isUndefined(checkDate.total)))) {
        return
      }
      if (isNumber(checkDate) && checkDate === 0) {
        return
      }
    }

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

  setupMarkedDates = (fromDate: string, toDate: string, selectedDate: string): [any, number] => {
    const markedDates = {}
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

  renderDayComponent = (props) => {
    const parrentProps = this.props
    return (
      <DateComponent
        {...props}
        borderRadius={28}
        type={parrentProps.type}
        dateStyle={styles.dateStyles}
        checkIsHoliday={parrentProps.checkIsHoliday}
        checkIsWorkingDate={parrentProps.checkIsWorkingDate}
      />
    )
  }

  render(): JSX.Element {
    const { from, to } = this.props
    const { markedDates } = this.state
    const curDate = to || from
    const curDateFormated = moment(curDate).format('YYYY-MM')
    return (
      <CalendarList
        horizontal
        firstDay={1}
        theme={theme}
        markingType="custom"
        pastScrollRange={50}
        hideExtraDays={false}
        scrollEnabled={false}
        current={curDateFormated}
        futureScrollRange={50}
        style={styles.calendars}
        markedDates={markedDates}
        showScrollIndicator={false}
        customHeader={CustomHeader}
        onVisibleMonthsChange={noop}
        calendarWidth={MYWIDTH - 16}
        onDayPress={this.onDayPress}
        calendarHeight={48 * 7 + heightHeader}
        keyboardShouldPersistTaps="always"
        dayComponent={this.renderDayComponent}
      />
    )
  }
}

export { DateRangeCalendarList }