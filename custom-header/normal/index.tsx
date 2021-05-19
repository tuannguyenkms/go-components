import React from 'react'
import { StatusBar, View, ViewStyle, TouchableOpacity, Text } from 'react-native'

import { height } from '@utils'
import { icBack } from '@assets'
import { HIT_SLOP } from '@constants'
import { darkStyles } from './darkStyles'
import { lightStyles } from './lightStyles'
import { designColors } from 'themes/design-color'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from 'themes/Colors'

interface HeaderNormalProps {
  title?: string
  style?: ViewStyle
  children?: Element
  statusColor?: string
  type?: 'dark' | 'light'
  leftAction?: () => void
  renderRight?: () => Element
  backgroundChildColor?: string
}
const ICON_SIZE = 30
const ICON_DARK_COLOR = designColors.slate
const ICON_COLOR = Colors.mainWhite
export const HeaderNormal = (props: HeaderNormalProps) => {
  const { type = 'dark', children, style, statusColor, leftAction, title, renderRight, backgroundChildColor } = props
  const styles = type === 'dark' ? darkStyles : lightStyles
  const iconColor = type === 'dark' ? ICON_COLOR : ICON_DARK_COLOR
  const barStyle = type === 'dark' ? 'light-content' : 'dark-content'
  const insets = useSafeAreaInsets()
  return (
    <View style={styles.base}>
      <View style={styles.child}>
        <StatusBar
          barStyle={barStyle}
          backgroundColor={statusColor || type === 'dark' ? designColors.darkBlueGrey : '#F1F4F8'}
        />
        <View style={[styles.container, style, styles.row, { paddingTop: insets.top + height(1) }]}>
          {leftAction && (
            <View style={styles.leftContainer}>
              <TouchableOpacity onPress={leftAction} hitSlop={HIT_SLOP}>
                {icBack(ICON_SIZE, iconColor)}
              </TouchableOpacity>
            </View>
          )}
          <View style={[styles.row, styles.midContainer]}>{title && <Text style={styles.title}>{title}</Text>}</View>
          {renderRight && renderRight()}
        </View>
        <View style={[styles.bottomView, backgroundChildColor && { backgroundColor: backgroundChildColor }]} />
      </View>
      {children}
    </View>
  )
}
