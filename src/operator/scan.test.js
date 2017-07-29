// @flow /* eslint-env jest */
import { mkTestTable } from '../utils.test.js'
import { Scan } from './index.js'

test('scan has no child', () => {
  const scan = new Scan(mkTestTable())
  expect(scan._child).toBe(null)
  expect(scan.child).toThrow()
})

test('scan returns a table', () => {
  const scan = new Scan(mkTestTable())
  expect(scan.execute()).toEqual(mkTestTable())
})
