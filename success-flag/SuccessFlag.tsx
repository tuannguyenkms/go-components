import { icSuccess } from '@assets'
import { FONTS } from '@constants'
import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import Colors from 'themes/Colors'
import { useSafeArea } from 'react-native-safe-area-context'

const SuccessFlag = (props) => {
  const { show, message } = props
  const insets = useSafeArea()

  if (show) {
    return (
      <Modal transparent animationType="fade" visible={show}>
        <View style={[{ flex: 1 }, { paddingTop: insets.top }]}>
          <View
            style={[styles.modalBackground, props.modalBackgroundStyle]}
          >
            <View style={[styles.activityIndicatorWrapper, props.indicatorStyle]}>
              {props.children ? props.children : icSuccess(18, Colors.primaryColor.main)}
              <Text style={[styles.message, props.textStyles]}>{message}</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  return null
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#0e223d',
    minHeight: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  message: {
    paddingLeft: 4,
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 14,
    lineHeight: 16,
    color: Colors.primaryColor.main,
    textAlign: 'center',
  },
})

export default SuccessFlag
