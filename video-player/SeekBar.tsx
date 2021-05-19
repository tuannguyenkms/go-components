import { HIT_SLOP } from '@constants'
import { isNaN, isNumber } from 'lodash'
import React from 'react'
import { View } from 'react-native'
import styles from './styles'

const onSeekStartResponder = () => true

interface SeekBarProps {
  disableSeek
  fullWidth
  progress
  isSeeking
  onSeekBarLayout
  onSeekGrant
  onSeek
  onSeekRelease
}
const SeekBar = (props: SeekBarProps) => {
  const { disableSeek, fullWidth, progress, isSeeking, onSeekBarLayout, onSeekGrant, onSeek, onSeekRelease } = props
  return (
    <View style={[styles.seekBar, fullWidth ? styles.seekBarFullWidth : {}]} onLayout={onSeekBarLayout}>
      <View
        style={[
          { flexGrow: isNumber(progress) && !isNaN(progress) && progress !== Infinity ? progress : 0 },
          styles.seekBarProgress,
        ]}
      />
      {!fullWidth && !disableSeek ? (
        <View
          style={[styles.seekBarKnob, isSeeking ? { transform: [{ scale: 1 }] } : {}]}
          hitSlop={HIT_SLOP}
          onStartShouldSetResponder={onSeekStartResponder}
          onResponderGrant={onSeekGrant}
          onResponderMove={onSeek}
          onResponderRelease={onSeekRelease}
          onResponderTerminate={onSeekRelease}
        />
      ) : null}
      <View
        style={[
          styles.seekBarBackground,
          { flexGrow: 1 - (isNumber(progress) && !isNaN(progress) && progress !== Infinity ? progress : 0) },
        ]}
      />
    </View>
  )
}
export default SeekBar