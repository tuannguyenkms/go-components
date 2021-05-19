import React from 'react'
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Linking,
  ScrollView,
} from 'react-native'

import Modal from 'react-native-modal'
import HTMLView from 'react-native-htmlview'

import { icClose } from '@assets'
import { HIT_SLOP, FONTS } from '@constants'
import { height, getBottomSpace } from '@utils'
import Colors from 'themes/Colors'
import { numberMarginOrPadding } from 'themes/Constants'

interface AppProps {
  content?: string
  isVisible: boolean
  onClose?: any
}

const PopupBottom: React.SFC<AppProps> = (props) => {
  const { isVisible, onClose, content } = props
  return (
    <Modal
      hasBackdrop
      propagateSwipe
      style={styles.base}
      backdropOpacity={0}
      isVisible={isVisible}
      onBackdropPress={onClose}
      hideModalContentWhileAnimating
    >
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{`Here's what you will need to do.`}</Text>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={HIT_SLOP}
            style={styles.button}
          >
            {icClose(16, Colors.textColor.main)}
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.containerContent}>
          <HTMLView
            value={content}
            onLinkPress={(evt, href) => {
              Linking.openURL(href)
            }}
            imagesMaxWidth={Dimensions.get('window').width}
          />
        </ScrollView>
      </View>
    </Modal>
  )
}
export { PopupBottom }
const styles = StyleSheet.create({
  base: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: height(80),
    minHeight: height(25),
    paddingBottom: getBottomSpace(),
  },
  containerTitle: {
    width: '100%',
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.mainWhite,
    justifyContent: 'space-between',
    borderTopColor: Colors.primary,
    paddingTop: numberMarginOrPadding,
    paddingHorizontal: numberMarginOrPadding,
  },
  containerContent: {
    width: '100%',
    backgroundColor: Colors.mainWhite,
    borderTopColor: Colors.primary,
    paddingTop: numberMarginOrPadding,
    paddingHorizontal: numberMarginOrPadding,
  },
  button: {
    zIndex: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColor.sub,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    color: Colors.textColor.main,
    fontFamily: FONTS.REGULAR,
  },
})
