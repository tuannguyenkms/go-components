import React, { useCallback } from 'react'
import { StyleSheet, View, FlatList, Text, Image } from 'react-native'
import { keyExtractor } from '@utils'
import get from 'lodash/get'
import { listReactionType } from 'src/constants/reaction'
import { AvatarNew } from '@components/avatar-new'

const SIZE_AVATAR = 60

const ImageWithType = ({ typeReaction }) => {
  const value = listReactionType.find((i) => i.value === typeReaction)
  if (value) return <Image source={value.icon} style={styles.img} />
  else return <View />
}

const Item = ({ item, index }) => {
  const typeReaction = get(item, 'type')
  const firstName = get(item, 'employeeInfo.firstName')
  const lastName = get(item, 'employeeInfo.lastName')
  const profileImageUrl = get(item, 'employeeInfo.profileImageUrl')
  const fullName = `${firstName} ${lastName}`

  return (
    <View style={[styles.row, styles.containerItem]}>
      <View style={styles.containerAvatar}>
        <AvatarNew
          size={SIZE_AVATAR}
          image={profileImageUrl}
          style={styles.containerAvatar}
        />

        <ImageWithType typeReaction={typeReaction} />
      </View>
      <View style={styles.containerInfo}>
        <Text>{fullName}</Text>
      </View>
    </View>
  )
}

export const Scene = ({ data }) => {
  const renderItem = useCallback(
    ({ item, index }) => {
      return <Item item={item} index={index} />
    },
    [data]
  )
  return (
    <FlatList
      data={data}
      extraData={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
  )
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  scene: {
    flex: 1,
  },
  containerItem: {
    marginTop: 8,
    alignItems: 'center',
  },
  containerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#c3c3c3',
  },
  containerInfo: {
    marginLeft: 16,
  },
  img: {
    width: 20,
    height: 20,
    marginTop: 40,
    marginLeft: 40,
    position: 'absolute',
    resizeMode: 'contain',
  },
})
