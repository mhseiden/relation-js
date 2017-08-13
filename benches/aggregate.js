(function() {
  const expression = relation.expression;
  const operator = relation.operator;

  enqueue('group by origin', function() {
    const ref = new expression.Reference('origin');
    const count = new expression.Count(ref);
    return new operator.Aggregate(mkScan(), [ref], [['count', count]]);
  });
})();
