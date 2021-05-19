import React, { FunctionComponent } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import noop from 'lodash/noop'
import { FONTS } from '@constants'
import { AvatarNew } from '@components/avatar-new'
import Colors from 'themes/Colors'
import { isNil } from 'lodash'
import { designColors } from 'themes/design-color'

interface PropsType {
  tagName: string
  onRemoveTag: () => void
  tagIcon?: string
}

const TagItem: FunctionComponent<PropsType> = ({ tagName, onRemoveTag = noop, tagIcon }: PropsType) => {
  const showTagIcon = !isNil(tagIcon)
  return (
    <TouchableOpacity
      onPress={onRemoveTag}
      style={[
        styles.tagItem,
        { borderRadius: showTagIcon ? 40 : 4, backgroundColor: showTagIcon ? '#f0f4f8' : '#ebfbf0' },
      ]}
    >
      {showTagIcon && <AvatarNew size={18} image={tagIcon} style={styles.containerAvatar} />}
      <Text style={styles.tagName} numberOfLines={1}>
        {tagName}
      </Text>
    </TouchableOpacity>
  )
}
export { TagItem }

const styles = StyleSheet.create({
  tagItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: designColors.duckEggBlue,
    marginRight: 4,
    borderRadius: 40,
    marginBottom: 4,
    maxWidth: 280,
  },
  tagName: {
    fontFamily: FONTS.REGULAR,
    lineHeight: 20,
    fontSize: 15,
    letterSpacing: -0.32,
    color: '#0e223d',
    paddingLeft: 4,
    paddingRight: 8,
  },
  containerAvatar: {
    width: 28,
    height: 28,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: Colors.primaryColor.light,
  },
})
