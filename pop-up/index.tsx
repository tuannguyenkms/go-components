import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Modal from 'react-native-modal'
import { designColors } from 'themes/design-color'
import noop from 'lodash/noop'
import styles from './styles'

interface PopUpProps {
  isVisible: boolean
  setVisible: (aurg1: boolean) => void
  title?: string
  subTitle?: string
  button1: {
    title: string
    action: () => void
  }
  button2: {
    title: string
    action: () => void
  }
  type?: 'light' | 'dark'
}
export const PopUp = (props: PopUpProps) => {
  const { isVisible, setVisible, title = '', subTitle = '', type = 'light',
    button1 = { title: '', action: noop }, button2 = { title: '', action: noop } } = props
  return (
    <Modal
      // hasBackdrop
      style={styles.base}
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      // onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        <TouchableOpacity onPress={() => button1.action()}>
          <View
            style={[
              styles.button,
              styles.button1,
              type === 'dark' && {
                backgroundColor: designColors.dark100
              }]}>
            <Text style={[styles.textButton, styles.textButton1]}>{button1.title}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => button2.action()}>
          <View style={[styles.button, styles.button2]}>
            <Text style={[styles.textButton, styles.textButton2]}>{button2.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
