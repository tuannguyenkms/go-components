/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
import { ISIOS } from '@utils'
import React, { forwardRef, FunctionComponent, useEffect, useState } from 'react'
import { Platform, StyleSheet, ViewStyle } from 'react-native'
import { WebView, WebViewProps } from 'react-native-webview'
import { getWidth, isSizeChanged, reduceData, shouldUpdate } from './utils'

interface AutoHeightWebViewProps {
  style: ViewStyle
  onSizeUpdated: any
  files: any
  customScript: string
  customStyle: string
  viewportContent: string
  scrollEnabledWithZoomedin: boolean
  // webview props
  originWhitelist: string[]
  onMessage: any
  scalesPageToFit: boolean
  source: any
  scrollEnabled: boolean
}

type AppProps = AutoHeightWebViewProps & WebViewProps & any
const AutoHeightWebView: FunctionComponent<AppProps> = React.memo(
  forwardRef((props:AppProps, ref) => {
    const { style, onMessage, onSizeUpdated, scrollEnabledWithZoomedin, scrollEnabled, addMoreHeight } = props
    const [size, setSize] = useState({
      height: style && style.height ? style.height : 0,
      width: getWidth(style),
    })
    const [scrollable, setScrollable] = useState(false)
    const handleMessage = (event) => {
      onMessage && onMessage(event)
      if (!event.nativeEvent) {
        return
      }
      let data: any = {}
      try {
        data = JSON.parse(event.nativeEvent.data)
      } catch (error) {
        console.error(error)
        return
      }
      const { height, width, zoomedin } = data
      !scrollEnabled && scrollEnabledWithZoomedin && setScrollable(!!zoomedin)
      const { height: previousHeight, width: previousWidth } = size
      isSizeChanged({ height, previousHeight, width, previousWidth }) &&
        setSize({
          height,
          width,
        })
    }

    const currentScrollEnabled = scrollEnabled === false && scrollEnabledWithZoomedin ? scrollable : scrollEnabled
    const { currentSource, script } = reduceData(props)

    const { width, height } = size
    useEffect(
      () =>
        onSizeUpdated &&
        onSizeUpdated({
          height,
          width,
        }),
      [width, height, onSizeUpdated]
    )

    return (
      <WebView
        {...props}
        textZoom={100}
        onMessage={handleMessage}
        style={[
          styles.webView,
          {
            width,
            height: height + (addMoreHeight && !ISIOS ? 20 : 0),
          },
          style,
        ]}
        injectedJavaScript={script}
        source={currentSource}
        scrollEnabled={currentScrollEnabled}
      />
    )
  }),
  (prevProps, nextProps) => !shouldUpdate({ prevProps, nextProps })
)

const defaultProps = {
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  originWhitelist: ['*'],
}

Platform.OS === 'android' &&
  Object.assign(defaultProps, {
    scalesPageToFit: false,
  })

Platform.OS === 'ios' &&
  Object.assign(defaultProps, {
    viewportContent: 'width=device-width',
  })
AutoHeightWebView.defaultProps = defaultProps
const styles = StyleSheet.create({
  webView: {
    backgroundColor: 'transparent',
  },
})

export { AutoHeightWebView }
