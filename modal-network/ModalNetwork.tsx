import { useNetInfo } from '@react-native-community/netinfo'
import i18n from 'i18n-js'
import React, { useEffect, useState, SFC } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import Colors from 'themes/Colors'
import { numberMarginOrPadding } from 'themes/Constants'
import { noop } from 'lodash'
interface PropsType {
  isVisibleModal?: boolean
}

const ModalNetwork: SFC<PropsType> = () => {
  const [isShowPopup, setShowPopup] = useState(false)
  const netInfo = useNetInfo()

  useEffect(() => {
    setShowPopup(!netInfo.isConnected)
    setTimeout(() => {
      if (!netInfo.isConnected) {
        setShowPopup(false)
      }
    }, 2000)
  }, [netInfo.isConnected])

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isShowPopup}
      onRequestClose={noop}
    >
      <View style={styles.container}>
        <Text style={styles.txtNetwork}>{i18n.t('network')}</Text>
      </View>
    </Modal>
  )
}
export { ModalNetwork }
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.mainWhite,
    padding: numberMarginOrPadding,
  },
  txtNetwork: {
    fontSize: 14,
    color: Colors.textColor.main,
  },
})
