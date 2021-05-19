import { FONTS } from '@constants'
import { StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'
import { textStyles } from 'themes/design-texts'


export default StyleSheet.create({
  date: {
  },
  dateView: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: 'center',
  },
  textLabel: {
    ...textStyles.h4MediumCenterH4Medium,
    color: designColors.dark100,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  visibleDot: {
    opacity: 1,
    backgroundColor: Colors.primaryColor.main,
  },
  subVisibleDot: {
    opacity: 1,
    backgroundColor: Colors.labelColor.warning,
  },
  subMarking: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 2,
  },
  marking: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -6,
    left: 14,
  },
  todayLabel: {
    color: designColors.goPrim100,
    lineHeight: 20,
    letterSpacing: -0.26,
    fontFamily: FONTS.SEMI_BOLD,
  },
})
