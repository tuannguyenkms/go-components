import { Icon } from '@assets'
import { HIT_SLOP } from '@constants'
import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Colors from 'themes/Colors'

const Item = (props) => {
  const { colorTheme, isSelectSingle, item, idx, onItemSelected } = props
  return (
    <TouchableWithoutFeedback key={idx} onPress={() => onItemSelected(item, isSelectSingle)} hitSlop={HIT_SLOP}>
      <View style={styles.itemWrapper}>
        <Text style={[styles.itemText]}>{item.value}</Text>
        <Icon
          name={item.checked ? 'check-circle' : 'circle'}
          color={item.checked ? colorTheme : '#777777'}
          size={20}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
export { Item }

const styles = StyleSheet.create({
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor.main,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  itemIcon: {
    width: 30,
    textAlign: 'right',
  },
})
