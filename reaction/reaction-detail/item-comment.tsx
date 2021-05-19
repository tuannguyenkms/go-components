/* eslint-disable react/no-unused-prop-types */
import { icReply, SmileIcon } from '@assets'
import { AvatarNew } from '@components/avatar-new'
import { EU } from '@components/mention-editor'
import { LocalSetting } from '@configuration'
import { HIT_SLOP } from '@constants'
import { appModel } from '@models'
import { REACTION_TYPE } from '@types'
import { keyExtractor } from '@utils'
import get from 'lodash/get'
import React, { useCallback, useState } from 'react'
import { FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { designColors } from 'themes/design-color'
import { textStyles } from 'themes/design-texts'
import { formatDateLocalTime } from 'utils/date'
import { ReactionEmoji } from '../reaction-emoji'
import { ToolTipReaction } from '../tooltip-reactions'
import { SIZE_AVATAR, styles } from './styles'

const formatMentionNode = (txt: React.ReactNode, key: string | number) => (
  <Text key={key} style={styles.mention}>
    {txt}
  </Text>
)
const ICON_SIZE = 19

const ItemCommentInfo = ({ item, openActionSheet, onReactionComment, onPressReply }: any) => {
  const content = get(item, 'content')
  const avatar = get(item, 'employeeInfo.profileImageUrl')
  const lastName = get(item, 'employeeInfo.lastName') || '-'
  const firstName = get(item, 'employeeInfo.firstName') || '-'
  const employeeId = get(item, 'employeeId')
  const myId = get(LocalSetting, 'myProfile._id')
  const employeeName = `${firstName} ${lastName}`
  const fullName = myId === employeeId ? 'Me' : employeeName
  const disabledButton = employeeId && myId && myId !== employeeId
  const [state, setState] = useState(false)
  const openActionSheetCall = useCallback(() => {
    openActionSheet(item)
  }, [item])
  const commenetId = item.commentId ? item.commentId : item._id
  const onReactionCommentCall = useCallback(
    (aurg: REACTION_TYPE) => {
      setState(false)
      onReactionComment(item._id, aurg)
    },
    [item]
  )
  const mentionEmployeeId = item.commentId === null ? null : employeeId === myId ? null : employeeId
  const [isProcessing, setProcessing] = useState(false)
  return (
    <View style={{ marginVertical: 12 }}>
      <TouchableWithoutFeedback disabled={disabledButton} onPress={openActionSheetCall}>
        <View style={styles.containerItem}>
          <View style={styles.containerItemHeader}>
            <AvatarNew image={avatar} size={SIZE_AVATAR} style={styles.containerAvatar} />
            <View style={[styles.containerItemContent]}>
              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <Text style={[textStyles.h6SemiBoldLeftH6SemiBold, styles.textName]}>{fullName}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={[textStyles.body15LeftBody15, styles.textComment]}>
                  {EU.displayTextForBE(content, formatMentionNode, appModel.directory.directory || [])}
                </Text>
                <ReactionEmoji iconSize={ICON_SIZE} reactionTypeArray={item.reactionTypeArray} />
                <View style={[styles.row, styles.containerReaction]}>
                  <View style={[styles.row, {}]}>
                    <TouchableOpacity
                      hitSlop={HIT_SLOP}
                      disabled={isProcessing}
                      onPress={async () => {
                        await setProcessing(true)
                        await onPressReply(commenetId, 'REPLY', mentionEmployeeId)
                        setTimeout(() => {
                          setProcessing(false)
                        }, 1000)
                      }}
                    >
                      <View style={[styles.row, styles.containerReply]}>
                        {icReply(16, designColors.dark100, 'solid')}
                      </View>
                    </TouchableOpacity>
                    <ToolTipReaction
                      isToolTip={state}
                      setToolTip={setState}
                      contentStyle={{ marginLeft: 50 }}
                      onReaction={onReactionCommentCall}
                    >
                      <TouchableWithoutFeedback hitSlop={HIT_SLOP} onPress={() => setState(true)}>
                        <View style={[styles.row, styles.containerReply]}>
                          <SmileIcon size={ICON_SIZE} color={designColors.dark100} />
                        </View>
                      </TouchableWithoutFeedback>
                    </ToolTipReaction>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

interface ItemCommentReplyProps {
  item: any
  index: any
  openActionSheet: any
  onPressReply: any
  onReactionComment: any
  onLayoutCommentItem?: any
}

const ItemCommentReply = (props: ItemCommentReplyProps) => {
  const { item, index, openActionSheet, onPressReply, onReactionComment } = props
  return (
    <ItemCommentInfo
      item={item}
      index={index}
      type="REPLY"
      onPressReply={onPressReply}
      openActionSheet={openActionSheet}
      onReactionComment={onReactionComment}
    />
  )
}

export const ItemComment = (props: ItemCommentReplyProps) => {
  const { item, index, openActionSheet, onPressReply, onReactionComment, onLayoutCommentItem } = props
  const arrayReply = get(item, 'arrayReply')
  const renderItemCall = useCallback(
    (obj) => {
      return (
        <ItemCommentReply
          item={obj.item}
          index={obj.index}
          onPressReply={onPressReply}
          openActionSheet={openActionSheet}
          onReactionComment={onReactionComment}
        />
      )
    },
    [item]
  )

  const arrReplyLength = arrayReply.length
  const [isExpand, setExpand] = useState(arrReplyLength === 0)
  const titleReplies = arrReplyLength > 1 ? `${arrReplyLength} replies` : `${arrReplyLength} reply`
  const lastReply = arrReplyLength > 0 ? arrayReply[arrReplyLength - 1] : null
  const updatedAt = get(lastReply, 'updatedAt')
  const createAt = get(lastReply, 'createdAt')
  const lastTimeReply = updatedAt || createAt
  const lastTimeReplyFormated = formatDateLocalTime(lastTimeReply)
  return (
    <View
      onLayout={(e) => {
        const itemHeight = e.nativeEvent.layout.height
        onLayoutCommentItem(itemHeight, index)
      }}
      style={styles.containerList}
    >
      <ItemCommentInfo
        item={item}
        onPressReply={onPressReply}
        openActionSheet={openActionSheet}
        onReactionComment={onReactionComment}
      />
      {isExpand ? (
        <View style={styles.containerItemReply}>
          <FlatList data={arrayReply} extraData={arrayReply} renderItem={renderItemCall} keyExtractor={keyExtractor} />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={() => setExpand(true)}>
          <View style={styles.containerItemReply}>
            <Text style={styles.textClose}>{`${titleReplies} . Last reply ${lastTimeReplyFormated}`}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  )
}
