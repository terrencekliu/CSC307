const stockPortfolio = require('./stock_portfolio.js');

test('Testing getPortfolio, empty -- success', () => {
  const target = [];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing numUniqueTicketSym, no unique ticketSym -- success', () => {
  const target = 0;
  const result = stockPortfolio.numUniqueTicketSym();
  expect(target).toEqual(result);
});

test('Testing cleanPortfolio -- success', () => {
  stockPortfolio.cleanPortfolio();

  const target = [];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing purchaseStock, insert one ticketSym -- success', () => {
  stockPortfolio.purchaseStock(5, "VTI");

  const target = [stockPortfolio.Stock(5, "VTI")];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing purchaseStock, insert another w/same ticketSym -- success', () => {
  stockPortfolio.purchaseStock(5, "VTI");

  const target = [stockPortfolio.Stock(10, "VTI")];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing purchaseStock, insert another w/different ticketSym -- success', () => {
  stockPortfolio.purchaseStock(5, "VOO");

  const target = [stockPortfolio.Stock(10, "VTI"), stockPortfolio.Stock(5, "VOO")];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing sellStock, sell w/same ticketSym -- success', () => {
  stockPortfolio.sellStock(5, "VTI");

  const target = [stockPortfolio.Stock(5, "VTI"), stockPortfolio.Stock(5, "VOO")];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing sellStock, sell all one ticketSym -- success', () => {
  stockPortfolio.sellStock(5, "VTI");

  const target = [stockPortfolio.Stock(5, "VOO")];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing sellStock -- selling more share(s) than own', () => {
  expect(() => stockPortfolio.sellStock(10, "VOO")).toThrow(/selling more share/);
});

test('Testing sellStock -- ticket symbol does not exist', () => {
  expect(() => stockPortfolio.sellStock(10, "GME")).toThrow(/does not exist/);
});

test('Testing totalShareOfSym -- success', () => {
  const target = 5;
  const result = stockPortfolio.totalShareOfSym("VOO");
  expect(target).toBe(result);
});

test('Testing totalShareOfSym -- ticket symbol does not exist', () => {
  expect(() => stockPortfolio.totalShareOfSym("GME")).toThrow(/does not exist/);
});

test('Testing cleanPortfolio -- success', () => {
  stockPortfolio.purchaseStock(0, "GME");
  stockPortfolio.cleanPortfolio();

  const target = [stockPortfolio.Stock(5, "VOO")];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});