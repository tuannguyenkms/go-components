import { icBack } from '@assets'
import { Loader } from '@components'
import { HIT_SLOP } from '@constants'
import { useFocusEffect } from '@react-navigation/native'
import { getStatusBarHeight } from '@utils'
import { observer } from 'mobx-react'
import React, { ReactChild, useCallback } from 'react'
import { StatusBar, StatusBarProps, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'themes/Colors'
import { numberMarginOrPadding } from 'themes/Constants'
import { Header } from './Header'


export interface AppProps {
  style?: any
  title?: string
  baseStyle?: any
  isBack?: boolean
  isHeader?: boolean
  isLoading?: boolean
  animationStyle?: any
  statusColor?: string
  children?: ReactChild
  leftAction?: () => void
  backgroundColor?: string
  isReAnimated?: boolean
  icRight?: any
  rightAction?: () => void
  iconLeft?: any
  statusBarProps?: StatusBarProps
  renderRight?: ()=> void
}

const BaseScreen = observer((props: AppProps) => {
  const {
    title,
    style,
    isBack,
    iconLeft,
    children,
    isHeader,
    leftAction,
    baseStyle,
    animationStyle,
    backgroundColor,
    isLoading = false,
    isReAnimated,
    statusColor = Colors.mainWhite,
    icRight,
    statusBarProps,
    rightAction,
    renderRight
  } = props
  const renderRightButtonNoHeader = () => {
    return (
      !isHeader &&
      isBack && (
        <TouchableOpacity hitSlop={HIT_SLOP} onPress={leftAction} style={styles.buttonBack}>
          {iconLeft ? iconLeft() : icBack(30, '#111111')}
        </TouchableOpacity>
      )
    )
  }
  const renderHeader = () => {
    return (
      isHeader && (
        <Header
          title={title}
          isBack={isBack}
          icRight={icRight}
          iconLeft={iconLeft}
          leftAction={leftAction}
          rightAction={rightAction}
          renderRight={renderRight}
          isReAnimated={isReAnimated}
          animationStyle={animationStyle}
          backgroundColor={backgroundColor || statusColor || Colors.mainWhite}
        />
      )
    )
  }
  const insets = useSafeAreaInsets()
  useFocusEffect(
    useCallback(() => {
      statusBarProps && statusBarProps.barStyle && StatusBar.setBarStyle(statusBarProps.barStyle)
    }, [])
  )
  return (
    <View style={[styles.base, baseStyle, { paddingTop: insets.top > 0 ? insets.top * 1.25 : 10 }]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.mainWhite} {...statusBarProps} />
      {renderRightButtonNoHeader()}
      {renderHeader()}
      <Loader loading={isLoading} />
      <View style={[styles.container, style]}>{children}</View>
    </View>
  )
})
export { BaseScreen }
const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: Colors.mainWhite,
  },
  container: {
    flex: 1,
  },
  buttonBack: {
    width: 60,
    zIndex: 2,
    position: 'absolute',
    left: numberMarginOrPadding,
    marginTop: getStatusBarHeight(true) + 15,
  },
})
