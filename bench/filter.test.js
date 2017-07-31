// @flow /* eslint-env jest */
import { mkBenchTable, doBenchmark } from './bench.test.js'
import { Scan, Filter } from '../src/operator/index.js'
import { Reference, Eq, Literal } from '../src/expression'

function mkScan (): Scan {
  return new Scan(mkBenchTable())
}

test('bench filter - c10 = 4', () => {
  const ref = new Reference('c10')
  const pred = new Eq(ref, new Literal(4))
  const filter = new Filter(mkScan(), [pred])

  doBenchmark('bench filter - c10 = 4', () => filter.execute())
})
