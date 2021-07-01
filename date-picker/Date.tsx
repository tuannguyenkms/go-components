import { LocalSetting } from '@configuration'
import { get } from 'lodash'
import { observer } from 'mobx-react'
import moment from 'moment'
import React, { useCallback, useMemo } from 'react'
import { Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'
import styles from './date-styles'

interface PropsType {
  onPress?: (day: any) => any
  date?: {
    day: string
    dateString: string
  }
  marking?: {
    startingDay: boolean
    endingDay: boolean
    color: string
    marking: boolean
    subMarking: boolean
  }
  state?: string
  dateStyle?: ViewStyle
  borderRadius?: number
  checkIsHoliday?: (date: any) => boolean
  checkIsWorkingDate?: (date: any) => number
  type: 'disable' | 'hide'
}

const subColor = Colors.backgroundColor.sub

const DateComponent = observer((props: PropsType) => {
  const {
    marking = {
      color: undefined,
      startingDay: undefined,
      endingDay: undefined,
      marking: undefined,
      subMarking: undefined,
    },
    date = { day: undefined, dateString: undefined },
    state,
    dateStyle,
    borderRadius = 2,
    checkIsHoliday,
    checkIsWorkingDate,
    type,
  } = props

  const containerStyle = {
    backgroundColor: marking ? marking.color : Colors.mainWhite,
    borderRadius: marking.startingDay || marking.endingDay || borderRadius ? borderRadius : 0,
  }

  const isHoliday = useMemo(() => checkIsHoliday && checkIsHoliday(moment(date.dateString)), [date.dateString])
  const workingDate = useMemo(() => checkIsWorkingDate && checkIsWorkingDate(moment(date.dateString)), [
    date.dateString,
  ])
  const isWorkingDate = get(workingDate, 'total') || get(workingDate, 'hours') > 0

  const dayColor = isHoliday ? designColors.red100 : !isWorkingDate ? designColors.bird85 : designColors.dark100

  const dateColor = state === 'today' ? designColors.goPrim100 : dayColor
  const textColor = {
    color: marking && marking.color ? designColors.white100 : dateColor,
  }

  const currentTimeStamp = get(date, 'timestamp')
  const minDateTimeStamp = new Date(LocalSetting.joinedDate).getTime()

  const disabledStyle = {
    opacity: (state === 'disabled' || minDateTimeStamp > currentTimeStamp) ? 0.3 : 1,
  }
  const handlePress = useCallback(() => {
    props.onPress && props.onPress(props.date)
  }, [])
  if (type === 'hide' && state === 'disabled') return <View />
  return (
    <View style={[styles.date, { backgroundColor: marking ? Colors.mainWhite : subColor }, dateStyle]}>
      <TouchableWithoutFeedback disabled={minDateTimeStamp > currentTimeStamp} onPress={handlePress}>
        <View style={[styles.dateView, containerStyle]}>
          <Text style={[styles.textLabel, state === 'today' && styles.todayLabel, disabledStyle, textColor]}>
            {date.day}
          </Text>
          {marking.marking && (
            <View style={styles.marking}>
              <View style={[styles.dot, styles.visibleDot]} />
            </View>
          )}
          {marking.subMarking && (
            <View style={styles.subMarking}>
              <View style={[styles.dot, styles.subVisibleDot]} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
})

export { DateComponent }
