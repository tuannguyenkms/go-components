import * as React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'

import { numberMarginOrPadding } from 'themes/Constants'
import { TextInputSearch } from '../../custom-textinput/text-input-search'

interface AppProps {
  onPress?: () => void
  containerStyle?: ViewStyle
  inputStyle?: ViewStyle
  customRight?: () => any
}

const ButtonSearch: React.SFC<AppProps> = (props) => {
  const { onPress, containerStyle, inputStyle, customRight } = props

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onPress} style={[styles.containerButton, containerStyle]}>
      <TextInputSearch
        editable={false}
        placeholder="Search people"
        containerStyle={[styles.containerInput, inputStyle]}
      />
      {customRight && customRight()}
    </TouchableOpacity>
  )
}
export { ButtonSearch }
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInput: {
    height: 40,
    width: '100%',
    borderRadius: 12,
  },
  containerButton: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'center',
  },
})
