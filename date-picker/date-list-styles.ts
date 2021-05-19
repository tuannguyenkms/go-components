import { FONTS } from '@constants'
import { StyleSheet } from 'react-native'
import { designColors } from 'themes/design-color'
import { textStyles } from 'themes/design-texts'

export default StyleSheet.create({
  calendars: { padding: 0, margin: 0, },
  dateStyles: {
    height: 40, margin: 0, padding: 0, width: 40, marginVertical: 4,
  },
  dayName: {
    ...textStyles.caption10AllCapsMediumCenterCaption10AllCaps,
    color: designColors.bird85,
    width: 10,
    textAlign: 'center',
  },
  monthName: {
    color: designColors.dark100,
    letterSpacing: -0.3,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: FONTS.SEMI_BOLD,
    paddingVertical: 8,
    paddingRight: 8,
  },
  iconStyles: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    alignContent: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    flexDirection: 'row',
    backgroundColor: designColors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthStyles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  headerInfo: {
    flexDirection: 'row',
  },
  leftIcon: {

  },
})
