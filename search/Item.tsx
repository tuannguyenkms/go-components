import React from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'
import { Icon } from '@assets'
import { FONTS } from '@constants'

const ICON_SIZE = 24

const Item = (props) => {
  const { isSingle, item, idx, onItemSelected, name } = props
  const isSelected = item.checked
  return (
    <TouchableWithoutFeedback
      key={idx}
      onPress={() => {
        onItemSelected(item)
      }}
    >
      <View style={styles.itemWrapper}>
        {!isSingle ? (
          isSelected ? (
            <View style={styles.multipleSelectIcon}>
              <Icon name={'check'} color={designColors.white} size={26} />
            </View>
          ) : (
            <View style={styles.square} />
          )
        ) : (
          <View />
        )}
        <Text style={[styles.itemText]} numberOfLines={1}>
          {item.value || name}
        </Text>
        {isSingle && isSelected ? <Icon name={'check'} color={designColors.darkBlueGrey} size={26} /> : <View />}
      </View>
    </TouchableWithoutFeedback>
  )
}
export { Item }

const styles = StyleSheet.create({
  itemWrapper: {
    height: 44,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    lineHeight: 22,
    letterSpacing: -0.32,
    color: designColors.darkSlateBlue,
    flex: 1,
  },
  itemIcon: {
    width: 30,
    textAlign: 'right',
  },
  singleSelectIcon: {
    borderWidth: 1,
    shadowColor: '#14d747',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: ICON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  multipleSelectIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    backgroundColor: designColors.coolGreen,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#14d747',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginRight: 12,
  },
  innerCircle: {
    borderRadius: ICON_SIZE / 2,
    width: ICON_SIZE - 10,
    height: ICON_SIZE - 10,
    backgroundColor: Colors.mainWhite,
  },
  square: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: 4,
    borderColor: designColors.cloudyBlue,
    borderWidth: 1.5,
    marginRight: 12,
  },
  singleSelect: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: 'center',
  },
})
