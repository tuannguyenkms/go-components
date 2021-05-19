import { Select } from '@components/multi-select/Select'
import { FONTS } from '@constants'
import React, { useCallback, FunctionComponent, ReactNode } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text, ViewStyle } from 'react-native'
import Colors from 'themes/Colors'
import { AvatarNew } from '@components/avatar-new'
import { designColors } from 'themes/design-color'
import { ImageEmptyEmployee } from '@assets'
import { noop } from 'lodash'

const PRIMARY_COLOR = Colors.primaryColor.main

interface PropsType {
  data?: {
    _id: string
    checked?: boolean
    value: string
    email?: string
  }[]
  onChange?: (value: string[]) => void
  value?: string[]
  title?: string
  headerTitle?: string
  style?: ViewStyle
}

const Empty: ReactNode = () => {
  const listEmptyTitle = 'Try using different keywords or filters'
  return (
    <View style={styles.body}>
      <View style={styles.emptyContainer}>
        <View>
          <ImageEmptyEmployee width={102} height={102} />
        </View>
      </View>
      <Text style={styles.emptyState}>No results</Text>
      <Text style={styles.label}>{listEmptyTitle}</Text>
    </View>
  )
}

const renderDropdownItem = (props) => {
  const { item, idx, onItemSelected } = props
  if (item.checked) {
    return null
  }
  return (
    <TouchableWithoutFeedback key={idx} onPress={() => onItemSelected(item)}>
      <View style={styles.itemWrapper}>
        <View style={styles.itemContainer}>
          <AvatarNew size={45} image={item.profileImageUrl} style={styles.containerAvatar} />
          <Text style={styles.itemText} numberOfLines={1}>
            {item.value}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const searchFunction = (item: { value: string; email: string }, keyword: string) => {
  return (
    item.value &&
    (item.value.trim().toLowerCase().includes(keyword.trim().toLowerCase()) ||
      item.email.trim().toLowerCase().includes(keyword.trim().toLowerCase()))
  )
}

const SelectUser: FunctionComponent<PropsType> = ({
  data,
  onChange,
  value,
  title = 'Add people to notify (optional)',
  headerTitle = 'People to notify',
  style = {},
}: PropsType) => {
  const handleOnChange = useCallback(
    (selectValue) => {
      onChange(selectValue)
    },
    [onChange]
  )
  return (
    <View style={styles.container}>
      <Select
        title={title}
        value={value}
        colorTheme={PRIMARY_COLOR}
        data={data}
        onSelect={handleOnChange}
        onRemoveItem={handleOnChange}
        renderDropdownItem={renderDropdownItem}
        searchFunction={searchFunction}
        style={styles.selectedStyle}
        selectedTitleStyle={{ ...styles.titles, ...style }}
        renderEmptyComponent={Empty}
        inputSearchStyle={styles.inputSearchStyle}
        hideFooter
        showHeader
        searchPlaceHolderText="People"
        headerTitle={headerTitle}
        showSelecteItem
        showSearchIcon
        tagWrapper={{ paddingLeft: 12, paddingTop: 0, ...style }}
      />
    </View>
  )
}

SelectUser.defaultProps = {
  data: [],
  value: [],
  onChange: noop,
}

export { SelectUser }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titles: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: FONTS.REGULAR,
    letterSpacing: -0.32,
  },
  itemWrapper: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.32,
    color: designColors.dark100,
    flex: 1,
    paddingHorizontal: 8,
    fontFamily: FONTS.REGULAR,
  },

  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerAvatar: {
    width: 28,
    height: 28,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: Colors.primaryColor.light,
  },

  inputSearchStyle: {
    padding: 0,
  },
  selectedStyle: {
    borderColor: Colors.mainWhite,
    paddingHorizontal: 0,
  },
  label: {
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: -0.37,
    color: designColors.greyBlue,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  emptyState: {
    fontFamily: FONTS.REGULAR,
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: -0.27,
    color: designColors.darkSlateBlue,
    padding: 8,
  },
  emptyContainer: { width: 102, height: 102, backgroundColor: designColors.bird2, borderRadius: 51 },
  body: { justifyContent: 'center', alignItems: 'center', flex: 1, paddingTop: 40 },
})
