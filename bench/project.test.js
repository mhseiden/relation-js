// @flow /* eslint-env jest */
import { mkBenchTable, doBenchmark } from './bench.test.js'
import { Scan, Project } from '../src/operator/index.js'
import { Reference, Add } from '../src/expression'

function mkScan (): Scan {
  return new Scan(mkBenchTable())
}

test('bench project - ref', () => {
  const ref = new Reference('c10')
  const project = new Project(mkScan(), [['ref', ref]])

  doBenchmark('bench project - ref', () => project.execute())
})

test('bench project - add', () => {
  const r1 = new Reference('c10')
  const r2 = new Reference('c100')
  const add = new Add(r1, r2)
  const project = new Project(mkScan(), [['add', add]])

  doBenchmark('bench project - add', () => project.execute())
})
