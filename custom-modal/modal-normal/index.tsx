import { enabledFormSheet, ISIOS } from '@utils'
import React, { ReactElement, useEffect } from 'react'
import { Modal, ModalProps, StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ModalNormalProps {
  children: ReactElement
}

export const ModalNormal = (props: ModalNormalProps & ModalProps) => {
  const { children, visible, transparent } = props
  const insets = useSafeAreaInsets()

  useEffect(() => {
    visible && enabledFormSheet ? StatusBar.setBarStyle('light-content') : StatusBar.setBarStyle('dark-content')
  }, [visible])

  return (
    <Modal
      animationType="slide"
      style={{ backgroundColor: 'white', margin: 0 }}
      presentationStyle={enabledFormSheet ? 'formSheet' : transparent ? 'overFullScreen' : 'fullScreen'}
      {...props}
    >
      {ISIOS && !enabledFormSheet && <View style={{ paddingTop: insets.top }} />}
      {children}
    </Modal>
  )
}
