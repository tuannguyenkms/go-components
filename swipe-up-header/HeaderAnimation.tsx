import { FONTS } from '@constants'
import { ISIOS, MYWIDTH } from '@utils'
import React, { FunctionComponent, useState } from 'react'
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TextStyle,
  KeyboardAvoidingView,
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { getBehavior } from 'screens/profile/profile-screen-hook'
import { designColors } from 'themes/design-color'
const HEADER_MAX_HEIGHT = 5
const HEADER_MIN_HEIGHT = 0
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

type PropsType = {
  onRefresh: () => void
  loading: boolean
  title: string
  headerStyle?: TextStyle
  disabledScroll?: boolean
  mainColor?: string
  hadInputfield?: boolean
}

const HeaderAnimation: FunctionComponent<PropsType> = (props) => {
  const insets = useSafeArea()

  const { onRefresh, loading, title, headerStyle } = props
  const [scrollYState] = useState(new Animated.Value(ISIOS ? -HEADER_MAX_HEIGHT : 0))

  const borderWidth = scrollYState.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1, 1],
  })

  const headerTranslate = scrollYState.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  })

  return (
    <>
      <KeyboardAvoidingView style={styles.fill} {...getBehavior()} enabled keyboardVerticalOffset={20}>
        <Animated.ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYState } } }], {
            useNativeDriver: false,
          })}
          bounces
          bouncesZoom
          automaticallyAdjustContentInsets
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          style={styles.fill}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        >
          <View style={[styles.titleContainer, { paddingTop: 0 + insets.top }]}>
            <Text style={[styles.textTitle, headerStyle]}>{title}</Text>
          </View>
          <View style={[styles.scrollViewContent]}>{props.children}</View>
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            {
              height: 55 + (ISIOS ? insets.top : 0),
              backgroundColor: 'transparent',
              borderBottomWidth: borderWidth,
              borderBottomColor: '#eaeaea',
            },
            { transform: [{ translateY: headerTranslate }] },
          ]}
        />
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  fill: {
    paddingTop: 28,
    flex: 1,
    backgroundColor: designColors.white,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: designColors.white,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: MYWIDTH,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: designColors.white,
  },
  bar: {
    backgroundColor: designColors.white,
    marginTop: ISIOS ? 28 : 38,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    paddingVertical: 12,
  },
  title: {
    color: designColors.darkBlueGrey,
    fontSize: 16,
    letterSpacing: -0.3,
    fontFamily: FONTS.MEDIUM,
    paddingHorizontal: 16 * 2,
    backgroundColor: designColors.white,
  },
  scrollViewContent: {
    paddingTop: 12,
  },
  textTitle: {
    fontSize: 26,
    fontFamily: FONTS.BOLD,
    lineHeight: 34,
    letterSpacing: -0.35,
    color: '#09162a',
  },
  titleContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 24,
  },
})

export { HeaderAnimation }
