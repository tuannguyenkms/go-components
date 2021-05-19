import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

const HIT_SLOP = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20,
}

const iconLeft = () => <Icon name="chevron-left" size={15} color="#0e223d" type="regular" />
const iconRight = () => <Icon name="chevron-right" size={15} color="#0e223d" type="regular" />
interface AppProps {
  showMonth
  showYear
  headerStyle
  headerText
  showingMonths
  showingYears
  onLeft
  onRight
}

const SPACE = ' '
export default  (props: AppProps) => {
  const  {showMonth , showYear , headerStyle, onRight,showingMonths, showingYears, headerText, onLeft} = props
  let spaceBetweenMonthAndYear = false
  if (showMonth && showYear) {
    spaceBetweenMonthAndYear = true
  }
  return (
    <View style={[styles.HeaderWrapper, { ...headerStyle }, { justifyContent: 'space-between', alignItems: 'center' }]}>
      <View style={styles.HeaderWrapper}>
        {(showMonth && showingMonths)
          ?  <Text style={[styles.HeaderText, { ...headerText }]}>{showingMonths}</Text>
          : <View/>
        }
        {spaceBetweenMonthAndYear ? <Text>{SPACE}</Text> : <View/>}
        {
          (showYear && showingYears)
            ?  <Text style={[styles.HeaderText, { ...headerText }]}>{showingYears}</Text>
            : <View/>
        }
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity hitSlop={HIT_SLOP} onPress={onLeft} style={{ marginRight: 32 }}>
          {iconLeft()}
        </TouchableOpacity>
        <TouchableOpacity hitSlop={HIT_SLOP} onPress={onRight} style={{ marginRight: 8 }}>
          {iconRight()}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  HeaderWrapper: {
    paddingVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  HeaderText: {
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: -0.3,
    color: '#0e223d'
  }
})
