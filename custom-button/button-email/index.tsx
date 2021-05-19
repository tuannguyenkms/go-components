import { ImageEmail } from '@assets'
import React, { FunctionComponent, useCallback } from 'react'
import { Linking, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import Colors from 'themes/Colors'


interface AppProps {
  email?: string
  style?: ViewStyle
  iconColor?: string
  iconSize?: number
  children?: any
}
const handleEmail = async (email: string) => {
  const url = `mailto:${email}`
  const canOpen = await Linking.canOpenURL(url)

  if (!canOpen) {
    console.log('Provided URL can not be handled')
  }
  return Linking.openURL(url)
}

const ButtonEmail: FunctionComponent<AppProps> = (props:AppProps) => {
  const { email = 'npp.nguyentuan@gmail.com',
    iconColor = Colors.mainWhite, iconSize = 15, style, children } = props

  const handleEmailCall = useCallback(() => {
    handleEmail(email)
  }, [])

  return (
    <TouchableOpacity style={[!children && styles.button, style]} onPress={handleEmailCall}>
      {children || <ImageEmail width={iconSize} height={iconSize} color={iconColor} />}
    </TouchableOpacity>
  )
}
export { ButtonEmail }
const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
