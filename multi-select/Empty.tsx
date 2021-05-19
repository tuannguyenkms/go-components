import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'

interface PropsType {
  listEmptyTitle: string
}
const Empty: FunctionComponent <PropsType> = (props: PropsType) => {
  const { listEmptyTitle } = props

  return <Text style={[styles.empty]}>{listEmptyTitle}</Text>
}
export { Empty }

const styles = StyleSheet.create({
  empty: {
    fontSize: 16,
    color: 'gray',
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 16,
  },
})
