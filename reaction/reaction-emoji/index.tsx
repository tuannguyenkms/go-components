import React, { SFC, useState, useCallback } from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
  FlatList,
} from 'react-native'
import { listReactionType } from 'src/constants/reaction'
import { ReactionModal } from '../reaction-modal'
import { ReactionTypeArray } from '@constants'
import Colors from 'themes/Colors'
import { keyExtractor } from '@utils'
import { get } from 'lodash'
import { LocalSetting } from '@configuration'

interface AppProps {
  iconSize?: number
  containerStyle?: any
  reactionTypeArray?: any
}

const EMOJI_SIZE = 18

const Item = ({
  item,
  index,
  iconSize,
  setChoose,
  setShowModal,
  reactionTypeArray,
}) => {
  const type = reactionTypeArray[ReactionTypeArray[item.value]] || []
  const countType = type.length
  const icon = item.icon
  const myId = get(LocalSetting, 'myProfile._id')

  const haveMe =
    countType > 0 ? type.find((it) => it.employeeId === myId) : null
  const onPress = useCallback(() => {
    setChoose(item)
    setShowModal(true)
  }, [item])

  if (countType > 0) {
    return (
      <TouchableWithoutFeedback onPress={onPress} onLongPress={onPress}>
        <View
          style={[styles.button, !!haveMe && { borderColor: Colors.primary }]}
        >
          <View style={styles.icon}>
            <Image
              source={icon}
              style={[styles.img, { width: iconSize, height: iconSize }]}
            />
          </View>

          <Text style={styles.textReaction}>{countType}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  return <View />
}

export const ReactionEmoji: SFC<AppProps> = (props) => {
  const { reactionTypeArray, containerStyle, iconSize = EMOJI_SIZE } = props
  const countReactions = reactionTypeArray ? reactionTypeArray.total.length : 0

  const [isShowModal, setShowModal] = useState(false)
  const [choose, setChoose] = useState({ key: 'All', title: 'All' })

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Item
          item={item}
          index={index}
          iconSize={iconSize}
          setChoose={setChoose}
          setShowModal={setShowModal}
          reactionTypeArray={reactionTypeArray}
        />
      )
    },
    [reactionTypeArray]
  )

  return (
    <View style={[styles.row, styles.container, containerStyle]}>
      <ReactionModal
        choose={choose}
        show={isShowModal}
        setShow={setShowModal}
        reactionTypeArray={reactionTypeArray}
      />
      <View style={[styles.containerReaction]}>
        {countReactions > 0 ? (
          <FlatList
            horizontal
            scrollEnabled={false}
            data={listReactionType}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            extraData={reactionTypeArray}
            contentContainerStyle={{
              width: '100%',
              flexWrap: 'wrap',
            }}
          />
        ) : (
          <View />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },

  containerReaction: {
    width: '100%',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textReaction: {
    fontSize: 13,
    marginLeft: 5,
    lineHeight: 18,
    color: '#0e223d',
    letterSpacing: -0.3,
  },

  button: {
    zIndex: 999,
    marginTop: 5,
    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 17.5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f0f0f0',
    justifyContent: 'center',
    backgroundColor: Colors.mainWhite,
  },

  img: {
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
    resizeMode: 'contain',
  },
  icon: {
    marginVertical: 5,
    alignItems: 'center',
    width: EMOJI_SIZE + 1,
    height: EMOJI_SIZE + 1,
    justifyContent: 'center',
    backgroundColor: '#f8ff9c',
    borderRadius: (EMOJI_SIZE + 1) / 2,
  },
})
