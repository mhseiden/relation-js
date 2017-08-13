(function() {
  const WAIT_TIME = 10,
        ROWS = flights[0].data.length,
        queue = [];

  window.enqueue = function(name, fn) {
    const plan = fn();
    queue.push({ name: name, plan: plan });
  };

  window.mkScan = function() {
    if (!window._scan) {
      window._scan = relation.loaders.loadColumns(flights);
    }
    return new relation.operator.Scan(window._scan);
  };

  window.benchmark = function() { prepare(); };

  function mkCell(value) {
    const cell = document.createElement('td');
    cell.innerText = value;
    return cell;
  }

  function prepare() {
    const bench = queue.shift();
    if (!bench) return;

    const name = bench.name,
          plan = bench.plan;

    const row = document.createElement('tr');
    row.appendChild(mkCell(name));
    row.appendChild(mkCell(''));
    row.appendChild(mkCell(''));
    row.appendChild(mkCell(''));
    row.appendChild(mkCell(''));

    const table = document.getElementById('results');
    table.appendChild(row);

    const runner = new Benchmark(name, (function() { plan.execute() }).bind({}));
    setTimeout(execute.bind({ runner: runner, row: row }), WAIT_TIME);
  }

  function execute() {
    const run = this.runner.run(),
          mean = run.stats.mean,
          deviation = run.stats.deviation,
          sample = run.stats.sample;

    this.row.children[1].innerText = ((1000000000 * mean) / ROWS).toFixed(2);
    this.row.children[2].innerText = (1000 * mean).toFixed(2);
    this.row.children[3].innerText = (1000 * deviation).toFixed(2);
    this.row.children[4].innerText = sample.length;

    setTimeout(prepare, WAIT_TIME);
  }
})();
