import React from 'react'
import { EU } from '@components/mention-editor'
import { Text, StyleSheet, TextProps } from 'react-native'
import { appModel } from '@models'

const formatMentionNode = (txt, key) => (
  <Text key={key} style={styles.mention}>
    {txt}
  </Text>
)

interface TextBold {
  content: string
}

type TextBoldProps = TextBold & TextProps

export const TextMention = (props: TextBoldProps) => {
  const { content } = props
  return (
    <Text {...props} style={styles.text}>
      {EU.displayTextForBE(
        content,
        formatMentionNode,
        appModel.directory.directory || []
      )}
    </Text>
  )
}

const styles = StyleSheet.create({
  mention: {
    top: 0,
    flex: 1,
    fontSize: 14,
    lineHeight: 25,
    color: '#111111',
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  text: {
    flex: 1,
  },
})
