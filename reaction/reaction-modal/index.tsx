import React, { useCallback, useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text, Image, TouchableNativeFeedback } from 'react-native'
import Colors from 'themes/Colors'
import { getBottomSpace, height } from '@utils'
import { numberMarginOrPadding } from 'themes/Constants'
import { listReactionType } from 'src/constants/reaction'
import Modal from 'react-native-modal'
import { icClose } from '@assets'
import { TabBar, TabView } from 'react-native-tab-view'
import { ReactionTypeArray } from '@constants'
import { Scene } from './scene'

interface IRoute {
  key: string
  title: string
  icon: any
}
const renderLabel = ({ route }: { route: IRoute }) => {
  if (route.key === 'All') return <Text>{'All'}</Text>
  return <Image source={route.icon} style={[styles.imgHeader]} />
}
const CustomTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      bounces
      swipeEnabled
      renderLabel={renderLabel}
      style={[styles.tabBarStyle]}
      indicatorStyle={styles.indicator}
    />
  )
}

const renderTabBar = (props) => {
  return <CustomTabBar {...props} />
}

export const ReactionModal = (props) => {
  const { show = false, setShow, reactionTypeArray, choose } = props
  const closeModal = useCallback(() => {
    setShow(false)
  }, [])

  const objectTemp: any = {
    key: 'All',
    title: 'All',
  }
  const array: any = [objectTemp]
  const [routes, setRoutes] = React.useState(array)
  const [tabIndex, onIndexChange] = useState(0)

  const handleChangeIndex = useCallback((index) => {
    onIndexChange(index)
  }, [])

  const renderScenes = useCallback(
    (x) => {
      const data = x.route.key === 'All' ? reactionTypeArray.total : reactionTypeArray[ReactionTypeArray[x.route.key]]
      return <Scene data={data} />
    },
    [reactionTypeArray]
  )

  useEffect(() => {
    const handleRoutes = () => {
      listReactionType.map((it) => {
        const type = reactionTypeArray[ReactionTypeArray[it.value]] || []
        const countType = type.length
        if (countType > 0) {
          array.push(it)
        }
      })
      setRoutes(array)
    }
    handleRoutes()
  }, [reactionTypeArray])
  const refTab = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      const idx = choose && choose.key ? routes.findIndex((i) => i.key === choose.key) : 0
      handleChangeIndex(idx)
    }, 500)
  }, [choose])
  return (
    <Modal
      isVisible={show}
      animationIn="zoomIn"
      animationOut="zoomOut"
      useNativeDriver={true}
      animationInTiming={300}
      animationOutTiming={300}
      onBackdropPress={closeModal}
      hideModalContentWhileAnimating
    >
      <View style={styles.container}>
        <View
          style={[
            styles.row,
            {
              width: '100%',
              justifyContent: 'flex-end',
            },
          ]}
        >
          <TouchableNativeFeedback onPress={closeModal} onLongPress={closeModal}>
            <View>{icClose(30, '#c3c3c3')}</View>
          </TouchableNativeFeedback>
        </View>
        <TabView
          ref={refTab}
          renderScene={renderScenes}
          renderTabBar={renderTabBar}
          onIndexChange={handleChangeIndex}
          navigationState={{ index: tabIndex, routes }}
        />
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.backgroundColor.mainDark,
  },
  container: {
    flex: 1,
    zIndex: 0,
    borderRadius: 8,
    maxHeight: height(75),
    paddingBottom: getBottomSpace(),
    paddingTop: numberMarginOrPadding,
    backgroundColor: Colors.mainWhite,
    paddingLeft: numberMarginOrPadding,
    paddingRight: numberMarginOrPadding,
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
  },
  indicator: {
    backgroundColor: Colors.primary,
    height: 3,
  },
  row: {
    flexDirection: 'row',
  },
  scene: {
    flex: 1,
  },
  imgHeader: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
})
