/**Ex2
 * isMatch
 *
 * Write a function that takes two strings as arguments, `s` and `p`,
 * and returns a boolean denoting whether `s` matches `p`.
 *
 * `p` is a non-empty sequence of any number of the following:
 *   1. a-z - which stands for itself
 *   2. . - which matches any character
 *   3. * - which matches 0 or more occurrences of the previous single character
 *
 * @param {string} s - string
 * @param {string} p - pattern
 * @returns {boolean} - whether `s` matches `p`
 *
 * Expecting
 *
 * isMatch("aba", "ab"),     => Expected: false, Actual: false
 * isMatch("aa", "a*"),      => Expected: true, Actual: true
 * isMatch("ab", ".*"),      => Expected: true, Actual: true
 * isMatch("ab", "."),       => Expected: false, Actual: false
 * isMatch("aab", "c*a*b"),  => Expected: true, Actual: true
 * isMatch("aaa", "a.*"),    => Expected: true, Actual: true
 */

;(() => {
  console.log('isMatch("aba", "ab"),', isMatch('aba', 'ab'))
  console.log('isMatch("aa", "a*")', isMatch('aa', 'a*'))
  console.log('isMatch("ab", ".*")', isMatch('ab', '.*'))
  console.log('isMatch("ab", ".")', isMatch('ab', '.'))
  console.log('isMatch("aab", "c*a*b")', isMatch('aab', 'c*a*b'))
  console.log('isMatch("aaa", "a.*")', isMatch('aaa', 'a.*'))
})()

function isMatch(s: string, p: string): boolean {
  return new RegExp(`^${p}$`).test(s)
}

function isMatch2(s: string, p: string): boolean {
  const noSymbol = !p.includes('*') && !p.includes('.')

  if (noSymbol) {
    const pattern = `(^${p})$`
    return new RegExp(pattern).test(s)
    // return s.match(r) !== null
  }

  if (p.at(0) === '.' && p.length <= 2 && p.slice(0, 2) !== '.*') return false
  return new RegExp(p, 'g').test(s)

  // return s.match(r).length > 0
}

export {}
