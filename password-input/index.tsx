import { i18n, icEye, icEyeSlash } from '@assets'
import { setTestID } from '@utils'
import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import Colors from 'themes/Colors'
import { numberBorderRadius, numberMarginOrPadding } from 'themes/Constants'
import { designColors } from 'themes/design-color'
import { HIT_SLOP } from '@constants'

interface AppProps {
  testID?: any
  containerStyle?: ViewStyle
  value?: string
  refInput?: any
  returnKeyType?:
  | 'default'
  | 'go'
  | 'google'
  | 'join'
  | 'next'
  | 'route'
  | 'search'
  | 'send'
  | 'yahoo'
  | 'done'
  | 'emergency-call'
  secureTextEntry?: boolean
  onChangeText?: (text) => void
  onSubmitEditing?: any
  textInputStyle?: any
}

const ICON_SIZE = 20
const ICON_COLOR = designColors.dark100
const renderRight = (handleShow, isShow) => (
  <TouchableOpacity activeOpacity={1} onPress={handleShow} style={styles.buttonShow} hitSlop={HIT_SLOP}>
    {isShow ? icEyeSlash(ICON_SIZE, ICON_COLOR) : icEye(ICON_SIZE, ICON_COLOR)}
  </TouchableOpacity>
)
export const InputPassword: FunctionComponent<AppProps> = (props: AppProps) => {
  const {
    testID,
    value,
    refInput,
    onChangeText,
    returnKeyType,
    containerStyle,
    secureTextEntry,
    onSubmitEditing,
    textInputStyle,
  } = props
  const [isShow, setShow] = useState(secureTextEntry)
  const handleShow = () => setShow(!isShow)
  return (
    <View style={[styles.containerInput, containerStyle, { paddingHorizontal: 0 }]}>
      <TextInput
        value={value}
        ref={refInput}
        {...setTestID(testID)}
        autoCapitalize="none"
        secureTextEntry={isShow}
        textContentType="password"
        autoCompleteType="password"
        importantForAutofill="yes"
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        placeholder={i18n.t('password')}
        onSubmitEditing={onSubmitEditing}
        style={[styles.textInput, textInputStyle]}
      />
      {renderRight(handleShow, isShow)}
    </View>
  )
}
const styles = StyleSheet.create({
  containerInput: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: numberMarginOrPadding,
    borderRadius: numberBorderRadius,
    paddingHorizontal: numberMarginOrPadding,
    backgroundColor: Colors.backgroundColor.sub,
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    paddingHorizontal: 40,
    color: designColors.darkSlateBlue,
  },
  buttonShow: {
    flex: 0,
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
  },
})
