import React, { useState } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { ISIOS, MYWIDTH } from '@utils'
import { FONTS } from '@constants'
import { designColors } from 'themes/design-color'
import { SearchInput } from './SearchInput'

const SearchComponent = (props) => {
  const {
    searchPlaceHolderText,
    updateKeywork,
    setSearchedTerm,
    title,
    autoFocus,
  } = props
  const [, setTextInputFocussed] = useState(false)

  const handleBlur = () => {
    setTextInputFocussed(false)
  }

  return (
    <Animated.View style={[styles.container]}>
      <SearchInput
        autoFocus={autoFocus}
        searchPlaceHolderText={searchPlaceHolderText}
        updateKeywork={(value) => {
          setSearchedTerm(value)
          updateKeywork(value)
        }}
        onFocus={() => setTextInputFocussed(true)}
        handleBlur={handleBlur}
        title={title}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    width: MYWIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    position: ISIOS ? 'absolute' : 'relative',
    paddingHorizontal: 16,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  formField: {
    backgroundColor: '#F4F4F4',
    width: MYWIDTH - 40,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    fontSize: 18,
    height: 50,
  },
  searchList: {},
  titleLabel: {
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 22,
    lineHeight: 32,
    letterSpacing: -0.3,
    color: designColors.darkBlueGrey,
    paddingLeft: 24,
    paddingVertical: 0,
  },
  searchItemList: {
    position: 'absolute',
    backgroundColor: designColors.white,
    top: 70,
    left: 0,
    zIndex: 9999,
    width: MYWIDTH,
    height: 800,
  },
})

export default SearchComponent
