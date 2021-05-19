import { icClosePro } from '@assets'
import { ModalNormal } from '@components/custom-modal/modal-normal'
import React, { ReactElement } from 'react'
import { ModalProps, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { designColors } from 'themes/design-color'
import { textStyles } from 'themes/design-texts'
import { HIT_SLOP } from '@constants'

export interface GoModalCloseProps {
  isVisible: boolean
  children?: ReactElement
  setVisible?: (aurg1) => void
  renderRight?: () => ReactElement
  enableSwipeDownToDismiss?: boolean
  customModalProps?: ModalProps
  headerContainerStyle?: any
  rightAction?: () => void
  onSuccess?: () => void
  title?: string
  renderLeft?: () => ReactElement
}

export const GoModalClose = (props: GoModalCloseProps) => {
  const {
    isVisible,
    children,
    setVisible,
    renderRight,
    renderLeft,
    rightAction,
    onSuccess,
    title,
    customModalProps,
    headerContainerStyle = {},
    enableSwipeDownToDismiss = true,
  } = props
  return (
    <ModalNormal
      visible={isVisible}
      onDismiss={onSuccess}
      onRequestClose={() => setVisible(false)}
      {...customModalProps}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback
          {...(enableSwipeDownToDismiss && {
            onPressOut: (e) => {
              if (e.nativeEvent.locationY > 50) {
                setVisible(false)
              }
            },
          })}
        >
          <View style={[styles.header, headerContainerStyle]}>
            {
              renderLeft
                ? renderLeft()
                : <TouchableOpacity hitSlop={HIT_SLOP} onPress={() => setVisible(false)}>
                  {icClosePro(20, designColors.dark100)}
                </TouchableOpacity>
            }
            <View style={styles.containerTitle}>
              {title && (
                <Text numberOfLines={1} style={styles.title}>
                  {title}
                </Text>
              )}
            </View>

            {renderRight ? (
              renderRight()
            ) : (
              <TouchableOpacity hitSlop={HIT_SLOP} style={styles.button} onPress={rightAction}>
                <Text style={styles.text}>Create</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.content}>{children}</View>
      </View>
    </ModalNormal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: designColors.white100,
  },
  header: {
    flex: 0,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerTitle: {
    top: 0,
    flex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...textStyles.h4MediumCenterH4Medium,
    color: designColors.dark100,
    textAlign: undefined,
  },
  content: {
    flex: 1,
  },
  text: {
    ...textStyles.h4SemiBoldHeaderActionRightH4SemiBoldPrim100,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: designColors.bird15,
  },
})
