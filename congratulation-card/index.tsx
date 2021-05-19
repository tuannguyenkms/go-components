import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { LocalSetting } from '@configuration'
import { numberMarginOrPadding } from 'themes/Constants'
import { FONTS } from '@constants'
import Colors from 'themes/Colors'
import get from 'lodash/get'
import moment from 'moment'
import { StarIcon } from '@assets'

const CongratulationCard: React.FunctionComponent = () => {
  const joinedDate = get(LocalSetting, 'myProfile.JOB_INFO.joinedDate') || '_'
  const joinedDateFormated = moment(joinedDate).toISOString()
  const diffJoinDate = moment().local().diff(joinedDateFormated, 'days')
  const formatJoinDate = moment(joinedDate).local().fromNow(true)
  let title = ``
  let days = ``
  const firstName = get(LocalSetting, 'myProfile.BASIC_INFO.firstName') || '_'
  const fullName = `${firstName}`
  if (diffJoinDate > 9) {
    title = `${fullName}, we’ve been together for ${formatJoinDate}`
  } else {
    switch (diffJoinDate) {
      case 0:
        days = '1st'
        break
      case 1:
        days = '2nd'
        break
      case 2:
        days = '3rd'
        break
      case 3:
        days = '4th'
        break
      case 4:
        days = '5th'
        break
      case 5:
        days = '6th'
        break
      case 6:
        days = '7th'
        break
      case 7:
        days = '8th'
        break
      case 8:
        days = '9th'
        break
      case 9:
        days = '10th'
        break
      default:
        days = '1st'
        break
    }
    title = `It’s your ${days} day with us`
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0.5 }}
      end={{ x: 0.5, y: 0.5 }}
      colors={['#ff6f00', '#f79f1c']}
      style={styles.container}
    >
      <View style={styles.containerIcon}>
        <StarIcon size={20} color="#fff" />
      </View>
      <Text style={styles.textTitle}>{title}</Text>
    </LinearGradient>
  )
}
export { CongratulationCard }
const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginTop: 12,
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 12,
    alignItems: 'center',
    padding: numberMarginOrPadding,
    backgroundColor: Colors.mainWhite,
  },
  containerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffb316',
  },
  textTitle: {
    flex: 1,
    fontSize: 15,
    color: '#fff',
    lineHeight: 20,
    fontFamily: FONTS.SEMI_BOLD,
    marginLeft: numberMarginOrPadding,
  },
})
