/* eslint-disable import/no-extraneous-dependencies */
import { logoApp } from '@assets'
import { ISIOS } from '@utils'
import get from 'lodash/get'
import 'mobx-react-lite/batchingForReactNative'
import React, { useCallback, useEffect, useState } from 'react'
import { AppState, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import Modal from 'react-native-modal'
import { notification } from 'services/notification-helpers'
import Colors from 'themes/Colors'

export const NotificationLocalPopup = () => {
  const [isShowNotif, setShowNotif] = useState(false)
  const [dataNotif, setDataNotif] = useState({
    id: '',
    message: '',
    routeKey: '',
    title: '',
  })
  const message = get(dataNotif, 'message') || '-'
  const title = get(dataNotif, 'title') || '-'
  const handleNavigationScreenCall = useCallback(() => {
    setShowNotif(false)
    notification.handleNavigationScreen(dataNotif)
  }, [dataNotif])
  let listenerLocalNotification
  useEffect(() => {
    listenerLocalNotification = EventRegister.addEventListener('notif', async (data) => {
      await setDataNotif(data)
      if (AppState.currentState === 'active') {
        setShowNotif(true)
        setTimeout(() => {
          setShowNotif(false)
        }, 4500)
      } else {
        setShowNotif(false)
      }
    })
    return () => {
      EventRegister.removeEventListener(listenerLocalNotification)
    }
  }, [])
  return (
    <Modal
      useNativeDriver
      backdropOpacity={0}
      animationInTiming={300}
      isVisible={isShowNotif}
      animationOutTiming={300}
      swipeDirection={['up']}
      style={styles.baseModal}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      swipeThreshold={0.5}
      hideModalContentWhileAnimating
      onSwipeComplete={() => setShowNotif(false)}
      onBackdropPress={() => setShowNotif(false)}
    >
      <TouchableWithoutFeedback onPress={handleNavigationScreenCall}>
        <View style={styles.notifContainer}>
          <View style={[styles.row, styles.notifSubContainer]}>
            <View style={[styles.row, { alignItems: 'center' }]}>
              <View style={styles.logo}>
                <Image source={logoApp} style={styles.img} />
              </View>
              <Text style={styles.textApp}>GROVE ONE</Text>
            </View>
            <Text style={styles.textApp}>now</Text>
          </View>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textMessage}>{message}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
const styles = StyleSheet.create({
  baseModal: {
    flex: 0,
    alignItems: 'center',
    paddingTop: ISIOS ? 20 : 0,
    justifyContent: 'flex-start',
  },
  notifContainer: {
    padding: 12,
    width: '100%',
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  notifSubContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 18,
    height: 18,
    marginRight: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  img: {
    width: 14,
    height: 14,
    resizeMode: 'cover',
  },
  textApp: {
    fontSize: 14,
    lineHeight: 20,
    color: '#c3c3c3',
  },
  textTitle: {
    marginTop: 8,
    width: '100%',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  textMessage: { width: '100%', fontSize: 14, lineHeight: 22, marginTop: 8 },
})
