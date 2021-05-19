import { HistoryIcon } from '@assets'
import { ShadowView } from '@components/custom-view'
import { recentStore } from '@models'
import { keyExtractor } from '@utils'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { designColors } from 'themes/design-color'
import { styles } from './styles'

interface RecentsTextProps {
  keySuggestion
  onPressTextRecents
  onClose
  isVisible
  renderItemRecents
}

export const RecentsText = (props: RecentsTextProps) => {
  const { keySuggestion, onPressTextRecents, onClose, isVisible, renderItemRecents } = props
  const dataSuggestion =
    recentStore.recents && recentStore.recents[keySuggestion] ? recentStore.recents[keySuggestion] : []
  const shouldShow = dataSuggestion.length > 0
  if (isVisible) {
    const renderItem = ({ item, index }) => {
      if (renderItemRecents) return renderItemRecents({ item, index, onClose })
      return (
        <TouchableOpacity style={[styles.row, styles.containerSuggest]} onPress={() => onPressTextRecents(item.text)}>
          <HistoryIcon size={16} color={designColors.dark100} type="solid" />
          <Text style={styles.textRecents}>{item.text || ''}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View>
        <ShadowView containerStyle={[styles.containerResult]}>
          <>
            <Text style={styles.title}>Recent Searches</Text>
            {shouldShow && (
              <FlatList
                data={dataSuggestion}
                renderItem={renderItem}
                extraData={dataSuggestion}
                keyExtractor={keyExtractor}
              />
            )}
          </>
        </ShadowView>
        <TouchableOpacity style={styles.background} onPress={onClose} />
      </View>
    )
  }
  return <View />
}
