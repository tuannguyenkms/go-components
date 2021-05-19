import React, { useState, useMemo, useRef, useCallback } from 'react'
import { Animated, View, Platform, TouchableWithoutFeedback } from 'react-native'
import SearchComponent from './SearchComponent'
import { ISIOS, MYHEIGHT } from '@utils'
import { FONTS, HIT_SLOP } from '@constants'
import { designColors } from 'themes/design-color'
import { useSafeArea } from 'react-native-safe-area-context'
import { Item } from './Item'
import { invoke, isEmpty, noop } from 'lodash'
import { IconBack } from '@assets'

const Search = (props) => {
  const {
    title,
    data,
    isSingle,
    onItemSelected = noop,
    searchPlaceHolderText,
    updateKeywork = noop,
    cancelSelection = noop,
    autoFocus,
    renderEmptyResult,
  } = props
  const [searchedTerm, updateSearchTerm] = useState('')
  const scrollRef = useRef(null)

  const setSearchedTerm = useCallback(
    (value) => {
      updateSearchTerm(value)
      invoke(scrollRef, 'current.scrollTo', [{ x: 0, y: 0, animated: true }])
    },
    [updateSearchTerm, scrollRef]
  )

  const items = useMemo(() => {
    if (searchedTerm.length === 0) {
      return data
    }
    const result = data.filter((item) => {
      return item.value.includes(searchedTerm)
    })
    return result
  }, [searchedTerm])

  const textStyleAnimation = {
    ...{
      fontSize: 16,
      letterSpacing: -0.3,
      fontFamily: FONTS.MEDIUM,
      color: designColors.darkBlueGrey,
    },
    ...{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', flex: 1 },
  }

  const isNoSearchResult = isEmpty(items) && !isEmpty(searchedTerm)
  const insets = useSafeArea()
  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: designColors.white,
        ...{ paddingTop: ISIOS ? insets.top  : 0 },
      }}
    >
      <View
        style={{
          height: 52,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <TouchableWithoutFeedback hitSlop={HIT_SLOP} onPress={cancelSelection}>
          <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <IconBack size={30} color={designColors.darkSlateBlue} />
          </View>
        </TouchableWithoutFeedback>
        <Animated.Text style={textStyleAnimation} numberOfLines={1}>
          {title}
        </Animated.Text>
        <View style={{ width: 40, height: 40 }}></View>
      </View>
      <View style={{ position: 'relative' }}>
        {ISIOS && (
          <SearchComponent
            autoFocus={autoFocus}
            searchedTerm={searchedTerm}
            setSearchedTerm={setSearchedTerm}
            searchPlaceHolderText={searchPlaceHolderText}
            updateKeywork={updateKeywork}
            items={items}
            isSingle={isSingle}
            onItemSelected={onItemSelected}
            title={title}
            renderEmptyResult={renderEmptyResult}
            isNoSearchResult={isNoSearchResult}
          />
        )}
        <Animated.ScrollView
          ref={scrollRef}
          scrollEnabled={!isNoSearchResult}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          stickyHeaderIndices={!ISIOS ? [0] : []}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: designColors.white,
            paddingTop: ISIOS ? 70 : 0,
          }}
          contentContainerStyle={{
            display: 'flex',
            backgroundColor: 'white',
          }}
          showsHorizontalScrollIndicator={false}
        >
          {Platform.OS === 'android' && (
            <SearchComponent
              autoFocus={autoFocus}
              searchedTerm={searchedTerm}
              setSearchedTerm={setSearchedTerm}
              searchPlaceHolderText={searchPlaceHolderText}
              updateKeywork={updateKeywork}
              items={items}
              isSingle={isSingle}
              onItemSelected={onItemSelected}
              title={title}
              renderEmptyResult={renderEmptyResult}
              isNoSearchResult={isNoSearchResult}
            />
          )}
          {isNoSearchResult ? (
            <View style={{ flex: 1 }}>{renderEmptyResult()}</View>
          ) : (
            items.map((item, index) => (
              <Item
                key={index}
                name={item.value}
                item={item}
                isSingle={isSingle}
                idx={index}
                onItemSelected={onItemSelected}
              />
            ))
          )}
          <View style={{ height: MYHEIGHT / 4 }}></View>
        </Animated.ScrollView>
      </View>
    </Animated.View>
  )
}

export default Search
