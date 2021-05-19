import React, { SFC, useState, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import { designColors } from 'themes/design-color'
import { ToolTipReaction } from '../tooltip-reactions'
import { REACTION_TYPE } from '@types'
import { Icon, IconComment } from '@assets'
import { listReactionType } from 'src/constants/reaction'
import { ReactionModal } from '../reaction-modal'
import { noop } from 'lodash'

interface AppProps {
  isIcon?: boolean
  disable?: boolean
  totalComments?: number
  reactionTypeArray?: any[]
  containerStyle?: any
  iconSize?: number
  onPressComment?: () => void
  onPressComment2?: () => void
  onReactionNews?: (aurg: REACTION_TYPE) => void
}

const EMOJI_SIZE = 24

export const ReactionStatus: SFC<AppProps> = (props) => {
  const {
    onPressComment2 = noop,
    onPressComment = noop,
    onReactionNews,
    disable = false,
    totalComments = 0,
    reactionTypeArray,
    containerStyle,
    iconSize = EMOJI_SIZE,
  } = props
  const [isToolTip, setToolTip] = useState(false)
  const onReactionNewsCall = useCallback(
    (aurg: REACTION_TYPE) => {
      setToolTip(false)
      onReactionNews(aurg)
    },
    [onReactionNews]
  )

  const countReactions = reactionTypeArray ? reactionTypeArray.length : 0
  const unique = reactionTypeArray ? [...new Set(reactionTypeArray.map((a) => a.type))] : []
  const [isShowModal, setShowModal] = useState(false)
  const array = reactionTypeArray.concat()

  return (
    <View style={[styles.row, styles.container, containerStyle]}>
      <ReactionModal show={isShowModal} setShow={setShowModal} reactionTypeArray={{ total: array }} />
      <View
        style={[
          styles.containerReaction,
          countReactions > 0 && totalComments > 0 && { paddingVertical: 0 },
          { paddingHorizontal: countReactions > 0 ? 10 : 0 },
        ]}
      >
        {countReactions > 0 ? (
          <TouchableWithoutFeedback
            disabled={disable}
            onPress={() => setShowModal(true)}
            onLongPress={() => setShowModal(true)}
          >
            <View style={styles.button}>
              {listReactionType.map((it, index) => {
                if (unique.includes(it.value)) {
                  return (
                    <Image
                      key={index.toString()}
                      source={it.icon}
                      style={[styles.icon, { width: iconSize, height: iconSize }]}
                    />
                  )
                }
                return <View key={index.toString()} />
              })}
              <Text style={styles.textReaction}>{countReactions}</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View />
        )}
        {totalComments > 0 ? (
          <TouchableWithoutFeedback onPress={onPressComment2}>
            <View style={[styles.button, styles.buttonComment, { paddingHorizontal: countReactions > 0 ? 10 : 0 }]}>
              <IconComment size={16} color={designColors.bird85} />
              <Text style={styles.textComment}>{totalComments}</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View />
        )}
      </View>
      <View style={[styles.row, styles.containerActions]}>
        <TouchableWithoutFeedback onPress={onPressComment} onLongPress={onPressComment}>
          <View style={[styles.iconReact]}>
            <Icon name="comment-alt" size={16} color={designColors.dark100} />
          </View>
        </TouchableWithoutFeedback>
        <ToolTipReaction
          isToolTip={isToolTip}
          setToolTip={setToolTip}
          onReaction={onReactionNewsCall}
          contentStyle={{ marginLeft: 48 }}
        >
          <TouchableWithoutFeedback onPress={() => setToolTip(true)} onLongPress={() => setToolTip(true)}>
            <View style={styles.iconReact}>
              <Icon name="heart" size={16} color={designColors.dark100} />
            </View>
          </TouchableWithoutFeedback>
        </ToolTipReaction>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  containerActions: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  containerReaction: {
    borderRadius: 30,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#e3ebf1',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  textReaction: {
    fontSize: 13,
    lineHeight: 16,
    marginRight: 5,
    marginLeft: 5,
    letterSpacing: -0.26,
    color: designColors.bird85,
  },
  button: {
    zIndex: 999,
    paddingRight: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c3c3c3',
  },
  iconReact: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 32,
    width: 40,
  },
  textComment: {
    fontSize: 13,
    lineHeight: 16,
    color: designColors.bird85,
    marginRight: 5,
    paddingHorizontal: 4,
  },
  buttonComment: {
    paddingHorizontal: 10,
  },
  icon: {
    resizeMode: 'contain',
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
    marginVertical: 5,
    marginLeft: -5,
  },
  buttonLabel: {
    paddingHorizontal: 4,
    fontSize: 13,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: designColors.dark100,
  },
})
