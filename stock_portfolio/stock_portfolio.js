let portfolio = [];

function Stock(numShare, ticketSym) {
  return {numShare: numShare, ticketSym: ticketSym};
}

function findStock(targetStock) {
  return portfolio.findIndex( (element) => element.ticketSym === targetStock.ticketSym);
}

function purchaseStock(newStock) {
  const i = findStock(newStock);
  if (i > -1) portfolio[i].numShare += newStock.numShare;
  else portfolio.push(newStock);
}

function saleStock(targetStock) {
  const i = findStock(targetStock);
  if (i < 0) throw new Error("ticket symbol does not exist");

  if ((portfolio[i].numShare - targetStock.numShare) > 0) {
    portfolio[i].numShare -= targetStock.numShare;
  } else if ((portfolio[i].numShare - targetStock.numShare) === 0) {
    portfolio.splice(i, 1);
  } else {
    throw new ShareSaleException("selling more share(s) than own");
  }
}

function totalShareOfSym(sym) {
  const i = findStock(Stock(null, sym));
  if (i < 0) throw new Error("ticket symbol does not exist");
  else return portfolio[i].numShare;
}

function cleanPortfolio() {
  portfolio = portfolio.filter( (element) => element.numShare > 0);
}

function getPortfolio() {
  return portfolio;
}

function numUniqueTicketSym() {
  return portfolio.length;
}

function ShareSaleException(message) {
  return new Error(message);
}

exports.getPortfolio = getPortfolio;
exports.Stock = Stock;
exports.numUniqueTicketSym = numUniqueTicketSym;
exports.purchaseStock = purchaseStock;
exports.saleStock = saleStock;
exports.totalShareOfSym = totalShareOfSym;
exports.cleanPortfolio = cleanPortfolio;
