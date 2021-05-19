import { RecentsText } from '@components/custom-header/search/recents'
import { Result } from '@components/custom-header/search/result'
import { TextInputSearch } from '@components/custom-textinput'
import { EVENT_KEY, ROUTE_KEY } from '@constants'
import { recentStore } from '@models'
import { ISIOS } from '@utils'
import { get, noop } from 'lodash'
import * as React from 'react'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { Animated, StatusBar, View } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'themes/Colors'
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE, styles } from './styles'

interface SearchAnimationProps {
  children?: ReactElement
  title?: string
  placeholder?: string
  data?: any[]
  callback?: (aurg: string) => void
  textinput?: string
  renderItem?: any
  inputProps?: any
  leftAction?: any
  callbackShow?: any
  keySuggestion?: string
  direction?: 'row' | 'column'
  renderItemRecents?: ({ item, index, onClose }) => void
  onPress?: (aurg) => void
  handleSearch?: any
  onEndReached?: () => void
  renderRight?: () => ReactElement
  onRefresh?: () => void
}
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
  const paddingToBottom = 20
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
}
export const SearchAnimation = (props: SearchAnimationProps) => {
  const {
    children,
    title = 'News',
    data,
    callback,
    textinput,
    renderItem,
    inputProps,
    callbackShow,
    onRefresh,
    keySuggestion,
    direction = 'column',
    renderItemRecents,
    onEndReached,
    onPress = () => noop,
    renderRight,
    handleSearch = () => noop,
  } = props
  const [anim] = React.useState(new Animated.Value(0))
  const insets = useSafeAreaInsets()

  const headerHeight = anim.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE + insets.top],
    outputRange: [HEADER_MAX_HEIGHT + insets.top, HEADER_MIN_HEIGHT + insets.top],
    extrapolate: 'clamp',
  })

  const titleOpacity = anim.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  })

  const titleDesOpacity = anim.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

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

  const onPressCall = useCallback((item) => {
    onClose()
    onPress(item)
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

  return (
    <View style={styles.fill}>
      <StatusBar translucent barStyle="dark-content" backgroundColor={Colors.mainWhite} />
      <Animated.ScrollView
        keyboardShouldPersistTaps="handled"
        bounces
        bouncesZoom
        style={styles.fill}
        scrollEventThrottle={1}
        onMomentumScrollEnd={({ nativeEvent }) => {
          if (ISIOS) {
            if (isCloseToBottom(nativeEvent)) {
              onEndReached()
            }
          }
          if (nativeEvent.contentOffset.y <= (ISIOS ? 0 : 2)) {
            onRefresh && onRefresh()
          }
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: anim } } }], {
          listener: (event) => {
            const y = get(event, 'nativeEvent.contentOffset.y ')
            if (!ISIOS) {
              if (isCloseToBottom(event.nativeEvent)) {
                onEndReached()
              }
            } else if (y <= 0) {
              onRefresh && onRefresh()
            }
          },
          useNativeDriver: false,
        })}
      >
        <View style={{ marginTop: HEADER_MAX_HEIGHT + (ISIOS ? StatusBar.currentHeight : 0) + insets.top }}>
          {children}
        </View>
      </Animated.ScrollView>
      <View style={[styles.titleContainer, styles.subTitleContainer, { paddingTop: insets.top }]}>
        <Animated.Text style={[styles.subTitle, { opacity: titleDesOpacity }]}>{title}</Animated.Text>
        {renderRight && renderRight()}
      </View>
      <Animated.View style={[styles.header, styles.shadow, { height: headerHeight, paddingTop: insets.top }]}>
        <View style={styles.titleContainer}>
          <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>{title}</Animated.Text>
        </View>
        <Animated.View style={[styles.searchContainer]}>
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
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.searchOverlay, { top: headerHeight }]}>
        <RecentsText {...{ onClose, keySuggestion, onPressTextRecents, isVisible: isShowRecents, renderItemRecents }} />
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
      </Animated.View>
    </View>
  )
}
