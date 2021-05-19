/* eslint-disable id-blacklist */
import { icPhoneAlt } from '@assets'
import { call } from '@utils'
import React from 'react'
import { Alert, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import Colors from 'themes/Colors'


interface AppProps {
  style?: ViewStyle
  iconColor?: string
  iconSize?: number
  numberPhone?: string
  children?: any
}
const handleCall = (numberPhone: string) => () => {
  if (numberPhone && numberPhone.length === 0) {
    Alert.alert('Error', 'Number is valid')
  } else {
    const objArgs = {
      number: numberPhone,
      prompt: false,
    }
    // tslint:disable-next-line:no-console
    call(objArgs).catch(console.error)
  }
}

const ButtonCall: React.SFC<AppProps> = (props: AppProps) => {
  const { children, numberPhone = '', iconColor = Colors.mainWhite, iconSize = 15, style } = props

  return (
    <TouchableOpacity
      disabled={!(numberPhone && numberPhone.length !== 0)}
      style={[!children && styles.button, style]}
      onPress={handleCall(numberPhone)}
    >
      {children || icPhoneAlt(iconSize, iconColor, 'solid')}
    </TouchableOpacity>
  )
}
export { ButtonCall }
const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
