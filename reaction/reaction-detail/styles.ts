import { FONTS } from '@constants'
import { height } from '@utils'
import { StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'

export const SIZE_AVATAR = 42

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: { flexDirection: 'row' },
  containerList: {
    paddingBottom: height(5)
  },
  containerReply: {
    zIndex: 999,
    width: 24,
    height: 24,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    backgroundColor: designColors.bird15,
  },
  containerReaction: {
    position: 'absolute',
    right: 4,
    bottom: -12,
  },
  containerItem: { marginTop: 0 },
  containerItemReply: {
    flex: 1,
    marginTop: 12,
    paddingLeft: 32,
  },
  containerItemContent: {
    flexShrink: 1,
    marginLeft: 8,
    // backgroundColor: designColors.bird3,
  },
  containerItemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerAvatar: {
    width: SIZE_AVATAR,
    height: SIZE_AVATAR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE_AVATAR / 2,
  },
  textTitle: {
    fontSize: 18,
    lineHeight: 26,
    color: Colors.textColor.dark,
  },
  contentContainer: {
    flexShrink: 1,
    minWidth: 180,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: designColors.bird3,
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 14,
    marginTop: 16,
    paddingTop: 8,
    width: '100%',
    lineHeight: 20,
    borderRadius: 4,

    paddingBottom: 10,
    letterSpacing: -0.3,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#f3f7fa',
    color: Colors.textColor.dark,
  },
  textJobTitle: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'normal',
    letterSpacing: -0.4,
    fontWeight: 'normal',
    color: designColors.slat85,
  },
  textName: {},
  textComment: {
    flexShrink: 1,
    paddingVertical: 8,
  },
  textTime: {
    margin: 0,
    opacity: 0.6,
    color: '#2f4237',
    alignSelf: 'flex-end',
  },
  mention: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
    paddingHorizontal: 8,
    position: 'absolute',
    color: Colors.primary,
  },
  text: {
    top: 0,
    height: 24,
    fontSize: 18,
    color: '#111111',
    position: 'absolute',
  },
  reply: {
    fontSize: 12,
    lineHeight: 18,
    color: '#5f7d95',
    letterSpacing: -0.23,
    fontFamily: FONTS.SEMI_BOLD,
  },
  textClose: {
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: '#657283',
    marginLeft: 25,
  },
  reactionIcon: {
    zIndex: 999,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c3c3c3',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designColors.white,
    marginLeft: -8,
  },
  icon: {
    width: 16,
    height: 16,
  },
})
