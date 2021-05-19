import React, { useMemo } from 'react'
import { StyleSheet, Image, ViewStyle, ImageStyle, View, Text } from 'react-native'
import { DefaultAvatar, DefaultAvatarBackground } from '@assets'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
import { designColors } from 'themes/design-color'

interface AvatarNewProps {
  image: string | { image: string; originalName: string; displayImg: string }
  style?: ImageStyle | ViewStyle | any
  size?: number
  alphabeAvatar?: string
}

const SIZE = 60

export const AvatarNew = (props: AvatarNewProps) => {
  const { image, style, size, alphabeAvatar } = props
  const img = useMemo(() => image, [image])

  if (img && isString(img)) {
    return (
      <Image
        source={{ uri: img }}
        style={[styles.containerAvatar, style, size && { width: size, height: size, borderRadius: size / 2 }]}
      />
    )
  } else if (img && isObject(img)) {
    const displayImg = get(img, 'displayImg') || ''
    if (displayImg.length > 0) {
      return (
        <Image
          source={{ uri: displayImg }}
          style={[styles.containerAvatar, style, size && { width: size, height: size, borderRadius: size / 2 }]}
        />
      )
    }
  }

  return (
    <View style={[styles.containerAvatar, style, size && { width: size, height: size, borderRadius: size / 2 }]}>
      {alphabeAvatar ? (
        <View
          style={{
            flex: 1,
            backgroundColor: designColors.white,
            borderRadius: size/2,
          }}
        >
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              width: size,
              height: size,
            }}
          >
            <Text style={{ textAlign: 'center'}}>{alphabeAvatar}</Text>
          </View>
          <DefaultAvatarBackground />
        </View>
      ) : (
        <DefaultAvatar width={size || SIZE} height={size || SIZE} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  containerAvatar: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    // backgroundColor: '#c3c3c3',
  },
})
