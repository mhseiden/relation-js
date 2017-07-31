// @flow /* eslint-env jest */
import { Benchmark } from 'benchmark';
import { type Table, DataColumn, NumberColumn, StringColumn } from '../src/execute'

const BENCH_TABLE: Table = []

export function doBenchmark(name: string, f: () => any) {
  Benchmark.support.browser = false
  mkBenchTable() // warm up the cache

  const bench = new Benchmark(f).run()
  const millis = Math.round((bench.stats.mean * 1000000))

  const msg = "[" + name + "] " + millis + "us"
  console.log(msg + '\n')
}

export function mkBenchTable (): Table {
  if (BENCH_TABLE.length === 0) {
    const c10 = []
    const c100 = []
    const c1000 = []

    for (var i = 0; i < 100000; ++i) {
      c10.push(i / 10000)
      c100.push(i / 1000)
      c1000.push(i / 100)
    }

    BENCH_TABLE.push(["c10", new NumberColumn(c10)])
    BENCH_TABLE.push(["c100", new NumberColumn(c100)])
    BENCH_TABLE.push(["c1000", new NumberColumn(c1000)])
  }
  return BENCH_TABLE
}

test('sanity', () => expect(1).toBe(1))

