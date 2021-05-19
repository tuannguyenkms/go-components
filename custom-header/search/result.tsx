import { ShadowView } from '@components/custom-view'
import { NoResult } from '@components/no-result'
import { height, keyExtractor } from '@utils'
import React, { useCallback } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { ItemResult } from './item-result'
import { styles } from './styles'

interface ResultProps {
  sub?: string
  data?: any[]
  onPress?: any
  onClose?: any
  renderItem?: any
  textinput?: string
  isVisible?: boolean
  keySuggestion?: string
  onPressTextRecents?: any
}

const ResultContent = ( props: ResultProps ) => {
  const { onPress, onClose, data = [], renderItem } = props
  const countResult = data.length
  const renderItemCall = useCallback(
    ({ item, index }) => {
      if (renderItem) return renderItem({ item, index, onClose })
      return <ItemResult item={item} onClose={onClose} onPress={onPress} />
    },
    [data]
  )

  if (data.length === 0) {
    return (
      <ShadowView containerStyle={[styles.containerResult, { height: height(40) }]}>
        <NoResult {...{ type: 'search' }} />
      </ShadowView>
    )
  }
  return (
    <ShadowView containerStyle={styles.containerResult}>
      <>
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={keyExtractor}
          renderItem={renderItemCall}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.footer}>
          <Text style={styles.textFooter}>{`${countResult} result(s)`}</Text>
        </View>
      </>
    </ShadowView>
  )
}

export const Result = (props: ResultProps) => {
  const { isVisible, onClose } = props
  if (isVisible)
    return (
      <View style={styles.container}>
        <ResultContent  {...props} />
        <TouchableOpacity style={styles.background} onPress={onClose} />
      </View>
    )
  return <View />
}
