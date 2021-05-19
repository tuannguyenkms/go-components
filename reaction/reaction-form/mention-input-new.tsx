import { icSend } from '@assets'
import { AvatarNew } from '@components/avatar-new'
import { EU } from '@components/mention-editor'
import { EVENT_KEY } from '@constants'
import { appModel } from '@models'
import { ISIOS, keyExtractor, useKeyboard } from '@utils'
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { getUserInfo } from 'screens/profile/profile-screen-hook'
import { designColors } from 'themes/design-color'
import { ReactionFormProps } from '.'
import { styles } from './styles'
import { SuggestionsRow } from './suggestions-row'

const triggerCharacter = '@'
const triggerLocation = 'new-word-only'
let isTrackingStarted = false
let previousChar = ' '
let mentionsMap = new Map()
const formatMentionNode = (txt: any, key: string) => (
  <Text key={key} style={styles.mention}>
    {txt}
  </Text>
)
const ICON_SIZE = 16
const AVATAR_COMMENT_SIZE = 40
export const MentionInputNew: FunctionComponent<ReactionFormProps> = (props: ReactionFormProps) => {
  const {
    refInput,
    isLoading,
    onActionPress,
    setTextValue,
    onSearchEmployee,
    commentText = {
      displayText: '',
      originalText: '',
    },
  } = props
  const [editorHeight, setEditorHeight] = useState(72)
  const [menIndexState, setMenIndex] = useState(0)
  const [inputTextState, setInputTextState] = useState('')
  const [formattedTextState, setFormattedText] = useState('')
  const [selectionState, setSelection] = useState({
    start: 0,
    end: 0,
  })
  const [suggestionsData, setData] = useState([])
  const [suggestionRowHeight] = useState(new Animated.Value(0))
  let listenerInitText
  let listenerClearMentions
  let listernerClearTextInput
  let listenerSetEmoji
  useEffect(() => {
    listenerClearMentions = EventRegister.addEventListener(EVENT_KEY.CLEAR_MENTION, () => {
      mentionsMap.clear()
    })
    listenerSetEmoji = EventRegister.addEventListener(EVENT_KEY.SET_INPUT_EMOJI, (text) => {
      setInputTextState(text)
      setFormattedText(formatText(text))
    })
    listernerClearTextInput = EventRegister.addEventListener(EVENT_KEY.CLEAR_TEXTINPUT, () => {
      setInputTextState(ISIOS ? '' : ' ')
      setFormattedText('')
      setTextValue({
        displayText: '',
        originalText: '',
      })
    })
    listenerInitText = EventRegister.addEventListener(EVENT_KEY.SET_INIT_TEXT_INPUT, (text) => {
      if (text && text.length !== 0) {
        const { mentions, formattedText } = EU.displayTextForBEWithoutComponent(
          text,
          appModel.directory.directory || []
        )
        mentions.map((item) => {
          mentionsMap.set([item.start, item.end], item.employeeInfo)
          return null
        })
        const formattedMsg = formatText(formattedText)
        setInputTextState(formattedText)
        setFormattedText(formattedMsg)
      } else {
        setInputTextState('')
        setFormattedText('')
      }
    })
    return () => {
      EventRegister.removeEventListener(listenerInitText)
      EventRegister.removeEventListener(listenerClearMentions)
      EventRegister.removeEventListener(listernerClearTextInput)
      EventRegister.removeEventListener(listenerSetEmoji)
    }
  }, [])

  useEffect(() => {
    const handleDataWhenUpdated = () => {
      if (suggestionsData.length !== 0) {
        const numOfRows = suggestionsData.length > 5 ? 5 : suggestionsData.length
        const h = numOfRows * 50
        openSuggestionsPanel(h)
      }
    }
    handleDataWhenUpdated()
    return () => {
      handleDataWhenUpdated()
    }
  }, [suggestionsData])

  const startTracking = useCallback((menIdx) => {
    isTrackingStarted = true
    openSuggestionsPanel(0)
    setMenIndex(menIdx)
  }, [])

  const stopTracking = useCallback(() => {
    isTrackingStarted = false
    closeSuggestionsPanel()
  }, [])

  const openSuggestionsPanel = (h: number) => {
    Animated.timing(suggestionRowHeight, {
      toValue: h,
      duration: 100,
      useNativeDriver: false,
    }).start()
  }

  const closeSuggestionsPanel = () => {
    Animated.timing(suggestionRowHeight, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start()
  }

  const updateSuggestions = async (lastKeyword: any) => {
    const dataSearch = await onSearchEmployee(lastKeyword)
    await setData(dataSearch)
  }

  const formatText = useCallback(
    (inpText) => {
      if (inpText === '' || !mentionsMap.size) {
        return inpText
      }
      const formattedText = []
      let lastIndex = 0
      mentionsMap.forEach((men, [start, end]) => {
        const initialStr = start === 1 ? '' : inpText.substring(lastIndex, start)
        lastIndex = end + 1
        formattedText.push(initialStr)
        const formattedMention = formatMentionNode(`@${men.employeeName}`, `${start}-${men.id}-${end}`)
        formattedText.push(formattedMention)
        if (EU.isKeysAreSame(EU.getLastKeyInMap(mentionsMap), [start, end])) {
          const lastStr = inpText.substr(lastIndex)
          formattedText.push(lastStr)
        }
      })
      return formattedText
    },
    [commentText.originalText]
  )

  const updateMentionsMap = (selection: { start: any; end: any }, count: number, shouldAdd: boolean) => {
    mentionsMap = EU.updateRemainingMentionsIndexes(mentionsMap, selection, count, shouldAdd)
  }

  const identifyKeyword = (inpText: string) => {
    if (isTrackingStarted) {
      let pattern = null
      if (triggerLocation === 'new-word-only') {
        pattern = new RegExp(`\\B${triggerCharacter}[a-z0-9_-]+|\\B${triggerCharacter}`, `gi`)
      } else {
        pattern = new RegExp(`\\${triggerCharacter}[a-z0-9_-]+|\\${triggerCharacter}`, `i`)
      }
      const keywordArray = inpText.match(pattern)
      if (keywordArray && keywordArray.length > 0) {
        const lastKeyword = keywordArray[keywordArray.length - 1]
        updateSuggestions(lastKeyword)
      }
    }
  }

  const checkForMention = (inpText: string, selection: { start: any; end?: number }) => {
    const menIndex = selection.start - 1
    const lastChar = inpText.substr(menIndex, 1)
    const wordBoundry = triggerLocation === 'new-word-only' ? previousChar.trim().length === 0 : true
    if (lastChar === triggerCharacter && wordBoundry) {
      startTracking(menIndex)
    } else if (lastChar.trim() === '' && isTrackingStarted) {
      stopTracking()
    }
    previousChar = lastChar
    identifyKeyword(inpText)
  }

  const onChangeTextCall = (inpText: any, isEmoji?: any) => {
    let text = inpText
    const prevText = inputTextState
    const selection = { ...selectionState }
    if (text.length < prevText.length) {
      let charDeleted = Math.abs(text.length - prevText.length)
      const totalSelection = {
        start: selection.start,
        end: charDeleted > 1 ? selection.start + charDeleted : selection.start,
      }
      if (totalSelection.start === totalSelection.end) {
        const key = EU.findMentionKeyInMap(mentionsMap, totalSelection.start)
        if (key && key.length) {
          mentionsMap.delete(key)
          const initial = text.substring(0, key[0])
          text = initial + text.substr(key[1])
          charDeleted += Math.abs(key[0] - key[1])
          mentionsMap.delete(key)
        }
      } else {
        const mentionKeys = EU.getSelectedMentionKeys(mentionsMap, totalSelection)
        mentionKeys.forEach((key) => {
          mentionsMap.delete(key)
        })
      }
      updateMentionsMap(
        {
          start: selection.end,
          end: prevText.length,
        },
        charDeleted,
        false
      )
    } else {
      const charAdded = Math.abs(text.length - prevText.length)
      updateMentionsMap(
        {
          start: selection.end,
          end: text.length,
        },
        charAdded,
        true
      )
      if (selection.start === selection.end) {
        const key = EU.findMentionKeyInMap(mentionsMap, selection.start - 1)
        if (key && key.length) {
          mentionsMap.delete(key)
        }
      }
    }
    checkForMention(text, selection)
    setInputTextState(text)
    setFormattedText(formatText(text))
    setTextValue(
      {
        displayText: text,
        originalText: formatTextForBE(text),
      },
      isEmoji
    )
  }

  const formatTextForBE = (inpText: string) => {
    if (inpText === '' || !mentionsMap.size) {
      return inpText
    }
    let formattedText = ''
    let lastIndex = 0
    mentionsMap.forEach((men, [start, end]) => {
      const initialStr = start === 1 ? '' : inpText.substring(lastIndex, start)
      lastIndex = end + 1
      formattedText = formattedText.concat(initialStr)
      formattedText = formattedText.concat(`{{${men._id}}}`)
      if (EU.isKeysAreSame(EU.getLastKeyInMap(mentionsMap), [start, end])) {
        const lastStr = inpText.substr(lastIndex)
        formattedText = formattedText.concat(lastStr)
      }
    })
    return formattedText
  }

  const getInitialAndRemainingStrings = (inpText: string, menIndex: number) => {
    let initialStr = inpText.substr(0, menIndex).trim()
    if (!EU.isEmpty(initialStr)) {
      initialStr += ' '
    }
    let remStr =
      inpText
        .substr(menIndex + 1)
        .replace(/\s+/, '\x01')
        .split('\x01')[1] || ''
    const adjMentIndexes = {
      start: initialStr.length - 1,
      end: inpText.length - remStr.length - 1,
    }
    const mentionKeys = EU.getSelectedMentionKeys(mentionsMap, adjMentIndexes)
    mentionKeys.forEach((key) => {
      remStr = `@${mentionsMap.get(key).employeeName} ${remStr}`
    })
    return {
      initialStr,
      remStr,
    }
  }

  const onSuggestionTap = useCallback(
    async (directory) => {
      const { initialStr, remStr } = getInitialAndRemainingStrings(inputTextState, menIndexState)
      const employeeName = `@${directory.employeeName}`
      const text = `${initialStr}${employeeName} ${remStr}`
      const menStartIndex = initialStr.length
      const menEndIndex = menStartIndex + (employeeName.length - 1)
      mentionsMap.set([menStartIndex, menEndIndex], directory)
      const charAdded = Math.abs(text.length - inputTextState.length)
      updateMentionsMap(
        {
          start: menEndIndex + 1,
          end: text.length,
        },
        charAdded,
        true
      )
      setInputTextState(text)
      setFormattedText(formatText(text))
      setTextValue({
        displayText: text,
        originalText: formatTextForBE(text),
      })
      stopTracking()
    },
    [commentText.originalText]
  )

  const onContentSizeChange = useCallback(
    (evt) => {
      if (evt) {
        const androidTextHeight = 20
        const height = ISIOS
          ? evt.nativeEvent.contentSize.height
          : evt.nativeEvent.contentSize.height - androidTextHeight
        let editHeight = 20
        editHeight += height
        setEditorHeight(editHeight)
      }
    },
    [commentText.originalText]
  )

  const handleSelectionChange = ({ nativeEvent: { selection } }) => {
    const prevSelc = selectionState
    let newSelc = { ...selection }
    if (newSelc.start !== newSelc.end) {
      newSelc = EU.addMenInSelection(newSelc, prevSelc, mentionsMap)
    }
    setSelection(newSelc)
  }

  const renderSuggestionsRow = useCallback(
    ({ item }) => {
      return <SuggestionsRow item={item} onSuggestionTap={onSuggestionTap} />
    },
    [suggestionsData]
  )

  const onBlur = useCallback(() => {
    stopTracking()
  }, [])

  const onFocus = useCallback(() => {
    // TODO: handle
  }, [])
  const refScrollView = useRef(null)
  const keyboard = useKeyboard()
  const [basicInfo] = getUserInfo()
  return (
    <View style={[{ flex: 1 }, !keyboard.isKeyboardShow && { opacity: 0, height: 0 }]}>
      <Animated.View
        style={[
          {
            zIndex: 100,
            height: suggestionRowHeight,
          },
        ]}
      >
        <FlatList
          data={suggestionsData}
          keyExtractor={keyExtractor}
          renderItem={renderSuggestionsRow}
          keyboardShouldPersistTaps="always"
        />
      </Animated.View>
      <View style={styles.inputContainerChild}>
        <View style={[styles.row, styles.inputContainer]}>
          <View style={styles.avatarContainer}>
            <AvatarNew
              image={basicInfo.profileImageUrl}
              size={AVATAR_COMMENT_SIZE}
              style={{ width: AVATAR_COMMENT_SIZE, height: AVATAR_COMMENT_SIZE }}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={refScrollView}
            onContentSizeChange={() => {
              refScrollView.current.scrollToEnd({ animated: true })
            }}
            style={[styles.editorContainer]}
          >
            <View style={[{ height: editorHeight }, styles.containerInputBackground]}>
              <View style={[styles.formmatedTextWrapper]}>
                {formattedTextState !== '' ? (
                  <Text style={[styles.formmatedText]}>{formattedTextState}</Text>
                ) : (
                  <Text style={[styles.placeholderText]}>Write your comment...</Text>
                )}
              </View>
              <TextInput
                multiline
                ref={refInput}
                onBlur={onBlur}
                maxLength={250}
                onFocus={onFocus}
                autoCorrect={false}
                numberOfLines={100}
                scrollEnabled={false}
                autoCapitalize="none"
                value={inputTextState}
                selectionColor="#999999"
                onChangeText={onChangeTextCall}
                onSelectionChange={handleSelectionChange}
                onContentSizeChange={onContentSizeChange}
                style={[ISIOS ? styles.inputIos : styles.inputAndroid]}
              />
            </View>
          </ScrollView>
          {commentText.originalText.length > 0 && (
            <TouchableOpacity disabled={isLoading} style={styles.sendButton} onPress={onActionPress}>
              {isLoading ? <ActivityIndicator color={designColors.goPrim100} /> : icSend(ICON_SIZE, '#fff', 'solid')}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}
