// @flow /* eslint-env jest */
import { mkTestTable } from '../utils.test.js'
import { Scan, Aggregate } from './index.js'
import { Reference, Count, CountValid, Min, Max, Sum } from '../expression'
import { NumberColumn } from '../execute'

function mkScan (): Scan {
  return new Scan(mkTestTable())
}

// globals
test('count(*) global', () => {
  const ref = new Reference('string')
  const count = new Count(ref)

  const op = new Aggregate(mkScan(), [], [['count', count]])
  expect(op.execute()).toEqual([
    [
      'count',
      new NumberColumn([6])
    ]
  ])
})

test('count(number) global', () => {
  const ref = new Reference('number')
  const count = new CountValid(ref)

  const op = new Aggregate(mkScan(), [], [['count', count]])
  const result = op.execute()

  expect(result).toEqual([
    [
      'count',
      new NumberColumn([5])
    ]
  ])
})

test('min(number) global', () => {
  const ref = new Reference('number')
  const min = new Min(ref)

  const op = new Aggregate(mkScan(), [], [['min', min]])
  const result = op.execute()

  expect(result).toEqual([
    [
      'min',
      new NumberColumn([0])
    ]
  ])
})

test('max(number) group by number', () => {
  const ref = new Reference('number')
  const max = new Max(ref)

  const op = new Aggregate(mkScan(), [], [['max', max]])
  const result = op.execute()

  expect(result).toEqual([
    [
      'max',
      new NumberColumn([5])
    ]
  ])
})

test('sum(number) global', () => {
  const ref = new Reference('number')
  const sum = new Sum(ref)

  const op = new Aggregate(mkScan(), [], [['sum', sum]])
  const result = op.execute()

  expect(result).toEqual([
    [
      'sum',
      new NumberColumn([12])
    ]
  ])
})

// group by w/ number

test('count(*) group by number', () => {
  const ref = new Reference('number')
  const count = new Count(ref)

  const op = new Aggregate(mkScan(), [ref], [['count', count]])
  expect(op.execute()).toEqual([
    [
      'count',
      new NumberColumn([1, 1, 1, 1, 1, 1])
    ]
  ])
})

test('count(number) group by number', () => {
  const ref = new Reference('number')
  const count = new CountValid(ref)

  const op = new Aggregate(mkScan(), [ref], [['count', count]])
  const result = op.execute()
  result[0][1].data.sort()

  expect(result).toEqual([
    [
      'count',
      new NumberColumn([0, 1, 1, 1, 1, 1])
    ]
  ])
})

test('min(number) group by number', () => {
  const ref = new Reference('number')
  const min = new Min(ref)

  const op = new Aggregate(mkScan(), [ref], [['min', min]])
  const result = op.execute()
  result[0][1].data.sort()

  expect(result).toEqual([
    [
      'min',
      new NumberColumn([0, 1, 2, 4, 5, null])
    ]
  ])
})

test('max(number) group by number', () => {
  const ref = new Reference('number')
  const max = new Max(ref)

  const op = new Aggregate(mkScan(), [ref], [['max', max]])
  const result = op.execute()
  result[0][1].data.sort()

  expect(result).toEqual([
    [
      'max',
      new NumberColumn([0, 1, 2, 4, 5, null])
    ]
  ])
})

test('sum(number) group by number', () => {
  const ref = new Reference('number')
  const sum = new Sum(ref)

  const op = new Aggregate(mkScan(), [ref], [['sum', sum]])
  const result = op.execute()
  result[0][1].data.sort()

  expect(result).toEqual([
    [
      'sum',
      new NumberColumn([0, 1, 2, 4, 5, null])
    ]
  ])
})
