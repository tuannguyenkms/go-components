import { MultipleSelect } from '@components/multi-select/MultipleSelect'
import React, { useCallback, FunctionComponent } from 'react'
import { View, StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface PropsType {
  data?: {
    _id: string
    checked?: boolean
    value: string
    email?: string
  }[]
  onChange: (value: string[]) => void
  value: string
  style?: ViewStyle
  placeholder?: string
  isSelectSingle?: boolean
  textStyle?: TextStyle
}
export const Select: FunctionComponent<PropsType> = ({
  data,
  onChange,
  value,
  style,
  placeholder,
  isSelectSingle,
  textStyle,
}: PropsType): JSX.Element => {
  const handleOnChange = useCallback(
    (selectValue) => {
      onChange(selectValue)
    },
    [onChange]
  )
  return (
    <View style={styles.container}>
      <MultipleSelect
        isSelectSingle={isSelectSingle}
        value={value}
        data={data}
        onSelect={handleOnChange}
        style={style}
        // tagWrapper={tagWrapper}
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
    flex: 1,
  },
})
