import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import Colors from 'themes/Colors'

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColor.light,
  },
})

const ProgressiveImage = (props: any) => {
  const { source, style } = props
  const thumbnailAnimated = new Animated.Value(0)
  const imageAnimated = new Animated.Value(0)

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
    }).start()
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[style, { opacity: thumbnailAnimated }]}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
        onLoad={onImageLoad}
      />
    </View>
  )
}
export { ProgressiveImage }
