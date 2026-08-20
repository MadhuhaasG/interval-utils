'use strict'

/**
 * Merges an array of [start, end] integer intervals into the minimal set of
 * non-overlapping intervals, sorted by start. Touching intervals (one ends
 * exactly where the next begins) merge into one.
 */
function mergeIntervals(intervals) {
  if (!Array.isArray(intervals)) throw new TypeError('intervals must be an array')
  const clean = intervals.map((pair) => {
    if (!Array.isArray(pair) || pair.length !== 2) throw new TypeError('each interval must be [start, end]')
    const [start, end] = pair
    if (!Number.isInteger(start) || !Number.isInteger(end)) throw new TypeError('interval bounds must be integers')
    if (end < start) throw new RangeError('interval end must not precede start')
    return [start, end]
  })
  clean.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))
  const merged = []
  for (const [start, end] of clean) {
    const last = merged[merged.length - 1]
    if (last && start <= last[1]) {
      last[1] = Math.max(last[1], end)
    } else {
      merged.push([start, end])
    }
  }
  return merged
}

module.exports = { mergeIntervals }
