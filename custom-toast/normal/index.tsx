import { Icon } from '@assets'
import { height, width } from '@utils'
import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { designColors } from 'themes/design-color'
import { textStyles } from 'themes/design-texts'

interface ModalSelectProps {
  title?: string
  iconName?: string
  isVisible: boolean
  setVisible: (aurg1) => void
  customStyle?: any
  type?: TYPE_TOAST
  timeout?: number
  allowBackdropPress?: boolean
}

export enum TYPE_TOAST {
  NORMAL = 'normal',
  ERROR = 'error',
  SUCCESS = 'success'
}

export const Toast: FunctionComponent<ModalSelectProps> = (props: ModalSelectProps) => {
  const {
    title = '',
    isVisible,
    setVisible,
    iconName,
    customStyle = {},
    type = 'normal',
    timeout = 2500,
    allowBackdropPress = true,
  } = props

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setVisible(false)
      }, timeout)
    }
  }, [isVisible])

  const insets = useSafeAreaInsets()
  const renderIcon = useCallback(() => {
    if (iconName) {
      return <Icon name={iconName} size={16} color={designColors.white100} type="solid" />
    }
    switch (type) {
      case 'error':
        return <Icon name="exclamation-triangle" size={16} color={designColors.white100} type="solid" />
      default:
        return <View />
    }
  }, [type, iconName])

  const containerStyle: { view: ViewStyle; text: TextStyle } = useMemo(() => {
    switch (type) {
      case 'error':
        return StyleSheet.create({
          view: {
            backgroundColor: designColors.red100,
          },
          text: {
            color: designColors.white100,
          },
        })
      default:
        return StyleSheet.create({
          view: {},
          text: {},
        })
    }
  }, [type])

  return (
    <Modal
      hasBackdrop
      backdropOpacity={0}
      onBackdropPress={() => allowBackdropPress && setVisible(false)}
      style={{ margin: 0, paddingBottom: 0, justifyContent: 'flex-end' }}
      {...props}
    >
      <View
        style={[
          styles.row,
          styles.containerModal,
          { bottom: height(5) + insets.bottom },
          { ...customStyle },
          { ...containerStyle.view },
        ]}
      >
        <View style={styles.withIcon}>
          {renderIcon()}
          <Text
            style={[
              (iconName || ['error'].includes(type)) && { marginLeft: 12 },
              textStyles.h6SemiBoldLeftH6SemiBold,
              { color: designColors.white100, flex: 1 },
              iconName && { marginLeft: 16 },
              { ...containerStyle.text },
            ]}
          >
            {title}
          </Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  containerModal: {
    bottom: height(11),
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
    width: width(100) - 32,
    justifyContent: 'flex-start',
    backgroundColor: designColors.dark100,
  },
  withIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
