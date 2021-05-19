import * as React from 'react'
import { View, Text } from 'react-native'
import { icNotification } from '@assets'

interface AppProps {
  name?: string
  badgeCount?: number
  color?: string
  size?: number
}

export const IconWithBadge: React.SFC<AppProps> = (props) => {
  const { badgeCount } = props
  return (
    <View style={{ width: 28, height: 28, margin: 5 }}>
      {icNotification(28, '#111')}
      {badgeCount > 0 && (
        <View
          style={{
            top: -3,
            right: -1,
            width: 16,
            height: 16,
            borderRadius: 8,
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: 'red',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 9, fontWeight: 'bold' }}>
            {badgeCount > 9 ? `${9}+` : badgeCount}
          </Text>
        </View>
      )}
    </View>
  )
}
