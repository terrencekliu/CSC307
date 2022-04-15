let portfolio = [];

function Stock(numShare, ticketSym) {
  return {numShare: numShare, ticketSym: ticketSym};
}

function findStock(ticketSym) {
  return portfolio.findIndex( (element) => element.ticketSym === ticketSym);
}

function purchaseStock(numShare, ticketSym) {
  const i = findStock(ticketSym);
  if (i === -1) portfolio.push(Stock(numShare, ticketSym));
  else portfolio[i].numShare += numShare;
}

function sellStock(numShare, ticketSym) {
  const i = findStock(ticketSym);
  if (i === -1) throw new Error("ticket symbol does not exist");

  if ((portfolio[i].numShare - numShare) > 0) {
    portfolio[i].numShare -= numShare;
  } else if ((portfolio[i].numShare - numShare) === 0) {
    portfolio.splice(i, 1);
  } else {
    throw new ShareSaleException("selling more share(s) than own");
  }
}

function totalShareOfSym(ticketSym) {
  const i = findStock(ticketSym);
  if (i === -1) throw new Error("ticket symbol does not exist");
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
exports.sellStock = sellStock;
exports.totalShareOfSym = totalShareOfSym;
exports.cleanPortfolio = cleanPortfolio;
