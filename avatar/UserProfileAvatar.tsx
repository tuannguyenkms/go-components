import * as React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle, Image, View } from 'react-native'

import { DefaultAvatar } from '@assets'
import Colors from 'themes/Colors'

interface AppProps {
  size?: number
  imageUrl: string
  onPress?: () => void
  disabled?: boolean
  styleContainerProp?: ViewStyle
}

const UserProfileAvatar: React.FunctionComponent<AppProps> = (props) => {
  const { styleContainerProp, disabled = false, onPress, size = 50, imageUrl } = props
  const [url, setUrl] = React.useState(imageUrl)

  React.useEffect(() => {
    setUrl(imageUrl)
  }, [imageUrl])

  const styleContainer = [
    {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
  ]

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={1}
      style={[
        styleContainer,
        styleContainerProp,
        {
          backgroundColor: Colors.mainWhite,
        },
      ]}
      onPress={onPress}
    >
      {url ? (
        <Image style={[styles.container, styleContainer]} source={{ uri: url }} />
      ) : (
        <View style={[styles.defaultAvatar, styleContainer]}>
          <DefaultAvatar />
        </View>
      )}
    </TouchableOpacity>
  )
}
export { UserProfileAvatar }
const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primaryColor.light,
  },
  defaultAvatar: {
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.borderColor.lineBorder,
    justifyContent: 'center',
  },
})
