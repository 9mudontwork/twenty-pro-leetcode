/** Ex1
 * find duplicate number from array [1,2,3,4,5,6,5,7,7,8,9,10,11,12,13,10]
 * input: [1,2,3,4,5,6,5,7,7,8,9,10,11,12,13,10]
 * output: [5,7,10]
 **/

const numbers = [1, 2, 3, 4, 5, 6, 5, 7, 7, 8, 9, 10, 11, 12, 13, 10]

function findDuplicateArray(numbers: Array<number>) {
  const result = numbers.filter((item, index) => {
    return numbers.indexOf(item) !== index
  })
  return result
}

function findDuplicateArray2(numbers: Array<number>) {
  numbers = numbers.sort((a, b) => a - b)
  const result = numbers.filter((item, index) => {
    return numbers.indexOf(item) !== index
  })
  return result
}

function findDuplicateArray3(numbers: Array<number>) {
  const strNumber = numbers.join(',')
  /**
   * \b ทั้ง char และ non char เป็นกลุ่มคำ
   * \b หาตัวเลข \b
   * ?= ค้นหา .* ทั้งหมด
   * \b หาซ้ำ แล้วจัด group \b
   */
  return strNumber.match(/(\b\d+\b)(?=.*\b\1\b)/gm).map(Number)
}

function findDuplicateArray4(numbers: Array<number>) {
  const counts = {} as Record<string, number>
  const duplicates = [] as Array<number>

  function add(index: number) {
    if (counts[numbers[index]] === undefined) {
      counts[numbers[index]] = 1
    } else {
      if (counts[numbers[index]] === 1) {
        duplicates.push(numbers[index])
      }
      counts[numbers[index]]++
    }
  }

  for (let i = 0; i < numbers.length; i++) {
    add(i)
  }

  return duplicates
}

;(() => {
  const dups = findDuplicateArray4(numbers)
  console.log('dups', dups)
})()
