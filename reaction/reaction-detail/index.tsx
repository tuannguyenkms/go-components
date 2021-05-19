import { REACTION_TYPE } from '@types'
import { keyExtractor } from '@utils'
import React, { FunctionComponent, useCallback, useRef } from 'react'
import { FlatList, View } from 'react-native'
import { ItemComment } from './item-comment'
import { styles } from './styles'

interface AppProps {
  arrComment: {
    comment: string
    userInfo: { avatar: string; name: string; jobTitle: string }
  }[]
  onLayout?: any
  openActionSheet?: any
  onPressReply: (commenetId, commentType, employeeId) => void
  onReactionComment: (commnetId: string, aurg1: REACTION_TYPE) => void
  onLayoutCommentItem: (e) => void
}

export const ReactionDetail: FunctionComponent<AppProps> = (props:AppProps) => {
  const {
    onLayout,
    arrComment,
    onPressReply,
    openActionSheet,
    onReactionComment,
    onLayoutCommentItem,
  } = props
  const refFlatlist = useRef(null)
  const renderItemCall = useCallback(
    ({ item, index }: any) => (
      <ItemComment
        item={item}
        index={index}
        onPressReply={onPressReply}
        openActionSheet={openActionSheet}
        onReactionComment={onReactionComment}
        onLayoutCommentItem={onLayoutCommentItem}
      />
    ),
    [arrComment]
  )
  return (
    <View onLayout={onLayout} style={styles.container}>
      <FlatList
        ref={refFlatlist}
        data={arrComment}
        extraData={arrComment}
        renderItem={renderItemCall}
        keyExtractor={keyExtractor}
      />
    </View>
  )
}
