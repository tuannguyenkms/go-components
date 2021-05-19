import { keyExtractor } from '@utils'
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react'
import {
  Animated,

  FlatList, TextInput,


  TextStyle, View,



  ViewStyle
} from 'react-native'

interface MentionsTextInputProps {
  placeholder?: string
  textInputStyle: TextStyle
  suggestionsPanelStyle: ViewStyle
  loadingComponent: () => void | Element
  textInputMinHeight: number
  textInputMaxHeight: number
  trigger: string
  triggerLocation: 'new-word-only' | 'anywhere'
  value: string
  onChangeText: (val) => void
  triggerCallback: (aurg) => void
  renderSuggestionsRow: (aurg1, aurg2) => ReactElement
  suggestionsData: any[]
  horizontal: boolean
  suggestionRowHeight: number
  MaxVisibleRowCount?: any
}

export const MentionsTextInput : FunctionComponent<MentionsTextInputProps> = (props: MentionsTextInputProps) => {
  const {
    textInputStyle = { borderColor: '#ebebeb', borderWidth: 1, fontSize: 15 },
    suggestionsPanelStyle = { backgroundColor: 'rgba(100,100,100,0.1)' },
    textInputMinHeight = 30,
    textInputMaxHeight = 80,
    horizontal = true,
    value,
    suggestionsData,
    renderSuggestionsRow,
    placeholder
  } = props
  const [suggestionRowHeight] = useState(new Animated.Value(0))
  const [state, setState] = useState({
    textInputHeight: 0,
    isTrackingStarted: false,
  })
  let isTrackingStarted = false
  let previousChar = ' '

  useEffect(() => {
    setState({
      ...state,
      textInputHeight: textInputMinHeight,
    })
  }, [])

  useEffect(() => {
    const handleRow = () => {
      if (!props.value) {
        resetTextbox()
      } else if (
        isTrackingStarted &&
        !horizontal &&
        props.suggestionsData.length !== 0
      ) {
        const numOfRows =
          props.MaxVisibleRowCount >= props.suggestionsData.length
            ? props.suggestionsData.length
            : props.MaxVisibleRowCount
        const height = numOfRows * props.suggestionRowHeight
        openSuggestionsPanel(height)
      }
    }
    handleRow()
    return () => {
      handleRow()
    }
  }, [value])

  const startTracking = () => {
    isTrackingStarted = true
    openSuggestionsPanel()
    setState({
      ...state,
      isTrackingStarted: true,
    })
  }

  const stopTracking = () => {
    isTrackingStarted = false
    closeSuggestionsPanel()
    setState({
      ...state,
      isTrackingStarted: false,
    })
  }

  const openSuggestionsPanel = (height?: any) => {
    Animated.timing(suggestionRowHeight, {
      toValue: height || props.suggestionRowHeight,
      duration: 100,
      useNativeDriver:false
    }).start()
  }

  const closeSuggestionsPanel = () => {
    Animated.timing(suggestionRowHeight, {
      toValue: 0,
      duration: 100,
      useNativeDriver:false
    }).start()
  }

  const updateSuggestions = (lastKeyword) => {
    props.triggerCallback(lastKeyword)
  }

  const identifyKeyword = (val) => {
    if (isTrackingStarted) {
      const boundary = props.triggerLocation === 'new-word-only' ? 'B' : ''
      const pattern = new RegExp(
        `\\${boundary}${props.trigger}[a-z0-9_-]+|\\${boundary}${props.trigger}`,
        `gi`
      )
      const keywordArray = val.match(pattern)
      if (keywordArray && !!keywordArray.length) {
        const lastKeyword = keywordArray[keywordArray.length - 1]
        updateSuggestions(lastKeyword)
      }
    }
  }

  const onChangeText = (val) => {
    props.onChangeText(val) // pass changed text back
    const lastChar = val.substr(val.length - 1)
    const wordBoundry =
      props.triggerLocation === 'new-word-only'
        ? previousChar.trim().length === 0
        : true
    if (lastChar === props.trigger && wordBoundry) {
      startTracking()
    } else if ((lastChar === ' ' && state.isTrackingStarted) || val === '') {
      stopTracking()
    }
    previousChar = lastChar
    identifyKeyword(val)
  }

  const resetTextbox = () => {
    previousChar = ' '
    stopTracking()
    setState({ ...state, textInputHeight: textInputMinHeight })
  }

  return (
    <View>
      <Animated.View
        style={[{ ...suggestionsPanelStyle }, { height: suggestionRowHeight }]}
      >
        <FlatList
          keyboardShouldPersistTaps="always"
          horizontal={horizontal}
          data={suggestionsData}
          keyExtractor={keyExtractor}
          renderItem={({ item, index }) => renderSuggestionsRow({item, index}, stopTracking)}
        />
      </Animated.View>
      <TextInput
        onContentSizeChange={(event) => {
          setState({
            ...state,
            textInputHeight:
              textInputMinHeight >= event.nativeEvent.contentSize.height
                ? textInputMinHeight
                : event.nativeEvent.contentSize.height + 10,
          })
        }}
        onChangeText={onChangeText}
        multiline
        value={value}
        style={[
          { ...textInputStyle },
          {
            height: Math.min(textInputMaxHeight, state.textInputHeight),
          },
        ]}
        placeholder={
          placeholder || 'Write a comment...'
        }
        {...props}
      />
    </View>
  )
}
