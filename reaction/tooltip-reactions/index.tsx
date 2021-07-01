import React from 'react'
import Tooltip from 'react-native-walkthrough-tooltip'
import { View, Image, TouchableWithoutFeedback, ViewStyle, StatusBar } from 'react-native'
import { REACTION_TYPE } from '@types'
import { listReactionType } from 'src/constants/reaction'
import { ISIOS, width } from '@utils'

const ICON_SIZE = 25
interface ListTypeReactionsProps {
  onReaction: (aurg: REACTION_TYPE) => void
}
const ListTypeReactions = (props: ListTypeReactionsProps) => {
  const { onReaction } = props
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {listReactionType.map((item, index) => (
        <TouchableWithoutFeedback key={index.toString()} onPress={() => onReaction(item.value)}>
          <Image
            source={item.icon}
            style={{
              resizeMode: 'contain',
              width: ICON_SIZE,
              height: ICON_SIZE,
              marginHorizontal: 10,
              marginVertical: 2,
            }}
          />
        </TouchableWithoutFeedback>
      ))}
    </View>
  )
}

interface ToolTipReactionProps {
  isToolTip?: boolean
  setToolTip?: (aurg) => void
  children?: any
  onReaction: (aurg: REACTION_TYPE) => void
  contentStyle?: ViewStyle
}

export const ToolTipReaction = (props: ToolTipReactionProps) => {
  const { isToolTip, setToolTip, children, onReaction, contentStyle } = props
  return (
    <Tooltip
      placement="top"
      isVisible={isToolTip}
      content={<ListTypeReactions onReaction={onReaction} />}
      onClose={() => setToolTip(false)}
      backgroundColor="transparent"
      topAdjustment={ISIOS ? 0 : -StatusBar.currentHeight}
      tooltipStyle={{ shadowOpacity: 0.1 }}
      arrowStyle={{ marginLeft: width(3) }}
      contentStyle={[
        {
          borderRadius: 50,
          marginLeft: -20,
        },
        contentStyle,
      ]}
    >
      {children}
    </Tooltip>
  )
}
