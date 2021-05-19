/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { icEdit } from '@assets'
import { NoResult } from '@components/no-result'
import Search from '@components/search'
import { FONTS, HIT_SLOP } from '@constants'
import { height, MYHEIGHT } from '@utils'
import { cloneDeep, forEach, get } from 'lodash'
import React, { FunctionComponent, ReactChild, useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,







  Keyboard, StyleSheet,
  Text,



  TextStyle, TouchableOpacity,



  TouchableWithoutFeedback, View,
  ViewStyle
} from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'

const HEADER_MAX_HEIGHT = 52
const HEADER_MIN_HEIGHT = 0
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

const renderEmpty = () => (
  <View style={[styles.emptyState, { height: height(45) }]}>
    <NoResult noImage type="search"/>
  </View>
)

const EditIcon = () => <View style={{}}>{icEdit(20, Colors.primaryColor.main)}</View>

const DefaultItem = (props: {
  titleIcon: React.ReactNode
  title: string
  hideSelectedItem: boolean
  totalItem: number
}) => {
  const { titleIcon, title, hideSelectedItem, totalItem } = props
  return (
    <>
      {titleIcon}
      <Text style={[styles.selectedTitlte, styles.defaultValue]} numberOfLines={1}>{`${title} ${
        hideSelectedItem ? `${totalItem > 0 ? `(${totalItem})` : ''}` : ''
      }`}</Text>
    </>
  )
}

const SelectItem = (props: {
  titleIcon: React.ReactNode
  selectedTitleStyle?: any
  isSelectSingle: boolean
  preSelectedItem: any
}) => {
  const { titleIcon, selectedTitleStyle, isSelectSingle, preSelectedItem } = props
  const value = get(preSelectedItem, '[0].value')
  return isSelectSingle ? (
    <>
      {titleIcon}
      <Text style={[styles.selectedTitlte, selectedTitleStyle]}>{value}</Text>
    </>
  ) : (
    <Text style={[styles.selectedTitlte, selectedTitleStyle]}>
      {preSelectedItem.map((item) => item.value).join(', ')}
    </Text>
  )
}

const MultipleSelectView = (props: {
  totalItem: number
  hideSelectedItem: boolean
  titleIcon: ReactChild
  isSelectSingle
  preSelectedItem
  title: string
}) => {
  const { totalItem, hideSelectedItem, titleIcon, isSelectSingle, preSelectedItem, title } = props
  return (
    <View style={styles.containerView}>
      <View style={styles.preSelectStyle}>
        {totalItem > 0 && !hideSelectedItem ? (
          <SelectItem titleIcon={titleIcon} isSelectSingle={isSelectSingle} preSelectedItem={preSelectedItem} />
        ) : (
          <DefaultItem titleIcon={titleIcon} title={title} hideSelectedItem={hideSelectedItem} totalItem={totalItem} />
        )}
      </View>
      <EditIcon />
    </View>
  )
}

const Footer = (props: { cancelSelection: any; handleSubmit: any }) => {
  const inset = useSafeAreaInsets()
  const { cancelSelection, handleSubmit } = props
  return (
    <View style={[styles.buttonWrapper, { paddingBottom: inset.bottom + 12 }]}>
      <TouchableWithoutFeedback onPress={() => cancelSelection()} hitSlop={HIT_SLOP}>
        <Text style={styles.cancelButton}>Cancel</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleSubmit} hitSlop={HIT_SLOP}>
        <View style={styles.selectButton}>
          <Text style={styles.selecteButton}>Select</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

interface PropsType {
  data?: {
    _id: string
    checked?: boolean
    value: string
    email?: string
  }[]
  style?: ViewStyle
  title?: string
  onSelect?: (item, index) => void
  isSelectSingle?: boolean
  showSearchBox?: boolean
  searchPlaceHolderText?: string
  value?: string
  searchFunction?: () => void
  titleIcon?: ReactChild
  hideSelectedItem?: boolean
  inputSearchStyle?: TextStyle
}

export const MultipleSelect: FunctionComponent<PropsType> = (props: PropsType) => {
  const {
    searchPlaceHolderText = 'Search',
    showSearchBox = true,
    style,
    title = 'Select',
    onSelect,
    isSelectSingle,
    searchFunction,
    titleIcon,
    hideSelectedItem,
    inputSearchStyle,
    data: defaultData,
    value: defautValue,
  } = props

  const { value = [] } = props
  const listRef = useRef(null)

  const [show, setShowModal] = useState(false)
  const refInput = useRef(null)

  const [preSelectedItem, updatePreSelectedItem] = useState([])
  const [selectedItem, updateSelecteItem] = useState([])
  const [data, updateData] = useState(cloneDeep(defaultData))
  const [keyword, updateKeywork] = useState('')

  const showModal = useCallback(() => {
    Keyboard.dismiss()
    setShowModal(true)
  }, [setShowModal])

  useEffect(() => {
    const clonedData = cloneDeep(props.data)
    const selectItems = clonedData.map((item) => {
      const selectItem = value ? value.includes(item._id) : null
      if (selectItem) {
        return { ...item, checked: true }
      }
      return item
    })
    if (data.length >= 20) {
      setTimeout(() => {
        refInput && refInput.current && refInput.current.focus && refInput.current.focus()
      }, 100)
    }
    const preSelectedItems = selectItems.filter((item) => item.checked)
    updatePreSelectedItem(preSelectedItems)
    updateSelecteItem(preSelectedItems)
    updateData(selectItems)
  }, [defaultData, defautValue])
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

  const handleSubmitSingle = useCallback(
    (item) => {
      const newSelectedItem = []
      item.checked = !item.checked
      for (const index in data) {
        if (data[index]._id === item._id) {
          data[index] = item
        } else if (isSelectSingle) {
          data[index].checked = false
        }
      }
      data.forEach((dataItem) => {
        if (dataItem.checked) {
          newSelectedItem.push(dataItem)
        }
      })

      updateKeywork('')
      const selectedIds = []
      const selectedObjectItems = []
      forEach(newSelectedItem, (it) => {
        selectedIds.push(it._id)
        selectedObjectItems.push(it)
      })

      updateData(data)
      updateSelecteItem(newSelectedItem)
      onSelect && onSelect(selectedIds, selectedObjectItems)
      setShowModal(false)
      updatePreSelectedItem(newSelectedItem)
    },
    [
      selectedItem,
      onSelect,
      setShowModal,
      updateKeywork,
      updatePreSelectedItem,
      updateData,
      updateSelecteItem,
      data,
      handleSubmit,
    ]
  )

  const onItemSelected = useCallback(
    (item) => {
      if (isSelectSingle) {
        handleSubmitSingle(item)
      } else {
        const newSelectedItem = []
        item.checked = !item.checked

        for (const index in data) {
          if (data[index]._id === item._id) {
            data[index] = item
          } else if (isSelectSingle) {
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
      }
    },
    [
      updateData,
      updateSelecteItem,
      data,
      handleSubmit,
      onSelect,
      updatePreSelectedItem,
      selectedItem,
      handleSubmitSingle,
      isSelectSingle,
    ]
  )

  const [scrollYState] = React.useState(new Animated.Value(40))
  const scrollY = Animated.add(scrollYState, -40)

  const titleOpacityDes = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.6, 1],
    extrapolate: 'clamp',
  })

  const titleTranslateBase = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [80, 40, 0],
    extrapolate: 'clamp',
  })

  const stickyHeaderStyle = scrollY.interpolate({
    inputRange: [52, 90, 120],
    outputRange: [62, 30, 10],
    extrapolate: 'clamp',
  })

  const totalItem = value ? value.length : 0

  return (
    <TouchableOpacity onPress={showModal} activeOpacity={0.7} style={[styles.container, style]}>
      <Modal
        onBackdropPress={cancelSelection}
        style={[styles.modalStyle, {}]}
        useNativeDriver
        animationInTiming={300}
        animationOutTiming={300}
        hideModalContentWhileAnimating
        isVisible={show}
        avoidKeyboard
        animationIn="fadeInLeft"
        animationOut="fadeOutLeft"
        onBackButtonPress={cancelSelection}
      >
        <Search
          title={title}
          listRef={listRef}
          titleOpacity={titleOpacityDes}
          titleTranslateBase={titleTranslateBase}
          refInput={refInput}
          autoFocus={data.length >= 20}
          stickyHeaderStyle={stickyHeaderStyle}
          showSearchBox={showSearchBox}
          inputSearchStyle={inputSearchStyle}
          searchPlaceHolderText={searchPlaceHolderText}
          updateKeywork={(searchValue: string): void => {
            updateKeywork(searchValue)
          }}
          isSingle={isSelectSingle}
          data={data}
          keyword={keyword}
          searchFunction={searchFunction}
          scrollYState={scrollYState}
          renderEmptyResult={renderEmpty}
          onItemSelected={onItemSelected}
          cancelSelection={cancelSelection}
        />
        {!isSelectSingle && <Footer cancelSelection={cancelSelection} handleSubmit={handleSubmit} />}
      </Modal>
      <MultipleSelectView
        totalItem={totalItem}
        hideSelectedItem={hideSelectedItem}
        titleIcon={titleIcon}
        isSelectSingle={isSelectSingle}
        preSelectedItem={value ? preSelectedItem : []}
        title={title}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: designColors.bird15,
    paddingVertical: 4,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderTopColor: designColors.bird15,
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: designColors.white100,
  },
  selectedTitlte: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.32,
    color: designColors.darkBlueGreyTwo,
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    fontFamily: FONTS.REGULAR,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.34,
  },
  selecteButton: {
    color: designColors.white,
    fontFamily: FONTS.MEDIUM,
    fontSize: 17,
    lineHeight: 28,
  },
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  containerView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  emptyState: { flex: 1, paddingTop: 40, height: MYHEIGHT },
  selectButton: {
    height: 35,
    backgroundColor: designColors.shamrockGreenTwo,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  defaultValue: { opacity: 0.7 },
  preSelectStyle: { flex: 1, justifyContent: 'center', alignSelf: 'center' },
})
