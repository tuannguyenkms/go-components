import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { designColors } from 'themes/design-color'

const windowWidth = Dimensions.get('window').width

interface DayProps {
  isActive
  click
  status?
  active
  isCurrentDate?
  dayNumber
  dateNameStyle
  dayInWeekName
  dateNumberStyle
  textHightlightStyle
  activeDayBorderColor
}
const StatusColor = {
  PENDING: designColors.orange100,
  APPROVED: designColors.GOprim100,
  REJECTED: designColors.red100,
}
export default  (props: DayProps) => {
  const  {
    click,
    status,
    active,
    isActive,
    dayNumber,
    dateNameStyle,
    isCurrentDate,
    dayInWeekName,
    dateNumberStyle,
    textHightlightStyle,
    activeDayBorderColor,
  } = props
  return (
    <TouchableOpacity
      disabled={!isActive}
      onPress={click}
      style={[styles.Day]}
    >
      <Text style={[{ color: '#7d95a8', fontSize: 12 }, dateNameStyle]}>
        {dayInWeekName}
      </Text>
      <View style={[{ marginTop: 16 }, active && {
        alignItems: 'center', justifyContent: 'center', height: 28, width: 28,
        borderRadius: 14, backgroundColor: activeDayBorderColor
      }]}>
        <Text style={[
          { fontSize: 13, lineHeight: 28 },
          dateNumberStyle,
          !isActive && { color: '#c3c3c3' },
          isCurrentDate &&  { color:  designColors.GOprim100 },
          active && [{ color: '#ffffff' }, textHightlightStyle],
        ]}
        >
          {dayNumber}
        </Text>
      </View>
      {status && !active &&  <View style={[styles.dot, status && { backgroundColor: StatusColor[status] }]}/>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Day: {
    width: windowWidth / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3
  }
})