import { icBack } from '@assets'
import { TextInputSearch } from '@components/custom-textinput'
import { ShadowView } from '@components/custom-view'
import { EVENT_KEY, FONTS, HIT_SLOP, ROUTE_KEY } from '@constants'
import { recentStore } from '@models'
import { height, width } from '@utils'
import { noop } from 'lodash'
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { StatusBar, StyleSheet, Text, TextInputProps, TouchableWithoutFeedback, View } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'
import { RecentsText } from './recents'
import { Result } from './result'

interface IProps {
  isRight?: boolean
  rightAction?: () => void
}

type InputProps = TextInputProps & IProps

interface HeaderSearchProps {
  sub?: string
  data?: any[]
  children?: any
  title?: string
  customTitle?: ReactElement
  isOpen?: boolean
  textinput?: string
  handleSearch?: any
  keySuggestion?: string
  leftAction?: () => void
  inputProps?: InputProps
  onPress?: (aurg) => void
  direction?: 'row' | 'column'
  callback?: (aurg: string) => void
  callbackShow?: (aurg: any) => void
  renderItem?: ({ item, index, onClose }) => void
  renderItemRecents?: ({ item, index, onClose }) => void
}

const ICON_SIZE = 30

export const HeaderSearch = (props: HeaderSearchProps) => {
  const {
    data,
    title,
    customTitle,
    children,
    callback,
    textinput,
    renderItem,
    inputProps,
    leftAction,
    callbackShow,
    keySuggestion,
    direction = 'row',
    renderItemRecents,
    onPress = () => noop,
    handleSearch = () => noop,
  } = props
  const [isShowResults, setShowResults] = useState(false)
  const [isShowRecents, setShowRecents] = useState(false)
  const onClose = useCallback(() => {
    setShowResults(false)
    setShowRecents(false)
    callbackShow && callbackShow(false)
    refInput && refInput.current && refInput.current.blur()
  }, [])

  const onChangeText = useCallback((txt) => {
    const text = txt || ''
    setShowResults(text.length > 0)
    setShowRecents(text.length === 0)
    callback(text)
    handleSearch(text)
  }, [])

  const onPressCall = useCallback((it) => {
    onClose()
    onPress(it)
    callback('')
  }, [])

  const onSubmitEditing = React.useCallback((e) => {
    const { text } = e.nativeEvent
    if (keySuggestion.length > 0 && text.length > 0 && keySuggestion !== ROUTE_KEY.DIRECTORY) {
      const nowDate = new Date().getTime()
      const dataTemp = {
        text,
        createDate: nowDate,
      }
      recentStore.setRecents(keySuggestion, dataTemp)
    }
  }, [])

  const onPressTextRecents = useCallback((text) => {
    onChangeText(text)
    refInput && refInput.current.focus()
  }, [])

  const onFocus = useCallback(() => {
    onChangeText(textinput)
  }, [textinput])

  useEffect(() => {
    const eventClose: any = EventRegister.addEventListener(EVENT_KEY.CLOSE_SEARCH, onClose)
    return () => {
      EventRegister.removeEventListener(eventClose)
    }
  }, [])
  const rightAction = useCallback(() => {
    onChangeText('')
  }, [])
  const refInput = useRef(null)
  const insets = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, zIndex: 1000 }}>
      <StatusBar translucent barStyle="dark-content" backgroundColor={Colors.mainWhite} />
      <ShadowView
        type="light"
        containerStyle={[
          styles[direction],
          styles.container,
          { paddingBottom: 15, paddingTop: insets.top + height(1) },
        ]}
      >
        <>
          {direction === 'column' ? (
            <View style={[styles.row, styles.container, { bottom: 5, paddingHorizontal: 10 }]}>
              {leftAction && (
                <TouchableWithoutFeedback onPress={leftAction} hitSlop={HIT_SLOP}>
                  <View style={{ paddingVertical: 5 }}>{icBack(ICON_SIZE, '#111')}</View>
                </TouchableWithoutFeedback>
              )}
              {title && title.length > 0 && <Text style={styles.title}>{title}</Text>}
              {customTitle && !title && <>{customTitle}</>}
            </View>
          ) : (
            leftAction && (
              <TouchableWithoutFeedback onPress={leftAction} hitSlop={HIT_SLOP}>
                <View>{icBack(ICON_SIZE, '#111')}</View>
              </TouchableWithoutFeedback>
            )
          )}
          <TextInputSearch
            value={textinput}
            onFocus={onFocus}
            refInput={refInput}
            returnKeyType="done"
            returnKeyLabel="Done"
            placeholder="Search news"
            rightAction={rightAction}
            onChangeText={onChangeText}
            isRight={textinput.length > 0}
            onSubmitEditing={onSubmitEditing}
            containerStyle={[styles.textinput, direction === 'row' && { flex: 1 }]}
            {...inputProps}
          />
        </>
      </ShadowView>
      <Result
        {...{
          data,
          onClose,
          textinput,
          renderItem,
          keySuggestion,
          onPress: onPressCall,
          isVisible: isShowResults,
        }}
      />
      <RecentsText {...{ onClose, keySuggestion, onPressTextRecents, isVisible: isShowRecents, renderItemRecents }} />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    width: width(100),
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.mainWhite,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  textinput: {
    height: 40,
    borderRadius: 20,
    paddingVertical: 0,
    marginHorizontal: 10,
  },
  background: {
    zIndex: 2,
    opacity: 0.7,
    width: width(100),
    height: height(100),
    position: 'absolute',
    backgroundColor: Colors.mainBlack,
  },
  title: {
    fontSize: 25,
    lineHeight: 32,
    letterSpacing: -0.3,
    fontFamily: FONTS.SEMI_BOLD,
    color: designColors.darkSlateBlue,
  },
})
