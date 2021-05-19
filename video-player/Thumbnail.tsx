import React from 'react'
import { ImageBackground } from 'react-native'
import StartButton from './StartButton'
import styles from './styles'

interface ThumbnailProps {
  style?
  customStyles?
  getSizeStyles?
  thumbnail?
  onStartPress?
}
const Thumbnail = (props:ThumbnailProps) => {
  const { style, customStyles, getSizeStyles, thumbnail } = props
  return (
    <ImageBackground
      {...props}
      style={[styles.thumbnail, getSizeStyles(), style, customStyles.thumbnail]}
      source={thumbnail}
      resizeMode="cover"
    >
      <StartButton {...props} />
    </ImageBackground>
  )
}
export default Thumbnail