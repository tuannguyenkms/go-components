import React, { SFC } from 'react'
import { Text, TextProps } from 'react-native'

const padEnd = (length: number, strings: string) => {
  let text = ''
  for (let i = 0; i < length; i++) {
    text += strings
  }
  return text
}
const renderContent = (
  {
    isSecurity = false,
    startIndex = 0,
    endIndex,
    length,
    securityChar = '*',
  }: any,
  children: any
) => {
  if (isSecurity) {
    const texts: any = []
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) {
        if (length > 0) {
          child = padEnd(length, securityChar)
        } else {
          const textLength = child.length
          if (Math.abs(startIndex) > textLength - 1) {
            startIndex = textLength - 1
          }
          if (Math.abs(endIndex) > textLength) {
            endIndex = textLength
          }
          child =
            child.slice(0, startIndex) +
            padEnd(endIndex - startIndex, securityChar) +
            child.slice(endIndex)
        }
        texts.push(child)
      }
    })
    return texts
  } else {
    return children
  }
}

interface AppProps {
  securityOptions: any
}
type AppPropsTextSecurity = AppProps & TextProps
export const SecurityText: SFC<AppPropsTextSecurity> = (props) => {
  const { securityOptions, children } = props
  return <Text {...props}>{renderContent(securityOptions, children)}</Text>
}
