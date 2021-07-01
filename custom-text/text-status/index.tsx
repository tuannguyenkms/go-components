import React from 'react'
import { StyleSheet, Text, TextProps, View } from 'react-native'
import { designColors } from 'themes/design-color'

interface AppProps {
  status: any
  children: any
  numberStatus?: number
}

type TextStatusProps = AppProps & TextProps

export enum STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case STATUS.PENDING:
      return designColors.orange100
    case STATUS.CANCELLED:
      return designColors.bird85
    case STATUS.APPROVED:
      return designColors.prim100
    case STATUS.REJECTED:
      return designColors.red100
    default:
      return designColors.prim100
  }
}

export const TextStatus = (props: TextStatusProps) => {
  const { children, status } = props
  return (
    <View style={styles.row}>
      <View style={styles.dotView}>
        <View style={[styles.dot, { backgroundColor: getStatusColor(status) }]} />
      </View>
      <Text
        {...props}
        style={[
          styles.text,
          {
            color: getStatusColor(status)
          }]}
      >
        {children}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  dotView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    flex: 8,
    marginLeft: 8
  }
})