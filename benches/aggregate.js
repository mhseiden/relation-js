(function() {
  const expression = relation.expression;
  const operator = relation.operator;

  enqueue('group by [origin]', function() {
    const ref = new expression.Reference('origin');
    const count = new expression.Count(ref);
    return new operator.Aggregate(mkScan(), [ref], [['count', count]]);
  });

  enqueue('group by [origin,destination]', function() {
    const ref1 = new expression.Reference('origin');
    const ref2 = new expression.Reference('destination');
    const count = new expression.Count(ref1);
    return new operator.Aggregate(mkScan(), [ref1,ref2], [['count', count]]);
  });
})();
