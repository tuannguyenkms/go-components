/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Icon } from '@assets'
import { ModalNormal } from '@components/custom-modal/modal-normal'
import { NoResult } from '@components/no-result'
import { FONTS, HIT_SLOP } from '@constants'
import { ISIOS, MYHEIGHT } from '@utils'
import { forEach, isEmpty } from 'lodash'
import React, { FunctionComponent, ReactChild, useCallback, useEffect, useState } from 'react'
import {
  Animated,
  FlatList,
  Keyboard,








  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
// import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'
import { Button } from './Button'
import { Item } from './Item'
import { TagItem } from './TagItem'

const INIT_HEIGHT = MYHEIGHT * 0.6

const keyExtractor = (item: { _id: string }, index: number): string => `${item._id}_${index}`

const ListEmpty = () => {
  return <NoResult type="search" />
}

const dataRender = ({ data, keyword, searchFunction }) => {
  const listMappingKeyword = []
  forEach(data, (item) => {
    if (!item || !item.value) {
      return
    }

    if (searchFunction && searchFunction(item, keyword)) {
      listMappingKeyword.push(item)
    } else if (item.value && item.value.trim().toLowerCase().includes(keyword.trim().toLowerCase())) {
      listMappingKeyword.push(item)
    }
  })
  return listMappingKeyword
}

interface PropsType {
  data?: {
    _id: string
    checked?: boolean
    value: string
    email?: string
  }[]
  style?: ViewStyle
  selectedTitleStyle?: TextStyle
  buttonTextStyle?: ViewStyle
  buttonStyle?: ViewStyle
  title?: string
  onSelect?: (item, index) => void
  onRemoveItem?: (item, index) => void
  popupTitle?: string
  colorTheme?: string
  isSelectSingle?: boolean
  showSearchBox?: boolean
  cancelButtonText?: string
  selectButtonText?: string
  searchPlaceHolderText?: string
  modalStyle?: ViewStyle
  value?: string[]
  renderDropdownItem?: (item: any) => any
  tagWrapper?: any
  searchFunction?: (item: { value: string; email: string }, keyword: string) => void
  showEditIcon?: boolean
  titleIcon?: ReactChild
  hideSelectedItem?: boolean
  renderEmptyComponent?: any
  inputSearchStyle?: TextStyle
  hideFooter?: boolean
  showHeader?: boolean
  headerTitle?: string
  showSelecteItem?: boolean
  showSearchIcon?: boolean
}

export const Select: FunctionComponent<PropsType> = (props: PropsType) => {
  const {
    cancelButtonText = 'Cancel',
    selectButtonText = 'Select',
    searchPlaceHolderText = 'Search',
    colorTheme = Colors.primaryColor.main,
    buttonTextStyle = {},
    buttonStyle = {},
    showSearchBox = true,
    style,
    modalStyle,
    title = 'Select',
    onSelect,
    onRemoveItem,
    popupTitle,
    isSelectSingle,
    selectedTitleStyle,
    renderDropdownItem,
    tagWrapper,
    searchFunction,
    showEditIcon,
    titleIcon,
    hideSelectedItem,
    renderEmptyComponent,
    inputSearchStyle,
    hideFooter,
    showHeader,
    headerTitle,
    showSelecteItem,
    showSearchIcon,
    data: defaultData,
  } = props

  const [animatedHeight] = useState(new Animated.Value(INIT_HEIGHT))
  const { value = [] } = props

  const [show, setShowModal] = useState(false)

  const [preSelectedItem, updatePreSelectedItem] = useState([])
  const [selectedItem, updateSelecteItem] = useState([])
  const [data, updateData] = useState(defaultData)
  const [keyword, updateKeywork] = useState('')

  const showModal = useCallback(() => {
    Keyboard.dismiss()
    setShowModal(true)
  }, [setShowModal])

  useEffect(() => {
    const selectItems = props.data.map((item) => {
      const selectItem = value ? value.includes(item._id) : null
      if (selectItem) {
        return { ...item, checked: true }
      }
      return item
    })
    const preSelectedItems = selectItems.filter((item) => item.checked)
    updatePreSelectedItem(preSelectedItems)
    updateSelecteItem(preSelectedItems)
    updateData(selectItems)
  }, [value])

  const cancelSelection = () => {
    updateKeywork('')

    data.forEach((item) => {
      item.checked = false
      for (const newSelectedItem of preSelectedItem) {
        if (item._id === newSelectedItem._id) {
          item.checked = true
          break
        }
      }
    })

    updateData(data)
    setShowModal(false)
    updateSelecteItem(preSelectedItem)
  }

  const onItemSelected = useCallback(
    (item, isSingle) => {
      const newSelectedItem = []
      item.checked = !item.checked

      for (const index in data) {
        if (data[index]._id === item._id) {
          data[index] = item
        } else if (isSingle) {
          data[index].checked = false
        }
      }
      data.forEach((dataItem) => {
        if (dataItem.checked) {
          newSelectedItem.push(dataItem)
        }
      })
      updateData(data)
      updateSelecteItem(newSelectedItem)
    },
    [updateData, updateSelecteItem, data]
  )

  const renderItem = ({ item }) => {
    if (renderDropdownItem) {
      return renderDropdownItem({
        item,
        isSelectSingle,
        colorTheme,
        onItemSelected,
      })
    }

    return (
      <Item
        item={item}
        idx={item.index}
        colorTheme={colorTheme}
        isSelectSingle={isSelectSingle}
        onItemSelected={onItemSelected}
      />
    )
  }

  const handleSubmit = useCallback(() => {
    updateKeywork('')
    const selectedIds = []
    const selectedObjectItems = []
    forEach(selectedItem, (item) => {
      selectedIds.push(item._id)
      selectedObjectItems.push(item)
    })
    onSelect && onSelect(selectedIds, selectedObjectItems)
    setShowModal(false)
    updatePreSelectedItem(selectedItem)
  }, [selectedItem, onSelect, setShowModal, updateKeywork, updatePreSelectedItem])

  const handleRemoveTag = useCallback(
    (tag) => {
      const newSelectedItem = []
      const selectedIds = []
      const selectedObjectItems = []
      forEach(data, (item) => {
        if (item._id === tag._id) {
          item.checked = false
        }
        if (item.checked) {
          newSelectedItem.push(item)
          selectedIds.push(item._id)
          selectedObjectItems.push(item)
        }
      })
      updateData(data)
      updatePreSelectedItem(newSelectedItem)
      updateSelecteItem(newSelectedItem)
      onRemoveItem && onRemoveItem(selectedIds, selectedObjectItems)
    },
    [data, updateData, preSelectedItem, updateSelecteItem]
  )

  const inset = useSafeAreaInsets()
  const isDefaultStyle = preSelectedItem.length <= 0 ? { opacity: 1 } : {}

  const renderEmptyResult = renderEmptyComponent || ListEmpty

  return (
    <TouchableOpacity onPress={showModal} activeOpacity={0.7} style={[styles.container, style]}>
      <ModalNormal visible={show} style={[styles.modalStyle]}>
        <Animated.View style={[styles.modalContainer, modalStyle, { paddingBottom: inset.bottom }]}>
          {showHeader ? (
            <View style={styles.header}>
              <View style={styles.headerIcon}>
                <TouchableWithoutFeedback onPress={() => cancelSelection()} hitSlop={HIT_SLOP}>
                  <View style={styles.closeIcon}>
                    <Icon name="angle-left" size={36} color={designColors.darkBlueGrey} type="light" />
                  </View>
                </TouchableWithoutFeedback>
                <Text style={styles.headerTitle}>{headerTitle}</Text>
              </View>
              <TouchableWithoutFeedback onPress={handleSubmit} hitSlop={HIT_SLOP}>
                <View>
                  <Text style={styles.doneButton}>DONE</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <>
              <View>
                <Text style={[styles.title, { color: colorTheme }]}>{popupTitle || title}</Text>
              </View>
              <View style={styles.line} />
            </>
          )}
          {showSearchBox ? (
            <View style={styles.inputSearchContainer}>
              {showSearchIcon && <Icon name="search" size={24} color={designColors.slateBlue} />}
              <TextInput
                underlineColorAndroid="transparent"
                returnKeyType="done"
                style={[styles.inputKeyword, inputSearchStyle]}
                placeholder={searchPlaceHolderText}
                selectionColor={colorTheme}
                onChangeText={(updateKeyword) => updateKeywork(updateKeyword)}
                onFocus={() => {
                  Animated.spring(animatedHeight, {
                    toValue: INIT_HEIGHT + (ISIOS ? MYHEIGHT * 0.2 : 0),
                    friction: 7,
                    useNativeDriver: false,
                  }).start()
                }}
                onBlur={() => {
                  Animated.spring(animatedHeight, {
                    toValue: INIT_HEIGHT,
                    friction: 7,
                    useNativeDriver: false,
                  }).start()
                }}
              />
            </View>
          ) : null}
          <View style={styles.line} />
          {showSelecteItem && !isEmpty(selectedItem) && (
            <>
              <View style={styles.selectedUserContainer}>
                <ScrollView
                  contentContainerStyle={[styles.tagWrapper, tagWrapper]}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always"
                  onResponderTerminationRequest={() => false}
                >
                  {selectedItem.map((tag) => {
                    return (
                      <TagItem
                        key={tag.value}
                        onRemoveTag={() => handleRemoveTag(tag)}
                        tagName={tag.value}
                        tagIcon={tag.profileImageUrl}
                      />
                    )
                  })}
                </ScrollView>
              </View>
              <View style={styles.line} />
            </>
          )}
          <FlatList
            style={styles.listOption}
            data={dataRender({ data, keyword, searchFunction })}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={renderEmptyResult}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          />
          {!hideFooter && (
            <View style={styles.buttonWrapper}>
              <Button
                onPress={() => cancelSelection()}
                title={cancelButtonText}
                textColor={colorTheme}
                backgroundColor={Colors.mainWhite}
                textStyle={buttonTextStyle}
                style={[styles.button, buttonStyle, styles.cancelButton]}
              />
              <Button
                onPress={handleSubmit}
                title={selectButtonText}
                backgroundColor={colorTheme}
                textStyle={buttonTextStyle}
                textColor={Colors.mainWhite}
                style={[styles.button, buttonStyle, styles.selecteButton]}
              />
            </View>
          )}
        </Animated.View>
      </ModalNormal>
      {preSelectedItem.length > 0 && !hideSelectedItem ? (
        isSelectSingle ? (
          <>
            {titleIcon}
            <Text style={[styles.selectedTitlte, selectedTitleStyle, { color: Colors.labelColor.main }]}>
              {preSelectedItem[0].value}
            </Text>
          </>
        ) : (
          <ScrollView
            contentContainerStyle={[styles.tagWrapper, tagWrapper]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            onResponderTerminationRequest={() => false}
          >
            {preSelectedItem.map((tag) => {
              return (
                <TagItem
                  key={tag.value}
                  onRemoveTag={() => handleRemoveTag(tag)}
                  tagName={tag.value}
                  tagIcon={tag.profileImageUrl}
                />
              )
            })}
          </ScrollView>
        )
      ) : (
        <>
          {titleIcon}
          <Text style={[styles.selectedTitlte, selectedTitleStyle, isDefaultStyle]}>
            {`${title} ${hideSelectedItem
              ? `${preSelectedItem.length > 0 ? `(${preSelectedItem.length})`
                : ''}` : ''}`}
          </Text>
        </>
      )}
      {showEditIcon && (
        <View style={styles.rightIcon}>
          <View style={styles.editIcon}>
            <Icon name="pen" color="#0ec648" size={16} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: designColors.bird1,
    paddingVertical: 4,
  },
  modalContainer: {
    flex: 1,
    marginTop: 20,
    paddingTop: 16,
    backgroundColor: designColors.white100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    width: '100%',
    textAlign: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: designColors.dark100,
    opacity: 0.03,
    marginTop: 4,
    marginBottom: 8,
  },
  inputKeyword: {
    padding: 0,
    paddingLeft: 8,
    flex: 1,
    height: 36,
  },
  buttonWrapper: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 36,
    flex: 1,
  },
  selectedTitlte: {
    color: designColors.bird85,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: FONTS.MEDIUM,
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listOption: {
    paddingHorizontal: 24,
  },
  cancelButton: {
    marginRight: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: Colors.primaryColor.main,
  },
  selecteButton: {
    marginLeft: 5,
    marginRight: 10,
    color: Colors.mainWhite,
  },
  closeIcon: {
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.3,
    color: designColors.darkSlateBlue,
  },
  doneButton: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 15,
    lineHeight: 20,
    color: designColors.GreenText,
    paddingRight: 20,
  },
  selectedUserContainer: {
    height: 76,
    paddingHorizontal: 16,
  },

  inputSearchContainer: {
    flexDirection: 'row',
    borderRadius: 18,
    height: 36,
    backgroundColor: designColors.paleGrey,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    alignItems: 'center',
  },
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerIcon: { flexDirection: 'row', alignItems: 'center' },
  editIcon: {
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designColors.prim15,
    width: 24,
    height: 24,
    marginTop: 8,
  },
  rightIcon: { height: '100%' },
})
