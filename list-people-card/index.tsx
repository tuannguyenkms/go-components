import { height, keyExtractor, width } from '@utils'
import React, { FunctionComponent, useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { IDirectory } from 'screens/directory/detail-directory/functions'
import Colors from 'themes/Colors'
import { ItemDirectory } from '../item-directory'
import { NoResult } from '../no-result'

interface AppProps {
  handleLoadingData?: any
  isLoading?: boolean
  data: any[]
  onScoll?: any
  renderHeader?: any
  birthdayEmployees?: IDirectory[]
  anniversaryEmployees?: IDirectory[]
}

const ListPeopleCard: FunctionComponent<AppProps> = (props: AppProps) => {
  const { data = [], isLoading, birthdayEmployees, anniversaryEmployees } = props

  const renderItemCall = useCallback(
    ({ item }: any) => {
      const findBirthday = birthdayEmployees.findIndex((e) => e._id === item._id)
      const isBirthday = findBirthday !== -1
      const findAnniversary = anniversaryEmployees.findIndex((e) => e._id === item._id)
      const isAnniversary = findAnniversary !== -1
      return <ItemDirectory item={item} isBirthday={isBirthday} isAnniversary={isAnniversary} />
    },
    [data, birthdayEmployees]
  )

  return (
    <View style={styles.container}>
      <FlatList
        {...(!isLoading && { ListEmptyComponent: <NoResult /> })}
        data={data}
        scrollEnabled={false}
        initialNumToRender={50}
        windowSize={5}
        maxToRenderPerBatch={50}
        renderItem={renderItemCall}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
export { ListPeopleCard }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainWhite,
  },
  row: {
    flexDirection: 'row',
  },
  containerHolder: {
    zIndex: 2,
    width: width(100),
    height: height(100),
    position: 'absolute',
    paddingHorizontal: 15,
    backgroundColor: Colors.mainWhite,
  },
})
