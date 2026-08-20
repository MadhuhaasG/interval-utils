'use strict'

const assert = require('node:assert/strict')
const test = require('node:test')
const { mergeIntervals } = require('../src/mergeIntervals.js')

test('disjoint intervals stay separate and sorted', () => {
  assert.deepEqual(mergeIntervals([[5, 6], [1, 2]]), [[1, 2], [5, 6]])
})

test('overlapping intervals merge', () => {
  assert.deepEqual(mergeIntervals([[1, 4], [2, 6]]), [[1, 6]])
})

test('touching intervals merge into one', () => {
  assert.deepEqual(mergeIntervals([[1, 3], [3, 5]]), [[1, 5]])
})

test('contained intervals collapse', () => {
  assert.deepEqual(mergeIntervals([[1, 10], [2, 3], [4, 5]]), [[1, 10]])
})

test('input is not mutated', () => {
  const input = [[3, 4], [1, 2]]
  mergeIntervals(input)
  assert.deepEqual(input, [[3, 4], [1, 2]])
})

test('invalid input is rejected', () => {
  assert.throws(() => mergeIntervals([[2, 1]]), RangeError)
  assert.throws(() => mergeIntervals([['a', 2]]), TypeError)
})
