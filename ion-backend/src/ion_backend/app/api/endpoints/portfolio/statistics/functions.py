from datetime import datetime
from typing import List, Union
from sqlalchemy import not_
from sqlalchemy.orm import Session

from ion_backend.app.services.postgres.base import get_session
from ion_backend.app.services.postgres.tables import PortfolioTickers
from ion_backend.app.api.clients.alphavantage import AlphaVantageClient

from collections import deque
from pydantic import BaseModel


class _TickerStatistic(BaseModel):
    transaction_date: Union[datetime, str]
    realised_pnl: float
    units: int


class Ticker:

    def __init__(
        self,
        ticker: str,
    ):
        self.ticker = ticker
        self.transactions = []
        self.statistics: List[_TickerStatistic] = []
        self.sell, self.buy = deque(), deque()

    def get_current_position(self):
        return self.statistics[-1]

    def add_transaction(self, transaction: dict):

        self.transactions.append(transaction)

        if not self.statistics:
            units_change = 0
            realised_pnl = -transaction["fees"]
        else:
            latest_stat = self.statistics[-1]
            units_change = latest_stat.units
            realised_pnl = latest_stat.realised_pnl - transaction["fees"]

        if transaction["type"] == "Buy":
            units_change += transaction["units"]
            realised_pnl = self.__process_transaction(
                transaction, realised_pnl
            )
        elif transaction["type"] == "Sell":
            units_change -= transaction["units"]
            realised_pnl = self.__process_transaction(
                transaction, realised_pnl
            )
        elif transaction["type"] == "Dividend":
            realised_pnl += transaction["execution_price"]

        statistic = _TickerStatistic(
            transaction_date=transaction["transaction_date"],
            units=units_change,
            realised_pnl=realised_pnl,
        )

        self.statistics.append(statistic)

        return statistic

    def __process_transaction(self, transaction: dict, realised_pnl: float):
        transaction_type = transaction["type"]
        opposite_queue = self.buy if transaction_type == "Sell" else self.sell
        current_queue = self.sell if transaction_type == "Sell" else self.buy
        units_remaining = transaction["units"]

        while units_remaining > 0 and opposite_queue:
            opt = opposite_queue.pop()
            units_to_process = min(units_remaining, opt["units"])
            profit_per_unit = (
                transaction["execution_price"] - opt["execution_price"]
                if transaction_type == "Sell"
                else opt["execution_price"] - transaction["execution_price"]
            )
            realised_pnl += profit_per_unit * units_to_process
            units_remaining -= units_to_process

            if opt["units"] > units_to_process:
                opt["units"] -= units_to_process
                opposite_queue.append(opt)
                break

        if units_remaining > 0:
            transaction["units"] = units_remaining
            current_queue.appendleft(transaction)

        return realised_pnl


def import_data(session: Session, portfolio_id: str) -> List[dict]:
    query_results = (
        session.query()
        .with_entities(
            PortfolioTickers.ticker,
            PortfolioTickers.type,
            PortfolioTickers.transaction_date,
            PortfolioTickers.execution_price,
            PortfolioTickers.fees,
            PortfolioTickers.units,
        )
        .filter(
            PortfolioTickers.portfolio_id == portfolio_id,
            PortfolioTickers.type != "Dividend",
            not_(PortfolioTickers.remarks.contains("Option")),
        )
        .order_by(PortfolioTickers.transaction_date.asc())
        .all()
    )
    return [
        {
            "ticker": ticker,
            "type": type_,
            "transaction_date": transaction_date,
            "execution_price": float(execution_price),
            "fees": float(fees),
            "units": float(units),
        }
        for ticker, type_, transaction_date, execution_price, fees, units in query_results
    ]


def calculate_position_pnls(transactions: List[PortfolioTickers]):

    ticker_store = {}
    # [{ transaction_date: .. , holdings: { [tickers]: [units] } }, ...]
    position_change = []
    if not transactions:
        return

    for transaction in transactions:
        ticker = transaction["ticker"]
        if ticker not in ticker_store:
            ticker_store[ticker] = Ticker(ticker)
        statistic = ticker_store[ticker].add_transaction(transaction)

        if not position_change:
            new_holding = {"holdings": {}}
        else:
            new_holding = position_change[-1].copy()

        new_holding["transaction_date"] = transaction["transaction_date"]

        if ticker in new_holding["holdings"]:
            new_holding["holdings"][ticker] += statistic.units
        else:
            new_holding["holdings"][ticker] = statistic.units

        position_change.append(new_holding)

    current_positions = []
    for ticker, entry in ticker_store.items():
        position = {"ticker": ticker, **entry.get_current_position().dict()}
        current_positions.append(position)

    return {
        "current_position": current_positions,
        "position_delta": position_change,
    }


if __name__ == "__main__":

    client = AlphaVantageClient(["G85N74EQ1PXNMUM0"])

    session_generator = get_session()
    session = next(session_generator)

    portfolio_id: str = "e8ee5640-fc84-4d2d-bdec-b8dc321dae32"

    transactions = import_data(session, portfolio_id=portfolio_id)
    positions = calculate_position_pnls(transactions)
