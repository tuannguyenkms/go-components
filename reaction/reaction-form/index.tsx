import { appModel } from '@models'
import { useKeyboard } from '@utils'
import { get } from 'lodash'
import React from 'react'
import { Text, View } from 'react-native'
import { KeyboardTrackingView } from 'react-native-keyboard-tracking-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CommentInput } from './comment-input'
import { styles } from './styles'

const trackInteractive = true

export interface ReactionFormProps {
  focus?: boolean
  onActionPress: any
  inputRefCallback?: any
  trackingRefCallback?: any
  commentText?: {
    displayText: string
    originalText: string
  }
  setTextValue?: any
  isEdit?: boolean
  isShowEmoji?: boolean
  disabled?: boolean
  type?: 'input' | 'button'
  buttonPress?: any
  refInput?: any
  isLoading?: boolean
  styleTrackingView?: any
  onSearchEmployee?: any
  employeeReplied?: string
}

export const ReactionForm = (props: ReactionFormProps) => {
  const { styleTrackingView, employeeReplied, trackingRefCallback } = props
  const insets = useSafeAreaInsets()
  const keyboard = useKeyboard()
  const styleTrackingToolbarContainer = [
    styles.trackingToolbarContainer,
    {
      bottom: keyboard.isKeyboardShow ? 0 : -insets.bottom,
    },
    styleTrackingView,
  ]
  const employee = appModel.directory.directory?.find((i) => i._id === employeeReplied)
  const empName = get(employee, 'employeeName') || ''

  return (
    <KeyboardTrackingView
      trackInteractive={trackInteractive}
      style={styleTrackingToolbarContainer}
      ref={(r) => trackingRefCallback && trackingRefCallback(r)}
    >
      <View style={styles.container}>
        {empName.length > 0 && <Text style={styles.textReply}>{`Reply to  ${empName}`}</Text>}
        <CommentInput {...props} />
      </View>
    </KeyboardTrackingView>
  )
}
