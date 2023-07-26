import warnings
from typing import Type
from datetime import datetime
from ticker import TickerStrategy


class BackTest:
    """
    Backtest a particular (parameterized) strategy
    on particular data.

    Upon initialization, call method
    `backtesting.backtesting.Backtest.run` to run a backtest
    instance, or `backtesting.backtesting.Backtest.optimize` to
    optimize it.
    """

    def __init__(
        self,
        strategy: Type[TickerStrategy],
        *,
        cash: float = 10_000,
        margin: float = 1.0,
        trade_on_close=False,
        hedging=False,
        exclusive_orders=False,
    ) -> None:

        self.strategy = strategy

        self.results = None

    def run(self):
        if self.results is not None:
            warnings.warn(f"Results has already been run.")
            return
        for _ in self.strategy.dataX:
            self.strategy.next()
        self.results = self.strategy.get_broker().get_order_book()
        return

    def get_statistics(self):
        if self.results is None:
            warnings.warn(f"No results available, try .run() before accessing method.")
            return
        average_trade_frequency: datetime = (
            self.results[-1]["execution_time"] - self.results[0]["execution_time"]
        ) / len(self.results)
        return average_trade_frequency

    def plot(self):
        main_strategy_plot = self.strategy.base_plot()
        main_strategy_plot.show()
