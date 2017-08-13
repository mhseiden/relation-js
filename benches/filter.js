(function() {
  const expression = relation.expression;
  const operator = relation.operator;

  enqueue('filter delayed', function() {
    const ref = new expression.Reference('delay');
    const lit = new expression.Literal(0);
    const gte = new expression.Gte(ref, lit);
    const filters = [gte];
    return new operator.Filter(mkScan(), filters);
  });
})();
