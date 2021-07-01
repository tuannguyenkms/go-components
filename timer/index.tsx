import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { StyleSheet, Text, View } from 'react-native'
import { textStyles } from 'themes/design-texts'
import { designColors } from 'themes/design-color'
import { hhmmss } from '@utils'
import { Icon } from '@assets'

export default (props: { count: number; isRun?: boolean }) => {
  const { count = 0, isRun = false } = props
  const [realTimeWatcher, setRealTimeWatcher] = useState(count)

  useEffect(() => setRealTimeWatcher(count), [count])

  useEffect(() => {
    let handled
    if (isRun) {
      handled = setInterval(() => {
        setRealTimeWatcher((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      clearInterval(handled)
    }
  }, [isRun])

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Text style={styles.titleForm}>{moment().format('DD MMM YYYY')}</Text>
      <Icon
        size={16}
        name="clock"
        type="solid"
        color={designColors.dark65}
        containerStyle={{ marginLeft: 12, marginRight: 8 }}
      />
      <Text style={styles.titleForm}>{hhmmss(realTimeWatcher)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleForm: {
    ...textStyles.h5MediumLeftH5Medium2,
    color: designColors.dark65,
  },
})
