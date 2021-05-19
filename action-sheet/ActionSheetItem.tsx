import React, { FunctionComponent, FunctionComponentElement, ReactChild } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Text, ViewStyle } from 'react-native'
import Colors from 'themes/Colors'
import { FONTS } from '@constants'

interface PropsType {
  handleOnPress: () => void
  itemLabel: string
  containerStyle?: ViewStyle
  children?: ReactChild
  renderLabel?: (props: PropsType) => FunctionComponentElement<PropsType>
}

const ActionSheetItem: FunctionComponent<PropsType> = (props: PropsType) => {
  const { renderLabel, containerStyle, handleOnPress, itemLabel, children } = props
  if (renderLabel) {
    return renderLabel(props)
  }

  return (
    <View style={[styles.itemContainer, containerStyle]}>
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <View style={styles.item}>
          {children}
          <View style={styles.textStyle}>
            <Text numberOfLines={1} style={styles.labelText}>
              {itemLabel}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 48,
    width: '100%',
    borderTopWidth: 1,
    borderColor: Colors.borderColor.main,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.34,
    color: '#0e223d',
  },
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
})

export default ActionSheetItem
