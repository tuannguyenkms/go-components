import { FONTS } from '@constants'
import { StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
import { numberMarginOrPadding } from 'themes/Constants'
import { designColors } from 'themes/design-color'


const SIZE_AVATAR = 45
export const styles = StyleSheet.create({
  containerItem: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: numberMarginOrPadding,
    borderBottomColor: designColors.paleGreyTwo,
  },
  containerContent: {
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerContent2: {
    height: 70,
    justifyContent: 'center',
  },
  containerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: numberMarginOrPadding,
    paddingBottom: 16,
  },
  containerAvatar: {
    width: SIZE_AVATAR,
    height: SIZE_AVATAR,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE_AVATAR / 2,
    marginBottom: 12,
    backgroundColor: Colors.primaryColor.light,
  },
  button: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: designColors.paleGrey,
  },
  textName: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONTS.SEMI_BOLD,
    color: designColors.darkSlateBlue,
  },
  textDepartment: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: FONTS.REGULAR,
    color: designColors.greyBlue,
  },
  offIcon: {
    width: 14,
    height: 14,
    zIndex: 1001,
    borderRadius: 7,
    position: 'absolute',
    top: SIZE_AVATAR - 15,
    left: SIZE_AVATAR - 15,
    backgroundColor: '#afbeca',
  },
  icon: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBottomLine: {
    borderBottomWidth: 0,
  },
})
