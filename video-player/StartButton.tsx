import { noop } from 'lodash'
import React from 'react'
import {
  TouchableWithoutFeedback, View
} from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import { designColors } from 'themes/design-color'
import styles from './styles'

interface StartButtonProps {
  onStartPress?
}
const StartButton = (props: StartButtonProps) => {
  const {onStartPress} = props
  return (
    <TouchableWithoutFeedback onPress={onStartPress||noop}>
      <View style={[styles.playButton]}>
        <Icon name="play" size={42} color={designColors.white} />
      </View>
    </TouchableWithoutFeedback>
  )
}
export default StartButton