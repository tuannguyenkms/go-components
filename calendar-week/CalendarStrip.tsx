/* eslint-disable radix */
import { get } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Swiper from 'react-native-swiper'
import Day from './Day'
import Header from './Header'

const getWeek = (date) => {
  const data = {
    start: moment(date).startOf('isoWeek'),
    end: moment(date).endOf('isoWeek')
  }
  let day = data.start
  let days = []
  while (day <= data.end) {
    days = [...days, day]
    day = day.clone().add(1, 'days')
  }
  return days
}
const getDateOfWeek = (date) => {
  const d = new Date(date)
  const weekday = new Array(7)
  weekday[0] = "S"
  weekday[1] = "M"
  weekday[2] = "T"
  weekday[3] = "W"
  weekday[4] = "T"
  weekday[5] = "F"
  weekday[6] = "S"
  const n = weekday[d.getDay()]
  return n
}
const getShowingHeaderItems = (week, format) => {
  const firstVar = moment(week[0]).format(format)
  const lastVar = moment(week[week.length - 1]).format(format)

  if (firstVar === lastVar) {
    return firstVar
  }
  return `${firstVar  }-${  lastVar}`
}

interface CalendarStripProps {
  startingDate
  height
  showYear
  dayPressed
  calendarSwiped?
  onMount?
  activeDay
  style?
  activeDayBorderColor
  dateNumberStyle
  textHightlightStyle
  dateNameStyle
  headerStyle?
  headerText
  minDate
  maxDate
  showMonth
  list?: any[]
}
export const CalendarStrip = (props:CalendarStripProps )=> {
  const {
    list = [],
    style,
    onMount,
    minDate,
    maxDate,
    activeDay,
    headerText,
    dayPressed,
    headerStyle,
    height = 75,
    dateNameStyle,
    calendarSwiped,
    dateNumberStyle,
    showYear = true,
    showMonth = true,
    textHightlightStyle,
    startingDate= moment(),
    activeDayBorderColor =  'steelblue'
  } = props
  const [weeksState, setWeeks] = useState(null)
  const [activeDayState, setActiveDay]= useState(null)
  const [pagesState, setPages]  = useState( ['-1', '0', '1'])
  const [keyState, setKey] = useState(0)
  const [showingMonthsState, setShowMonths] = useState('')
  const [showingYearsState, setShowingYears]= useState('')
  const refSwipe = useRef(null)

  const getWeeks = (date: any) => {
    const weeks: any = {
      [parseInt(pagesState[0]) - 1]: getWeek(moment(date).subtract(2, 'weeks')),
      [pagesState[0]]: getWeek(moment(date).subtract(1, 'weeks')),
      [pagesState[1]]: getWeek(moment(date)),
      [pagesState[2]]: getWeek(moment(date).add(1, 'weeks')),
      [parseInt(pagesState[2]) + 1]: getWeek(moment(date).add(2, 'weeks'))
    }
    return weeks
  }

  useEffect(()=>{
    if (onMount) {
      onMount()
    }
    const weeks = getWeeks(startingDate)
    setWeeks(weeks)
    setActiveDay(moment())
    setShowMonths(getShowingHeaderItems(weeks[pagesState[1]], 'MMMM'))
    setShowingYears(getShowingHeaderItems(weeks[pagesState[1]], 'YYYY'))
  },[])

  const swiperScrollHandler = useCallback((index) => {
    if (calendarSwiped) {
      calendarSwiped(index)
    }
    if (index === 0) {
      const newPages = pagesState.map((e) => (parseInt(e) - 1).toString())
      const newKey = keyState + 1
      const weeksObjKeys =  Object.keys(weeksState)
      const arrWeeks =  weeksObjKeys.map(i => Number(i))
      const nextKey = Math.min(...arrWeeks) - 1
      const deleteKey = Math.max(...arrWeeks)
      const weeks = {
        ...weeksState,
        [nextKey]: getWeek(moment(weeksState[pagesState[1]][3]).subtract(3, 'weeks'))
      }

      delete weeks[deleteKey]
      setKey(newKey)
      setPages(newPages)
      setWeeks(weeks)
      setShowMonths( getShowingHeaderItems(weeks[newPages[1]], 'MMMM'))
    } else if (index === 2) {
      const newPages = pagesState.map((e) => (parseInt(e) + 1).toString())
      const newKey = keyState + 1
      const weeksObjKeys = Object.keys(weeksState)
      const arrWeeks =  weeksObjKeys.map(i => Number(i))
      const nextKey: any = Math.max(...arrWeeks) + 1
      const deleteKey = Math.min(...arrWeeks)
      const weeks = {
        ...weeksState,
        [nextKey]: getWeek(moment(weeksState[pagesState[1]][3]).add(3, 'weeks'))
      }
      delete weeks[deleteKey]
      setKey(newKey)
      setPages(newPages)
      setWeeks(weeks)
      setShowMonths( getShowingHeaderItems(weeks[newPages[1]], 'MMMM'))
      setShowingYears(getShowingHeaderItems(weeks[newPages[1]], 'YYYY'))
    }
  },[keyState, pagesState, weeksState, showMonth])

  const handleActiveDayChange = useCallback(() => {
    const activeWeekNumber = weeksState ? weeksState[pagesState[1]][3].format('W') : 'M'
    const activeDayWeekNumber = activeDay ? activeDay.format('W') : moment().format('W')
    if (activeWeekNumber === activeDayWeekNumber) {
      setActiveDay(activeDay)
    }
    if (activeDayWeekNumber - activeWeekNumber === 1 || activeDayWeekNumber - activeWeekNumber === -1) {
      swiperScrollHandler(activeDayWeekNumber - activeWeekNumber + 1)
      setActiveDay(activeDay)
    }
    if (Math.abs(activeDayWeekNumber - activeWeekNumber) > 1) {
      const weeks = getWeeks(activeDay)
      setWeeks(weeks)
      setActiveDay(activeDay)
      setShowMonths(getShowingHeaderItems(weeks[pagesState[1]], 'MMMM'))
      setShowingYears(getShowingHeaderItems(weeks[pagesState[1]], 'YYYY'))
    }
  },[activeDay])

  useEffect(()=>{
    handleActiveDayChange()
  },[activeDay])

  const dayPressedHandler = useCallback((day) => {
    setActiveDay(day)
    if (dayPressed) {
      dayPressed(day)
    }
  },[activeDayState])

  return  (
    <View style={[{ height: 130 }, { height }, { ...style }]} >
      <Header
        headerStyle={headerStyle}
        headerText={headerText}
        showingMonths={showingMonthsState}
        showingYears={showingYearsState}
        showYear={showYear}
        showMonth={showMonth}
        onLeft={() => refSwipe.current.scrollBy(-1, true)}
        onRight={() => refSwipe.current.scrollBy(1, true)}
      />
      {
        weeksState !== null
          ? (
            <Swiper
              bounces
              index={1}
              loop={false}
              scrollsToTop
              key={keyState}
              ref={refSwipe}
              showsPagination={false}
              onIndexChanged={swiperScrollHandler}
            >
              {
                pagesState.map((page, pageIndex) => {
                  return (
                    <View key={pageIndex.toString()} style={{ flexDirection: 'row' }}>
                      {
                        weeksState[page].map((day, idx) => {
                          const dayFormated = moment(day).format('DD MMM YYYY')
                          const isActive = moment(dayFormated)
                            .diff(minDate) >= 0 && moment(dayFormated).diff(maxDate) <= 0
                          const findItem = list.find(i=> moment(i.from).format('DD MMM YYYY')  === dayFormated)
                          const status  = get(findItem, 'status')
                          const isCurrentDate =  moment(dayFormated).isSame(new Date(),'day')

                          return (
                            <Day
                              click={() => dayPressedHandler(day)}
                              active={
                                moment(day).format('MM-DD-YYYY') ===  activeDayState.format('MM-DD-YYYY')
                              }
                              key={idx.toString()}
                              isActive={isActive}
                              status={status}
                              isCurrentDate={isCurrentDate}
                              dayNumber={moment(day).format('D')}
                              dayInWeekName={getDateOfWeek(day)}
                              activeDayBorderColor={activeDayBorderColor}
                              dateNameStyle={dateNameStyle}
                              dateNumberStyle={dateNumberStyle}
                              textHightlightStyle={textHightlightStyle}
                            />
                          )
                        })
                      }
                    </View>
                  )
                })
              }
            </Swiper>
          )
          : <View/>
      }
    </View>
  )
}
