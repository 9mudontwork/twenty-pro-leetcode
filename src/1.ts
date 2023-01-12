/**
 * find the cursor error from the sheet
 * input:  [
 *  [1, 1, 0, 1, 0, 0, 1],
 *  [0, 1, 0, 1, 0, 1, 0],
 *  [1, 1, 1, 1, 1, 1, 0],
 *  [1, 1, 1, 1, 1, 0, 0],
 *  [0, 0, 0, 0, 0, 0, 0],
 *  [0, 1, 1, 1, 1, 1, 0],
 *  [1, 0, 1, 1, 1, 1, 0],
 *  [1, 1, 0, 0, 1, 0, 0],
 * ];
 *
 * output:
 * 1: [3, 5, 6]
 * 2, [1, 3, 5, 7]
 * 3, [7]
 * 4, [6, 7]
 * 5, [1, 2, 3, 4, 5, 6, 7]
 * 6, [1, 7]
 * 7, [2, 7]
 * 8, [3, 4, 6, 7]
 **/

import { posix } from 'path'
import { emitKeypressEvents } from 'readline'

emitKeypressEvents(process.stdin)

const sheets = [
  [1, 1, 0, 1, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 0, 1, 1, 1, 1, 0],
  [1, 1, 0, 0, 1, 0, 0],
]

const rowCount = sheets.length - 1
let curRow = 0
let curCol = 0

type ResultT = { row: number; col: number }

let result: ResultT = { row: 0, col: 0 }
function setResult({ row, col }: ResultT) {
  result = { row, col }
}

function findCursorError(): ResultT {
  if (curRow > rowCount) {
    // process.exit()
    curRow = 0
    curCol = 0
  }

  const curColCount = sheets[curRow].length - 1

  const excute = () => {
    const isNoError = sheets[curRow][curCol] === 1
    const isError = !isNoError

    if (curCol < curColCount) {
      if (isError) {
        setResult({ row: curRow, col: curCol })
      }
      curCol += 1
    } else {
      if (isError) {
        setResult({ row: curRow, col: curCol })
      }

      curCol = 0

      if (curRow <= rowCount) {
        curRow += 1
      }
    }

    if (isNoError) {
      excute()
    }
  }

  excute()

  return result
}

/**
 * =========================================================
 */

const stacks: Array<ResultT> = []
const getResult = (): ResultT => {
  const { row, col } = stacks.at(0)
  stacks.shift()

  return { row, col }
}

function findCursorError2(): ResultT {
  if (stacks.length > 0) {
    return getResult()
  }

  for (let i = 0; i <= rowCount; i++) {
    const curColCount = sheets[i].length - 1

    for (let j = 0; j <= curColCount; j++) {
      const isError = sheets[i][j] === 0

      if (isError) {
        stacks.push({ row: i, col: j })
      }
    }
  }

  return getResult()
}

/**
 * =========================================================
 */

let rowIndex = 0
let colIndex = 0

function findCursorError3(): { row: number; col: number } {
  for (let i = rowIndex; i <= rowCount + 1; i++) {
    if (i > rowCount) {
      rowIndex = 0
      colIndex = 0
      findCursorError3()
      continue
    }

    const curColCount = sheets[i].length - 1

    for (let j = colIndex; j <= curColCount + 1; j++) {
      if (j > curColCount) {
        colIndex = 0
        rowIndex = i + 1
        break
      }

      const isError = sheets[i][j] === 0
      colIndex = j
      rowIndex = i

      if (isError) {
        colIndex = j + 1

        return { row: i, col: j }
      }
    }
  }

  return { row: rowIndex, col: colIndex }
}

console.log('press `enter` key to find the cursor error.')

process.stdin.on('keypress', (_str, key) => {
  if (key.name !== 'enter') {
    console.log('please press `enter` key to find the error.')
    return
  }
  const { row, col } = findCursorError3()
  console.log(`error at row:${row + 1}, col: ${col + 1}`)
  // console.log('press `enter` key to find the next cursor error.')
})
