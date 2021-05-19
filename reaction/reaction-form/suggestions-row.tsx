import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import Colors from 'themes/Colors'
export const SuggestionsRow = ({ item, onSuggestionTap }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, width: '100%', marginTop: 5 }}
      onPress={() => onSuggestionTap(item)}
    >
      <View style={styles.suggestionsRowContainer}>
        <View style={styles.userIconBox}>
          <Text style={styles.usernameInitials}>
            {!!item.employeeName &&
              item.employeeName.substring(0, 2).toUpperCase()}
          </Text>
        </View>
        <View style={styles.userDetailsBox}>
          <Text style={styles.usernameText}>@{item.employeeName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  suggestionsRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatarBox: {
    width: 35,
    paddingTop: 2,
  },
  userIconBox: {
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  usernameInitials: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  userDetailsBox: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 15,
  },
  displayNameText: {
    fontSize: 13,
    fontWeight: '500',
  },
  usernameText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
  },
})
