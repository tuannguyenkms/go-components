import { IconAttendanceEmpty, ImageEmptyDocs, ImageEmptyEmployee, ImageEmptyNews, ImageEmptyTask } from '@assets'
import { FONTS } from '@constants'
import { width } from '@utils'
import * as React from 'react'
import { StyleSheet, Text, TextProps, View, ViewStyle } from 'react-native'
import { designColors } from 'themes/design-color'


interface NoResultProps {
  type?: 'docs' | 'directory' | 'news' | 'task' | 'search' | 'notification' | 'attendance' | 'dependents'
  subTitle?: string
  style?: ViewStyle
  noImage?: boolean
  renderIcon?: () => any
  textProps?: TextProps
  title?:string
}

const ICON_SIZE = 80
export const NoResult: React.FunctionComponent<NoResultProps> = (props:NoResultProps) => {
  const { style, type, title: titleProps = '', subTitle: subTitleProps = '', noImage = false, textProps } = props
  let title  = `No results`
  let subTitle = `Try using different keywords or filters`
  let ImageEmpty = ImageEmptyDocs
  switch (type) {
    case 'news':
      title = `No news yet`
      subTitle = ``
      ImageEmpty = ImageEmptyNews
      break
    case 'docs':
      title = `No documents yet`
      subTitle = `Keep your info up to date by uploading new documents here`
      ImageEmpty = ImageEmptyDocs
      break
    case 'directory':
      title = `No employees yet`
      subTitle = `No employees found. Try to search with a different location or department.`
      ImageEmpty = ImageEmptyEmployee
      break
    case 'task':
      subTitle = `Yay you have no assigned checklist so there is no task here.`
      ImageEmpty = ImageEmptyTask
      break
    case 'search':
      title  = `No results`
      subTitle = `Try using different keywords or filters`
      break
    case 'attendance':
      title  = `No records to show`
      subTitle = `Your currently have no direct reports`
      ImageEmpty = IconAttendanceEmpty
      break
    case 'notification':
      title  = ``
      subTitle = `No activities yet`
      break
    case 'dependents':
      title  = ``
      subTitle = `No dependents added yet`
      break
    default:
      break
  }
  return (
    <View style={[styles.base, style]}>
      <View style={styles.container}>
        {!noImage && <ImageEmpty width={ICON_SIZE} height={ICON_SIZE} />}
        <Text style={[styles.sub,styles.title]}>{titleProps||title}</Text>
        <Text style={styles.sub} {...textProps}>
          {subTitleProps || subTitle}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: -0.27,
    color: designColors.darkSlateBlue,
  },
  title: {
    fontFamily: FONTS.SEMI_BOLD
  },
  sub: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 28,
    width: width(70),
    letterSpacing: -0.37,
    textAlign: 'center',
    color: designColors.greyblue,
  },
})
