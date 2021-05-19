import { FONTS } from '@constants'
import { ISIOS, width } from '@utils'
import { StatusBar, StyleSheet } from 'react-native'
import { designColors } from 'themes/design-color'

export const HEADER_MAX_HEIGHT = 136
export const HEADER_MIN_HEIGHT = 86
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

export const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor:  designColors.white100,
  },
  header: {
    position: 'absolute',
    backgroundColor: designColors.white100,
    top: ISIOS ? StatusBar.currentHeight : 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'flex-end'
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTitleContainer: {
    zIndex: 2,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    lineHeight: 32,
    letterSpacing: -0.3,
    fontFamily: FONTS.SEMI_BOLD,
    color: designColors.darkSlateBlue,
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 32,
    letterSpacing: -0.3,
    fontFamily: FONTS.MEDIUM,
    color: designColors.darkSlateBlue,
  },
  textinput: {
    height: 40,
    borderRadius: 20,
    paddingVertical: 0,
  },
  searchContainer: {
    width: width(100),
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingBottom: 6,
    marginTop: 16
  },
  searchOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  shadow: {
    borderColor: designColors.bird15,
    borderWidth: 0.5,
  },
})
