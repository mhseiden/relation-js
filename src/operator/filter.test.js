// @flow /* eslint-env jest */
import { mkTestTable } from '../utils.test.js'
import { Scan, Filter } from './index.js'
import { Literal, Reference, IsNull, Not, Eq, Ne } from '../expression'

function mkScan (): Scan {
  return new Scan(mkTestTable())
}

test('filter true', () => {
  const pred = new Literal(true)
  const filter = new Filter(mkScan(), [pred])
  expect(filter.execute()).toEqual(mkTestTable())
})

test('filter false', () => {
  const pred = new Literal(false)
  const filter = new Filter(mkScan(), [pred])

  const result = mkTestTable()
  for (const col of result) col[1].data = []
  expect(filter.execute()).toEqual(result)
})

test('filter is null', () => {
  const ref = new Reference('number')
  const pred = new IsNull(ref)
  const filter = new Filter(mkScan(), [pred])

  const result = mkTestTable()
  for (const col of result) {
    col[1].data = col[1].data.filter(e => e == null)
  }

  expect(filter.execute()).toEqual(result)
})

test('filter is not null', () => {
  const ref = new Reference('number')
  const pred = new Not(new IsNull(ref))
  const filter = new Filter(mkScan(), [pred])

  const result = mkTestTable()
  for (const col of result) {
    col[1].data = col[1].data.filter(e => e != null)
  }

  expect(filter.execute()).toEqual(result)
})

test('filter == 2', () => {
  const ref = new Reference('number')
  const pred = new Eq(ref, new Literal(2))
  const filter = new Filter(mkScan(), [pred])

  const result = mkTestTable()
  for (const col of result) {
    col[1].data = col[1].data.filter((e, i) => i === 2)
  }

  expect(filter.execute()).toEqual(result)
})

test('filter != 1 and != 2', () => {
  const ref = new Reference('number')
  const p1 = new Ne(ref, new Literal(1))
  const p2 = new Ne(ref, new Literal(2))
  const filter = new Filter(mkScan(), [p1, p2])

  const result = mkTestTable()
  for (const col of result) {
    col[1].data = col[1].data.filter((e, i) => {
      return (e != null) && (e < 1 || e > 2)
    })
  }

  expect(filter.execute()).toEqual(result)
})
