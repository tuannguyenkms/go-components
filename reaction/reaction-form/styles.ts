import { StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
import { height, heightScale } from '@utils'

const BUTTON_SIZE = 32
export const styles = StyleSheet.create({
  trackingToolbarContainer: {
    left: 0,
    margin: 0,
    bottom: 0,
    padding: 0,
    zIndex: 1000,
    width: '100%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    zIndex: 3,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.mainWhite,
  },
  containerInputBackground: {
    paddingHorizontal: 20,
    position: 'relative',
  },
  inputContainer: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    minHeight: 45,
    paddingTop: 8,
    lineHeight: 18,
    paddingBottom: 12,
    letterSpacing: -0.3,
    maxHeight: height(17),
    paddingHorizontal: 16,
    justifyContent: 'center',
    color: Colors.textColor.dark,
  },
  textInputButton: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.3,
    maxHeight: height(17),
    color: Colors.textColor.dark,
  },
  buttonTextInput: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sendButton: {
    marginLeft: 10,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: Colors.primary,
  },
  emojiButton: {
    flex: 0,
    paddingLeft: 15,
  },
  button: {
    alignSelf: 'flex-end',
    height: 56,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAction: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textColor.charcoal,
  },
  textReply: {
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 16,
    letterSpacing: -0.3,
    color: '#0e223d',
  },

  // commment input
  containerInput: {
    flex: 1,
  },
  formmatedText: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '400',
  },
  inputIos: {
    top: 0,
    fontSize: 16,
    minHeight: 40,
    width: '100%',
    lineHeight: 25,
    fontWeight: '400',
    color: 'transparent',
    paddingTop: heightScale(1),
  },
  inputAndroid: {
    top: 0,
    fontSize: 16,
    minHeight: 40,
    width: '100%',
    lineHeight: 25,
    fontWeight: '400',
    paddingHorizontal: 0,
    color: 'transparent',
  },
  formmatedTextWrapper: {
    top: 0,
    width: '100%',
    minHeight: 40,
    position: 'absolute',
    marginHorizontal: 20,
    paddingVertical: heightScale(1.5),
  },
  // -endxx

  inputContainerChild: {
    paddingHorizontal: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  mention: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '400',
    backgroundColor: 'rgba(36, 77, 201, 0.05)',
    color: Colors.primary,
  },
  placeholderText: {
    fontSize: 16,
    lineHeight: 25,
    color: 'rgba(0, 0, 0, 0.1)',
  },
  editorContainer: {
    zIndex: 2,
    borderRadius: 24,
    maxHeight: height(17),
    backgroundColor: '#f3f7fa',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
})
