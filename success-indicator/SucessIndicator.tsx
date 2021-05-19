// @flow

import React from 'react'
import { StyleSheet, View, Text, Modal } from 'react-native'
import { SuccessIndicatorIcon } from '@assets'
import Colors from 'themes/Colors'
import { FONTS } from '@constants'

const SuccessIndicator = (props) => {
  const { show, message } = props
  if (show) {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={show}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <SuccessIndicatorIcon size={40} color="white" />
            <Text style={styles.message}>{message}</Text>
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
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    opacity: 0.9,
    backgroundColor: Colors.primaryColor.main,
    minHeight: 160,
    minWidth: 220,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 17,
    color: Colors.mainWhite,
    marginTop: 10,
    textAlign: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
})

export default SuccessIndicator
