/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Spinner from 'react-native-spinkit'
import Video from 'react-native-video'
import { designColors } from 'themes/design-color'
import StartButton from './StartButton'
import styles from './styles'
import Thumbnail from './Thumbnail'

interface VideoPlayerProps {
  duration?
  video
  style?
  resizeMode?
  pauseOnPress?
  fullScreenOnLongPress?
  muted?
  paused?
  thumbnail?
  endThumbnail?
  disableSeek?
  disableFullscreen?
  autoplay?
  endWithThumbnail?
  onEnd?
  hasEnded?
  onProgress?
  loop?
  customStyles?
  videoWidth?
  controlsTimeout?
  videoHeight?
  onLoad?
  onPlayPress?
  onMutePress?
  onHideControls?
  onShowControls?
  disableControlsAutoHide?
  onStart?
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const {
    style,
    muted,
    video,
    paused,
    duration,
    thumbnail,
    resizeMode,
    endThumbnail,
    autoplay = false,
  } = props
  const player = useRef(null)
  const [width, setWidth] = useState(200)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setPlaying] = useState(false)
  const [isStarted, setStarted] = useState(false)
  const [hasEnded, setEnd] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isSeeking] = useState(true)
  const [stateDuration, updateDuration] = useState(0)
  const [isMuted] = useState(false)
  const [, updateControlVisible] = useState(false)
  const [controlsTimeout, updateControlTimeOut] = useState(null)

  const onLayout = useCallback(
    (event) => {
      setWidth(event.nativeEvent.layout.width)
    },
    [setWidth]
  )

  const onProgress = useCallback(
    (event) => {
      setLoading(false)

      if (isSeeking) {
        return
      }
      if (props.onProgress) {
        props.onProgress(event)
      }
      setProgress(event.currentTime / (duration || stateDuration))
    },
    [isSeeking, setProgress]
  )

  const onEnd = useCallback(
    (event) => {
      if (props.onEnd) {
        props.onEnd(event)
      }

      if (props.endWithThumbnail || props.endThumbnail) {
        setStarted(false)
        setEnd(true)
        player.current.dismissFullscreenPlayer()
      }
      setProgress(1)
      if (!props.loop) {
        setPlaying(false)
        player && player.current.seek(0)
      } else {
        player.current.seek(0)
      }
    },
    [player]
  )

  const onLoad = useCallback(
    (event) => {
      if (props.onLoad) {
        props.onLoad(event)
      }
      updateDuration(event.duration)
    },
    [updateDuration]
  )








  const getSizeStyles = () => {
    const { videoWidth, videoHeight } = props
    const ratio = videoHeight / videoWidth
    return {
      height: width * ratio,
      width,
    }
  }

  const hideControls = () => {
    if (props.onHideControls) {
      props.onHideControls()
    }

    if (props.disableControlsAutoHide) {
      return
    }

    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
      updateControlTimeOut(null)
    }
    updateControlTimeOut(
      setTimeout(() => {
        updateControlVisible(false)
      }, props.controlsTimeout)
    )
  }


  const onStartPress = useCallback(() => {
    if (props.onStart) {
      props.onStart()
    }
    setPlaying(true)
    setStarted(true)
    setEnd(false)
    setProgress(progress === 1 ? 0 : progress)

    hideControls()
  }, [])

  const renderContent = () => {
    if (hasEnded && endThumbnail) {
      return <Thumbnail getSizeStyles={getSizeStyles} thumbnail={endThumbnail} {...props} />
    }
    if (!isStarted && thumbnail) {
      return <Thumbnail getSizeStyles={getSizeStyles} thumbnail={thumbnail} {...props} />
    }
    if (!isStarted) {
      return (
        <View style={[styles.preloadingPlaceholder, getSizeStyles(), style]}>
          <StartButton {...props} onStartPress={onStartPress} />
        </View>
      )
    }
    return (
      <View>
        <View
          style={{
            zIndex: 10,
            height: '100%',
            alignSelf: 'center',
            position: 'absolute',
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size={30} color={designColors.goPrim100} isVisible={loading} type="Circle" />
          </View>
        </View>
        <Video
          {...props}
          style={[styles.video, getSizeStyles(), style]}
          ref={player}
          fullscreen
          muted={muted || isMuted}
          paused={paused ? paused || !isPlaying : !isPlaying}
          onProgress={onProgress}
          onEnd={onEnd}
          onLoad={onLoad}
          source={video}
          resizeMode={resizeMode}
        />
      </View>
    )
  }

  useEffect(() => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
      updateControlTimeOut(null)
    }
    if (props.autoplay) {
      setPlaying(true)
      setStarted(true)
      hideControls()
    }
  }, [])
  return <View onLayout={onLayout}>{renderContent()}</View>
}

VideoPlayer.defaultProps = {
  videoWidth: 1280,
  videoHeight: 720,
  autoplay: true,
  controlsTimeout: 2000,
  loop: false,
  resizeMode: 'contain',
  disableSeek: false,
  pauseOnPress: false,
  fullScreenOnLongPress: false,
  customStyles: {},
}

export { VideoPlayer }
