import * as React from 'react'
import { TouchableOpacity } from 'react-native'

import { icEdit } from '@assets'
import { HIT_SLOP } from '@constants'
import Colors from 'themes/Colors'

interface AppProps {
  iconColor?: string
  iconSize?: number
  onPress?: () => void
}

export const ButtonEdit: React.SFC<AppProps> = (props) => {
  const { iconSize, iconColor, onPress } = props
  return (
    <TouchableOpacity onPress={onPress} hitSlop={HIT_SLOP}>
      {icEdit(iconSize || 25, iconColor || Colors.primary)}
    </TouchableOpacity>
  )
}
