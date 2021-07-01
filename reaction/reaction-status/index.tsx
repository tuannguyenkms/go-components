import { Icon } from '@assets'
import { REACTION_TYPE } from '@types'
import { noop } from 'lodash'
import React, { SFC, useCallback, useState } from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { listReactionType } from 'src/constants/reaction'
import { designColors } from 'themes/design-color'
import { textStyles } from 'themes/design-texts'
import { ReactionModal } from '../reaction-modal'
import { ToolTipReaction } from '../tooltip-reactions'
import { width } from '@utils'

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

const EMOJI_SIZE = 16

export const ReactionStatus: SFC<AppProps> = (props: any) => {
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
          { paddingHorizontal: countReactions > 0 ? 6 : 0 },
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
                    <View
                      key={index.toString()}
                      style={[styles.iconContainer, { zIndex: listReactionType.length - index }]}>
                      <Image
                        key={index.toString()}
                        source={it.icon}
                        style={[styles.icon, { width: iconSize, height: iconSize }]}
                      />
                    </View>
                  )
                }
                return <View key={index.toString()} />
              })}
              <Text style={[textStyles.body13LeftBody13, styles.textReaction]}>{countReactions}</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View />
        )}
        {totalComments > 0 ? (
          <TouchableWithoutFeedback onPress={onPressComment2}>
            <View style={[styles.button, styles.buttonComment]}>
              <View style={styles.point} />
              <Text style={[textStyles.body13LeftBody13, styles.textComment]}>
                {totalComments > 1 ? `${totalComments} comments` : `${totalComments} comment`}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View />
        )}
      </View>
      <View style={[styles.row, styles.containerActions]}>
        <ToolTipReaction
          isToolTip={isToolTip}
          setToolTip={setToolTip}
          onReaction={onReactionNewsCall}
          contentStyle={{ marginLeft: width(6) }}
        >
          <TouchableWithoutFeedback onPress={() => setToolTip(true)} onLongPress={() => setToolTip(true)}>
            <View style={styles.iconReact}>
              <Icon name="heart" size={20} color={designColors.dark100} />
            </View>
          </TouchableWithoutFeedback>
        </ToolTipReaction>
        <TouchableWithoutFeedback onPress={onPressComment} onLongPress={onPressComment}>
          <View style={[styles.iconReact]}>
            <Icon name="comment-alt" size={20} color={designColors.dark100} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#e3ebf1',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  textReaction: {
    marginLeft: 8,
  },
  button: {
    zIndex: 999,
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
    width: 22,
    marginLeft: 26,
  },
  textComment: {},
  buttonComment: {},
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designColors.white,
    marginVertical: 5,
    marginLeft: -8,
  },
  icon: {
    resizeMode: 'contain',
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
  },
  buttonLabel: {
    paddingHorizontal: 4,
    fontSize: 13,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: designColors.dark100,
  },
  point: {
    width: 2,
    height: 2,
    borderRadius: 2,
    marginHorizontal: 8,
    backgroundColor: designColors.bird65,
  },
})
