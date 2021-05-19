import { height, width } from '@utils'
import { StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'

export const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
  },
  item: {},
  containerSuggest: {
    marginTop: 10,
    marginLeft: 15,
    alignItems: 'center',
  },
  containerResult: {
    zIndex: 3,
    elevation: 3,
    width: width(100),
    alignSelf: 'center',
    paddingVertical: 15,
    position: 'absolute',
    paddingHorizontal: 15,
    maxHeight: height(40),
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.mainWhite,
  },
  background: {
    top: 0,
    zIndex: 2,
    elevation: 2,
    opacity: 0.7,
    width: width(100),
    height: height(100),
    position: 'absolute',
    backgroundColor: Colors.mainBlack,
  },
  footer: {
    borderTopWidth: 1,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#f2f2f2',
  },
  textFooter: {
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: -0.26,
    color: designColors.greyblue,
  },
  textRecents: {
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 15,
    color: '#0e223d',
    width: '100%',
    letterSpacing: -0.32,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    color: '#23364e',
    fontWeight: 'bold',
    letterSpacing: -0.28,
  },
})
