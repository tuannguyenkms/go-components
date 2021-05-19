/* eslint-disable no-cond-assign */
import get from 'lodash/get'

declare let match: any

export const displayTextWithMentions = (inputText, formatMentionNode) => {
  if (inputText === '') {
    return null
  }
  const retLines = inputText.split('\n')
  const formattedText = []
  retLines.forEach((retLine, rowIndex) => {
    const mentions = EU.findMentions(retLine)
    if (mentions.length) {
      let lastIndex = 0
      mentions.forEach((men, index) => {
        const initialStr = retLine.substring(lastIndex, men.start)
        lastIndex = men.end + 1
        formattedText.push(initialStr)
        const formattedMention = formatMentionNode(`@${men.username}`, `${index}-${men.id}-${rowIndex}`)
        formattedText.push(formattedMention)
        if (mentions.length - 1 === index) {
          const lastStr = retLine.substr(lastIndex)
          formattedText.push(lastStr)
        }
      })
    } else {
      formattedText.push(retLine)
    }
    formattedText.push('\n')
  })
  return formattedText
}

export const displayTextForBEWithoutComponent = (inputText, data = []) => {
  if (inputText === '') {
    return null
  }
  const retLines = inputText.split('\n')
  let formattedText = ''
  const mentionsArray = []
  retLines.forEach((retLine) => {
    const mentions = EU.findMentionsBE(retLine)
    if (mentions.length) {
      let lastIndex = 0
      mentions.forEach((men, index) => {
        const initialStr = retLine.substring(lastIndex, men.start)
        lastIndex = men.end + 1
        formattedText += initialStr
        const employeeInfo = data.filter((item) => item._id === men.username)[0]
        const userName = get(employeeInfo, 'employeeName')
        const formattedMention = `@${userName}`
        formattedText += formattedMention
        if (mentions.length - 1 === index) {
          const lastStr = retLine.substr(lastIndex)
          formattedText += lastStr
        }
        const startIndexEmp = formattedText.indexOf(formattedMention)
        const lastIndexEmp = formattedText.indexOf(formattedMention) + userName.length
        mentionsArray.push({
          start: startIndexEmp,
          end: lastIndexEmp,
          employeeInfo,
          formattedMention,
        })
      })
    } else {
      formattedText += retLine
    }
  })
  return { formattedText, mentions: mentionsArray }
}

export const displayTextForBE = (inputText, formatMentionNode, data = []) => {
  if (inputText === '') {
    return null
  }
  const retLines = inputText.split('\n')
  const formattedText = []
  retLines.forEach((retLine, rowIndex) => {
    const mentions = EU.findMentionsBE(retLine)
    if (mentions.length) {
      let lastIndex = 0
      mentions.forEach((men, index) => {
        const initialStr = retLine.substring(lastIndex, men.start)
        lastIndex = men.end + 1
        formattedText.push(initialStr)
        const dataFiltered = data.filter((item) => item._id === men.username) || []
        const userName = dataFiltered.length === 0 ? '[Resigned user]' : dataFiltered[0].employeeName
        const formattedMention = formatMentionNode(`${userName}`, `${index}-${men.id}-${rowIndex}`)
        formattedText.push(formattedMention)
        if (mentions.length - 1 === index) {
          const lastStr = retLine.substr(lastIndex)
          formattedText.push(lastStr)
        }
      })
    } else {
      formattedText.push(retLine)
    }
    formattedText.push('\n')
  })
  return formattedText
}

export const EU = {
  specialTagsEnum: {
    mention: 'mention',
    strong: 'strong',
    italic: 'italic',
    underline: 'underline',
  },

  isKeysAreSame: (src, dest) => src.toString() === dest.toString(),

  getLastItemInMap: (map) => Array.from(map)[map.size - 1],

  getLastKeyInMap: (map) => Array.from(map.keys())[map.size - 1],

  getLastValueInMap: (map) => Array.from(map.values())[map.size - 1],

  updateRemainingMentionsIndexes: (map, { start, end }, diff, shouldAdd) => {
    const newMap = new Map(map)
    const keys = EU.getSelectedMentionKeys(newMap, { start, end })
    keys.forEach((key) => {
      const newKey = shouldAdd ? [key[0] + diff, key[1] + diff] : [key[0] - diff, key[1] - diff]
      const value = newMap.get(key)
      newMap.delete(key)
      newMap.set(newKey, value)
    })
    return newMap
  },

  getSelectedMentionKeys: (map, { start, end }) => {
    const mantionKeys = [...map.keys()]
    const keys = mantionKeys.filter(([a, b]) => EU.between(a, start, end) || EU.between(b, start, end))
    return keys
  },

  findMentionKeyInMap: (map, cursorIndex) => {
    const keys = [...map.keys()]
    const key = keys.filter(([a, b]) => EU.between(cursorIndex, a, b))[0]
    return key
  },

  addMenInSelection: (selection, prevSelc, mentions) => {
    const sel = { ...selection }
    mentions.forEach((value, [menStart, menEnd]) => {
      if (EU.diff(prevSelc.start, prevSelc.end) < EU.diff(sel.start, sel.end)) {
        if (EU.between(sel.start, menStart, menEnd)) {
          sel.start = menStart
        }
        if (EU.between(sel.end - 1, menStart, menEnd)) {
          sel.end = menEnd + 1
        }
      } else {
        if (EU.between(sel.start, menStart, menEnd)) {
          sel.start = menEnd + 1
        }
        if (EU.between(sel.end, menStart, menEnd)) {
          sel.end = menStart
        }
      }
    })
    return sel
  },

  moveCursorToMentionBoundry: (selection, prevSelc, mentions, isTrackingStarted) => {
    const sel = { ...selection }
    if (isTrackingStarted) {
      return sel
    }
    mentions.forEach((value, [menStart, menEnd]) => {
      if (prevSelc.start > sel.start) {
        if (EU.between(sel.start, menStart, menEnd)) {
          sel.start = menStart
          sel.end = menStart
        }
      } else if (EU.between(sel.start - 1, menStart, menEnd)) {
        sel.start = menEnd + 1
        sel.end = menEnd + 1
      }
    })
    return sel
  },

  between: (x, min, max) => x >= min && x <= max,

  sum: (x, y) => x + y,

  diff: (x, y) => Math.abs(x - y),

  isEmpty: (str) => str === '',

  getMentionsWithInputText: (inputText) => {
    const map = new Map()
    let newValue = ''
    if (inputText === '') {
      return null
    }
    const retLines = inputText.split('\n')

    retLines.forEach((retLine, rowIndex) => {
      const mentions = EU.findMentions(retLine)
      if (mentions.length) {
        let lastIndex = 0
        let endIndexDiff = 0
        mentions.forEach((men, index) => {
          newValue = newValue.concat(retLine.substring(lastIndex, men.start))
          const username = `@${men.username}`
          newValue = newValue.concat(username)
          const menEndIndex = men.start + (username.length - 1)
          map.set([men.start - endIndexDiff, menEndIndex - endIndexDiff], {
            id: men.id,
            username: men.username,
          })
          endIndexDiff += Math.abs(men.end - menEndIndex)
          lastIndex = men.end + 1
          if (mentions.length - 1 === index) {
            const lastStr = retLine.substr(lastIndex)
            newValue = newValue.concat(lastStr)
          }
        })
      } else {
        newValue = newValue.concat(retLine)
      }
      if (rowIndex !== retLines.length - 1) {
        newValue = newValue.concat('\n')
      }
    })
    return {
      map,
      newValue,
    }
  },

  findMentions: (val) => {
    const reg = /@\[([^\]]+?)\]\(id:([^\]]+?)\)/gim
    const indexes = []
    // tslint:disable-next-line: no-conditional-assignment
    while ((match = reg.exec(val))) {
      indexes.push({
        start: match.index,
        end: reg.lastIndex - 1,
        username: match[1],
        id: match[2],
        type: EU.specialTagsEnum.mention,
      })
    }
    return indexes
  },

  findMentionsBE: (val) => {
    const reg = /\{\{([^\]]+?)\}\}/gim
    const indexes = []
    // tslint:disable-next-line: no-conditional-assignment
    while ((match = reg.exec(val))) {
      indexes.push({
        start: match.index,
        end: reg.lastIndex - 1,
        username: match[1],
        id: match[2],
        type: EU.specialTagsEnum.mention,
      })
    }
    return indexes
  },

  whenTrue: (next, current, key) => {
    return next[key] && next[key] !== current[key]
  },
  displayTextWithMentions,
  displayTextForBE,
  displayTextForBEWithoutComponent,
}

export default EU
