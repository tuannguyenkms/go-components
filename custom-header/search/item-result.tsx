import { FlagIcon, icNewsPaper } from '@assets'
import { FONTS } from '@constants'
import { get } from 'lodash'
import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'
import { formatDateLocalTime } from 'utils/date'

interface ItemResultProps {
  item
  onPress
  onClose
}

export const ItemResult = ({ item,  onPress, onClose }:ItemResultProps) => {
  const isEmergency = get(item, 'isEmergency')
  const title = get(item, 'title') || ''
  const publishedAt = get(item, 'publishedAt') || ''
  const shortDate = formatDateLocalTime(publishedAt)
  const onPressCall = useCallback(() => {
    onClose()
    onPress(item)
  }, [item])
  return (
    <TouchableNativeFeedback onPress={onPressCall}>
      <View style={[styles.row, styles.item]}>
        <View style={styles.icon}>{icNewsPaper(25, '#5f7d95')}</View>
        <View style={styles.containerContent}>
          <View style={[styles.row]}>
            {isEmergency && <FlagIcon size={16} color={designColors.paleRed} />}
            <Text numberOfLines={2} style={[styles.textTitleItem, isEmergency && { marginLeft: 8 }]}>
              {title}
            </Text>
          </View>
          <Text style={styles.textDateItem}>{shortDate}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  item: {},
  containerContent: {
    marginLeft: 10,
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: designColors.paleGrey,
  },
  textTitleItem: {
    fontSize: 15,
    lineHeight: 20,
    color: '#0e223d',
    letterSpacing: -0.32,
  },
  textDateItem: {
    fontSize: 12,
    lineHeight: 22,
    color: Colors.primary,
    fontFamily: FONTS.MEDIUM,
  },
})
