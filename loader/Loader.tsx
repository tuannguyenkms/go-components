import { LOADER_MESSAGE } from '@constants'
import { width } from '@utils'
import React from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import Colors from 'themes/Colors'
import { textStyles } from 'themes/design-texts'

interface PropsType {
  loading: boolean
  modalBackgroundColor?: string
  message?: string
  type?: 'white' | 'parent'
}

const Loader = ({ loading, modalBackgroundColor, message, type = 'white' }: PropsType) => {
  let backgroundColor = Colors.backdropColor.main
  if (modalBackgroundColor) {
    backgroundColor = modalBackgroundColor
  }
  return (
    <Modal isVisible={loading} backdropOpacity={0.2} animationIn="fadeIn" animationOut="fadeOut" style={{ margin: 0 }}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <View style={[styles.modalBackground, { backgroundColor }]}>
        <View style={[styles.activityIndicatorWrapper, type === 'parent' && { backgroundColor: 'transparent' }]}>
          <ActivityIndicator style={styles.indicator} color={Colors.primary} animating={loading} />
          {type === 'white' && (
            <Text style={[styles.loading, textStyles.h6MediumLeftH6Medium, { textAlign: 'center' }]} numberOfLines={2}>
              {message || LOADER_MESSAGE}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.mainWhite,
    width: width(40),
    borderRadius: 10,
    display: 'flex',
    paddingTop: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  indicator: {
    marginTop: 20,
  },
  loading: {
    marginTop: 16,
    fontSize: 17,
    marginBottom: 20,
  },
  percentLoading: {
    fontSize: 22,
    marginTop: 8,
  },
})

export { Loader }
