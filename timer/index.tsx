import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { StyleSheet, Text, View } from 'react-native'
import { textStyles } from 'themes/design-texts'
import { designColors } from 'themes/design-color'
import { hhmmss } from '@utils'
import { Icon } from '@assets'

export default (props: { count: number; isRun?: boolean }) => {
  const { count, isRun = false } = props
  const [realTimeWatcher, setRealTimeWatcher] = useState(count)

  const isRunHadled = useMemo(() => isRun, [isRun])
  useEffect(() => setRealTimeWatcher(count), [count])
  useEffect(() => {
    let handled
    if (isRunHadled) {
      handled = setInterval(() => {
        setRealTimeWatcher((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(handled)
    }
    return () => {
      clearInterval(handled)
    }
  }, [isRunHadled])
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
