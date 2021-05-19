import React from 'react'
import { StyleSheet, TextInputProps, TextStyle, TouchableOpacity, TextInput, View } from 'react-native'

import { SearchIcon, icClose } from '@assets'
import { ISIOS } from '@utils'
import { observer } from 'mobx-react'
import Colors from 'themes/Colors'
import { numberMarginOrPadding } from 'themes/Constants'
import { designColors } from 'themes/design-color'
import { FONTS, HIT_SLOP } from '@constants'

interface AppProps {
  isLeft?: boolean
  isRight?: boolean
  leftIcon?: Element
  rightIcon?: Element
  inputStyle?: TextStyle
  colorIconLeft?: string
  colorIconRight?: string
  leftAction?: () => void
  rightAction?: () => void
  containerStyle?: any
  refInput?: any
  onSearch?: any
  handleClear?: any
  editable?: boolean
  customRight?: () => Element
}
type AppPropsTextInput = AppProps & TextInputProps
const TextInputSearch: React.FC<AppPropsTextInput> = observer((props) => {
  const {
    refInput,
    inputStyle,
    leftAction,
    rightAction,
    customRight,
    isLeft = true,
    containerStyle,
    editable = true,
    isRight = false,
    colorIconLeft = '#5F7D95',
    colorIconRight = Colors.textColor.sub,
    leftIcon = <SearchIcon type="light" size={18} color={colorIconLeft} />,
    rightIcon = icClose(20, colorIconRight),
  } = props
  return (
    <View pointerEvents={editable ? 'auto' : 'none'} style={[styles.container, containerStyle]}>
      {isLeft && (
        <TouchableOpacity style={styles.containerLeft} onPress={leftAction}>
          {leftIcon}
        </TouchableOpacity>
      )}
      <TextInput
        {...props}
        ref={refInput}
        returnKeyLabel="Search"
        placeholderTextColor="#7D95A8"
        style={[styles.input, inputStyle]}
      />
      {customRight && customRight()}
      {isRight && (
        <TouchableOpacity hitSlop={HIT_SLOP} style={styles.containerRight} onPress={rightAction}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  )
})
export { TextInputSearch }
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: designColors.paleGrey,
  },
  containerLeft: {
    flex: 0,
    paddingLeft: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  containerRight: {
    marginRight: 10,
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: Colors.textColor.main,
    paddingVertical: ISIOS ? 10 : 0,
    paddingHorizontal: numberMarginOrPadding / 2,
  },
})
