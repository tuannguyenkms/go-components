import { Select } from '@components/multi-select/Select'
import React, { useCallback, FunctionComponent } from 'react'
import { View, StyleSheet, TextStyle } from 'react-native'
import Colors from 'themes/Colors'

const PRIMARY_COLOR = Colors.primaryColor.main
interface PropsType {
  data?: {
    _id: string
    checked?: boolean
    value: string
  }[]
  onChange: (value: string[]) => void
  value: string
  style?: any
  tagWrapper?: any
  placeholder?: string
  isSelectSingle?: boolean
  textStyle?: TextStyle
}

export const MultiSelect: FunctionComponent<PropsType> = ({
  data,
  onChange,
  value,
  style,
  tagWrapper,
  placeholder,
  isSelectSingle,
  textStyle,
}: PropsType) => {
  const handleOnChange = useCallback(
    (selectValue) => {
      onChange(selectValue)
    },
    [onChange]
  )

  return (
    <View style={styles.container}>
      <Select
        isSelectSingle={isSelectSingle}
        value={value}
        colorTheme={PRIMARY_COLOR}
        data={data}
        onSelect={handleOnChange}
        onRemoveItem={handleOnChange}
        style={style}
        tagWrapper={tagWrapper}
        title={placeholder}
        selectedTitleStyle={{ ...styles.selectedTitleStyle, ...textStyle }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedTitleStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
  },
})
