import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')
const screenWidth = width < height ? width : height
const screenHeight = width < height ? height : width

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    height: screenHeight / 2,
  },
  container: {
    height: screenHeight / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {},
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sub: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 12,
    textAlign: 'center',
  },
  messageList: {
    // paddingVertical: 50,
  },
  messageText: {},

  footer: {
    backgroundColor: 'lightgreen',
    height: 200,
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 100,
    padding: 15,
  },
  sendBtn: {
    width: 50,
    height: 40,
    backgroundColor: 'green',
    borderRadius: 6,
    marginLeft: 5,
    justifyContent: 'center',
    textAlign: 'center',
  },
  sendBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  mention: {
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: 'rgba(36, 77, 201, 0.05)',
    color: '#244dc9',
  },
})
