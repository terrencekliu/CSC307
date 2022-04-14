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
  const newStock = stockPortfolio.Stock(5, "VTI");
  stockPortfolio.purchaseStock(newStock);

  const target = [newStock];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing purchaseStock, insert another w/same ticketSym -- success', () => {
  const newStock = stockPortfolio.Stock(5, "VTI");
  stockPortfolio.purchaseStock(newStock);

  const target = [stockPortfolio.Stock(10, "VTI")];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing purchaseStock, insert another w/different ticketSym -- success', () => {
  const newStock = stockPortfolio.Stock(5, "VOO");
  stockPortfolio.purchaseStock(newStock);

  const target = [stockPortfolio.Stock(10, "VTI"), stockPortfolio.Stock(5, "VOO")];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing saleStock, sell w/same ticketSym -- success', () => {
  const targetStock = stockPortfolio.Stock(5, "VTI");
  stockPortfolio.saleStock(targetStock);

  const target = [stockPortfolio.Stock(5, "VTI"), stockPortfolio.Stock(5, "VOO")];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing saleStock, sell all one ticketSym -- success', () => {
  const targetStock = stockPortfolio.Stock(5, "VTI");
  stockPortfolio.saleStock(targetStock);

  const target = [stockPortfolio.Stock(5, "VOO")];
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});

test('Testing saleStock -- selling more share(s) than own', () => {
  const targetStock = stockPortfolio.Stock(10, "VOO");
  expect(() => stockPortfolio.saleStock(targetStock)).toThrow(/selling/);
});

test('Testing saleStock -- ticket symbol does not exist', () => {
  const targetStock = stockPortfolio.Stock(10, "GME");
  expect(() => stockPortfolio.saleStock(targetStock)).toThrow(/exist/);
});

test('Testing totalShareOfSym -- success', () => {
  const target = 5;
  const result = stockPortfolio.totalShareOfSym("VOO");
  expect(target).toBe(result);
});

test('Testing totalShareOfSym -- ticket symbol does not exist', () => {
  expect(() => stockPortfolio.totalShareOfSym("GME")).toThrow(/exist/);
});

test('Testing cleanPortfolio -- success', () => {
  const targetStock = stockPortfolio.Stock(0, "GME");
  stockPortfolio.purchaseStock(targetStock);
  // now, portfolio = [(5, "VOO"), (0, "GME")]

  const target = [stockPortfolio.Stock(5, "VOO")];
  stockPortfolio.cleanPortfolio();
  const result = stockPortfolio.getPortfolio();
  expect(target).toEqual(result);
});