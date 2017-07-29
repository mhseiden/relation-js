// @flow /* eslint-env jest */
import { mkTestTable, mkNumberColumn } from '../utils.test.js'
import { Scan, Project } from './index.js'
import { Add, Reference } from '../expression'

function mkScan (): Scan {
  return new Scan(mkTestTable())
}

test('project none', () => {
  const project = new Project(mkScan(), [])
  expect(project.execute()).toEqual([])
})

test('project one', () => {
  const ref = new Reference('number')
  const project = new Project(mkScan(), [['number', ref]])
  expect(project.execute()).toEqual([mkNumberColumn()])
})

test('project same twice', () => {
  const ref = new Reference('number')
  const project = new Project(mkScan(), [['n1', ref], ['n2', ref]])

  expect(project.execute()).toEqual([
    ['n1', mkNumberColumn()[1]],
    ['n2', mkNumberColumn()[1]]
  ])
})

test('simple math', () => {
  const ref = new Reference('number')
  const add = new Add(ref, ref)
  const project = new Project(mkScan(), [['add', add]])

  expect(project.execute()).toEqual([[
    'add',
    {
      type: 'number',
      data: [0, 2, 4, null, 8, 10]
    }
  ]])
})
