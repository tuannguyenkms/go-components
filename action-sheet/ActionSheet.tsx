import React, { FunctionComponent, ReactChild } from 'react'
import { StyleSheet, View, Text, ViewStyle } from 'react-native'
import Modal from 'react-native-modal'
import Colors from 'themes/Colors'
import { FONTS } from '@constants'

interface PropsType {
  handleClose?: () => void
  isVisible: boolean
  title?: string
  children?: ReactChild
  containerStyle?: ViewStyle
  animationIn?: any
  animationOut?: any
  backdropOpacity?: number
}

const ActionSheet: FunctionComponent<PropsType> = (props: PropsType) => {
  const {
    title,
    animationIn,
    animationOut,
    isVisible,
    handleClose,
    containerStyle,
    backdropOpacity = 0.2,
    children,
  } = props
  return (
    <Modal
      hasBackdrop
      isVisible={isVisible}
      backdropColor="black"
      backdropOpacity={backdropOpacity}
      swipeDirection="down"
      style={styles.modalContainer}
      onBackdropPress={handleClose}
      onSwipeComplete={handleClose}
      animationIn={animationIn}
      animationOut={animationOut}
    >
      <View style={[styles.container, containerStyle]}>
        <View style={styles.topIconContainer}>
          <View style={styles.topIcon} />
        </View>
        {title && (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    borderColor: Colors.borderColor.main,
    borderWidth: 1,
    backgroundColor: Colors.mainWhite,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontFamily: FONTS.SEMI_BOLD,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: '#0e223d',
  },
  topIcon: {
    width: 34,
    height: 6,
    backgroundColor: '#afbeca',
    borderRadius: 3,
  },
  topIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 20,
  },
})

export default ActionSheet
