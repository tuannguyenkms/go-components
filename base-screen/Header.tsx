import { icBack } from '@assets'
import { HIT_SLOP } from '@constants'
import get from 'lodash/get'
import React from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'
import ReAnimated from 'react-native-reanimated'
import Colors from 'themes/Colors'
import CustomComponent from './CustomComponent'
import { styles } from './styles'


export interface AppProps {
  title?: string
  isBack?: boolean
  icRight?: any
  rightAction?: () => void
  leftAction?: () => void
  backgroundColor?: string
  hasAnimation?: boolean
  animationStyle?: {
    text?: any
    view?: any
  }
  iconLeft?: any
  isReAnimated?: boolean
  renderRight?: ()=> void
}
const Header = (props: AppProps) => {
  const {
    title,
    iconLeft,
    leftAction,
    rightAction,
    backgroundColor,
    isBack = false,
    icRight,
    animationStyle,
    isReAnimated = true,
    renderRight
  } = props

  const textStyleAnimation = get(animationStyle, 'text')
  const viewStyleAnimation = get(animationStyle, 'view')
  const styleContainer: any = [styles.container, { backgroundColor }, viewStyleAnimation]
  const styleTextHeader: any = [styles.textHeader, textStyleAnimation]
  const AnimatedComponent = isReAnimated ? ReAnimated.View : Animated.View

  return (
    <CustomComponent
      style={styles.base}
      isLinearGradient={false}
      colors={[Colors.backdropColor.sub, Colors.mainBlack, Colors.backdropColor.light]}
    >
      <AnimatedComponent style={styleContainer}>
        {isBack && (
          <TouchableOpacity hitSlop={HIT_SLOP} onPress={leftAction} style={styles.leftIcon}>
            <View>{iconLeft ? iconLeft() : icBack(30, '#111111')}</View>
          </TouchableOpacity>
        )}

        <Animated.Text numberOfLines={1} style={styleTextHeader}>
          {title}
        </Animated.Text>
        {
          renderRight
            ? renderRight()
            : icRight && (
              <TouchableOpacity hitSlop={HIT_SLOP} onPress={rightAction} style={styles.rightIcon}>
                {icRight()}
              </TouchableOpacity>
            )
        }
      </AnimatedComponent>
    </CustomComponent>
  )
}
export { Header }
