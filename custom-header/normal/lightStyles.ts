import { StyleSheet } from 'react-native'
import { height, width } from '@utils'
import { designColors } from 'themes/design-color'

const backgroundColor = '#F1F4F8'
export const lightStyles = StyleSheet.create({
  base: {},
  child: {
    backgroundColor,
  },
  container: {
    paddingBottom: height(1),
    paddingHorizontal: width(3),
  },
  row: { flexDirection: 'row' },
  bottomView: {
    height: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#ffffff',
  },
  midContainer: {
    flex: 1,
    alignItems: 'center',
  },
  leftContainer: {
    width: width(10),
    height: width(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContaner: {},
  title: {
    fontSize: 13,
    lineHeight: 20,
    color: designColors.slate,
    letterSpacing: -0.26,
  },
})
