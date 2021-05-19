import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { Icon } from '@assets'
import { designColors } from 'themes/design-color'

const SearchInput = (props) => {
  const { searchPlaceHolderText, updateKeywork, autoFocus, refInput, onFocus, handleBlur } = props
  return (
    <View style={styles.inputContainer}>
      <View style={[styles.inputSearchContainer]}>
        <Icon name="search" size={24} color={designColors.slateBlue} />
        <TextInput
          autoFocus={autoFocus}
          numberOfLines={1}
          clearButtonMode="while-editing"
          ref={refInput}
          returnKeyType="search"
          style={[styles.inputKeyword]}
          placeholder={searchPlaceHolderText}
          onChangeText={(searchTerm) => {
            updateKeywork(searchTerm)
          }}
          onBlur={handleBlur}
          onFocus={onFocus}
        />
      </View>
    </View>
  )
}

export { SearchInput }

const styles = StyleSheet.create({
  inputKeyword: {
    padding: 0,
    paddingLeft: 8,
    flex: 1,
    height: 36,
  },
  inputSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 18,
    height: 36,
    backgroundColor: designColors.paleGrey,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginLeft: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
