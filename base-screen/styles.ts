import { StyleSheet } from 'react-native'

import { width, ISIOS } from '@utils'
import Colors from 'themes/Colors'
import { numberMarginOrPadding } from 'themes/Constants'
import { FONTS } from '@constants'

const HEADER_HEIGHT = 45
const styles = StyleSheet.create({
  base: {
    width: width(100),
    justifyContent: 'center',
    paddingTop: ISIOS ? 0 : 0,
    height: ISIOS ? 10 + HEADER_HEIGHT : HEADER_HEIGHT,
  },
  container: {
    width: width(100),
    height: HEADER_HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.mainWhite,
  },
  textHeader: {
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    fontFamily: FONTS.SEMI_BOLD,
    color: Colors.textColor.charcoal,
    marginLeft: numberMarginOrPadding,
    marginRight: numberMarginOrPadding * 2,
  },
  leftIcon: {
    width: 40,
    zIndex: 1000,
    alignItems: 'center',
    flexDirection: 'row',
    left: numberMarginOrPadding,
    justifyContent: 'flex-start',
  },
  rightIcon: {
    width: 40,
    zIndex: 1000,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: numberMarginOrPadding,
  },
  groubBtnRight: {
    right: 15,
    paddingHorizontal: 10,
    height: '100%',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtBack: {
    fontSize: 17,
    left: 10,
  },
  txtCompany: {
    fontSize: 20,
    color: Colors.mainWhite,
    fontFamily: FONTS.SEMI_BOLD,
  },
})
export { styles }
