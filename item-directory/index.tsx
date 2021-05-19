/* eslint-disable react/destructuring-assignment */
import { ImgAnniversary, ImgBirthday } from '@assets'
import { AvatarNew } from '@components/avatar-new'
import { LocalSetting } from '@configuration'
import { ROUTE_KEY } from '@constants'
import { appModel } from '@models'
import { IDirectory } from '@types'
import { isEmpty, isNil } from 'lodash'
import get from 'lodash/get'
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { PresentStatus } from 'screens/profile/profile-info/constants'
import Colors from 'themes/Colors'
import { designColors } from 'themes/design-color'
import { ButtonCall } from '../custom-button/button-call'
import { styles } from './styles'


interface ItemProps {
  onClose?: any
  item: IDirectory
  isBirthday?: boolean
  isAnniversary?: boolean
  onPress?: (aurg1) => void
  finalItem?: boolean
}

const SIZE_AVATAR = 45
const ICON_SIZE = 40

const ItemDirectory: React.SFC<ItemProps> = (props: ItemProps) => {
  const { item, onPress, isBirthday, isAnniversary, onClose } = props
  const isUserActived = LocalSetting.isActiveUser
  const employeeId = get(item, '_id') || ' '
  const employeeName = get(item, 'employeeName') || '-'
  const jobTitle = get(item, 'jobTitle') || '-'
  const profileImageUrl = get(item, 'profileImageUrl') || ''
  const phoneNumber = get(item, 'phoneNumber') || ''
  const isOff = get(item, 'isOff') || false
  const presentStatus = get(item, 'presentStatus')

  const color = isOff ? '#afbeca' : presentStatus === PresentStatus.WorkFromHome ? '#f29132' : Colors.primaryColor.main
  const onPressCall = React.useCallback(() => {
    isUserActived && onPress ? onPress(item) : appModel.navigation.pushToScreen(ROUTE_KEY.DETAIL_DIRECTORY, { item })
    onClose && onClose()
  }, [employeeId])

  const showStatusIcon = (!isNil(presentStatus) && !isEmpty(presentStatus)) || isOff === true
  const noBottomLineStyle = props.finalItem && styles.noBottomLine

  return (
    <View style={[styles.containerItem, noBottomLineStyle]}>
      <TouchableOpacity onPress={onPressCall}>
        <AvatarNew size={SIZE_AVATAR} image={profileImageUrl} style={styles.containerAvatar} />
        {showStatusIcon && <View style={[styles.offIcon, { backgroundColor: color }]} />}
      </TouchableOpacity>
      <View style={styles.containerRight}>
        {isUserActived ? (
          <TouchableOpacity onPress={onPressCall} style={styles.containerContent}>
            <View style={styles.row}>
              <Text style={styles.textName}>{employeeName}</Text>
            </View>
            <Text style={[styles.textDepartment]}>{jobTitle}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressCall} style={styles.containerContent2}>
            <Text style={styles.textName}>{employeeName}</Text>
          </TouchableOpacity>
        )}
        {isBirthday && (
          <View style={styles.icon}>
            <ImgBirthday backgroundColor="#fdf3f2" width={ICON_SIZE - 7} height={ICON_SIZE - 7} />
          </View>
        )}
        {isAnniversary && (
          <View style={styles.icon}>
            <ImgAnniversary backgroundColor="#fdf3f2" width={ICON_SIZE - 7} height={ICON_SIZE - 7} />
          </View>
        )}
        {phoneNumber && phoneNumber.length > 0 && isUserActived ? (
          <ButtonCall
            iconSize={10}
            style={styles.button}
            numberPhone={phoneNumber}
            iconColor={designColors.dark100}
          />
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>
    </View>
  )
}
export { ItemDirectory }
