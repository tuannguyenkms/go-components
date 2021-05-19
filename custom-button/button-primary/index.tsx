import React from 'react'
import { Text, TextStyle, StyleSheet, ButtonProps, TouchableWithoutFeedback, Animated } from 'react-native'
import i18n from 'i18n-js'
import Spinner from 'react-native-spinkit'
import { FONTS } from '@constants'
import Colors from 'themes/Colors'

interface AppProps {
  title: string
  style?: any
  isLoading?: boolean
  onPress?: () => void
  disabled?: boolean
  textStyle?: TextStyle
  children?: any
}

type ButtonPrimaryProps = AppProps & ButtonProps

const ButtonPrimary = (props: ButtonPrimaryProps) => {
  const { isLoading, onPress, disabled, title = i18n.t('sign_in'), style, textStyle, children } = props

  // const [bool, setBool] = useState(false)
  // const animatedValue = useAnimation({
  //   type: 'timing',
  //   duration: 100,
  //   initialValue: 1,
  //   toValue: bool ? 1 : 0,
  //   useNativeDriver: false,
  // })

  // const widthProp = get(style, 'width') || SIZE * 3
  // const heightProp = get(style, 'height') || SIZE
  // const borderRadiusProp = get(style, 'borderRadius') || numberBorderRadius
  // const paddingHorizontalProp = get(style, 'paddingHorizontal') || numberMarginOrPadding * 2

  // const heightAnimation = animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [heightProp, SIZE],
  // })

  // const widthAnimation = animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [widthProp, SIZE],
  // })

  // const borderRadiusAnimation = animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [borderRadiusProp, SIZE / 2],
  // })

  // const paddingHorizontalAnimation = animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [paddingHorizontalProp, 0],
  // })

  return (
    <TouchableWithoutFeedback {...props} disabled={disabled} onPress={onPress}>
      <Animated.View
        style={[
          styles.button,
          style,
          // {
          //   width: widthAnimation,
          //   height: heightAnimation,
          //   borderRadius: borderRadiusAnimation,
          //   paddingHorizontal: paddingHorizontalAnimation,
          // },
        ]}
      >
        {isLoading ? (
          <Spinner size={20} color="#fff" isVisible={isLoading} type="FadingCircleAlt" />
        ) : (
          <>
            {children}
            <Text style={[styles.textButton, textStyle]}>{!isLoading ? title : ''}</Text>
          </>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
export { ButtonPrimary }
const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  textButton: {
    fontSize: 16,
    color: Colors.mainWhite,
    fontFamily: FONTS.SEMI_BOLD,
  },
})
