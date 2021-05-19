import { width } from '@utils'
import { StyleSheet } from 'react-native'
import { designColors } from 'themes/design-color'
import { textStyles } from 'themes/design-texts'

export default StyleSheet.create({
  base: {

    margin: 0,
    marginHorizontal: 16,
  },
  container: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: designColors.white100
  },
  top: {
    paddingTop: 16,
    paddingBottom: 48
  },
  title: {
    ...textStyles.h3SemiBoldCenterH3SemiBold,
    color: designColors.dark100
  },
  subTitle: {
    ...textStyles.body15CenterBody15,
    color: designColors.dark100,
    marginTop: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    width: width(100) - 64,
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: designColors.red100
  },
  button2: {
    marginTop: 8,
    backgroundColor: designColors.bird15
  },
  textButton: {
    ...textStyles.h4SemiBoldCenterH4SemiBold
  },
  textButton1: {
    color: designColors.white100
  },
  textButton2: {
    color: designColors.dark100
  }
})