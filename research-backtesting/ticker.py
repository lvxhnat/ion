import numpy as np
import pandas as pd
from enum import Enum
from datetime import datetime
import matplotlib.pyplot as plt
from typing import Union, Callable, Literal, Iterable, Type

from abc import abstractmethod


class ExecutionType(Enum):
    BUY = "BUY"
    SELL = "SELL"


class Broker:
    def __init__(
        self,
        instrument: Literal["stock", "forex"],
        commission: Union[float, str, Callable[[float], float]] = 0.0,
    ):

        self.order_book = []

        self.commission_type: Literal["pct", "abs", "fns"] = None

        if isinstance(commission, float):
            self.commission_type = "abs"
            self.commission = commission

        if isinstance(commission, str) and commission[-1] == "%":
            self.commission_type = "pct"
            commission = float(commission[:-1])
            if commission >= 100:
                raise ValueError(f"Commission cannot be more than 100%.")
            self.commission = commission

        if isinstance(commission, Callable):
            self.commission_type = "fns"
            self.commission = commission

        if instrument not in ["stock", "forex"]:
            raise ValueError(f"Instrument needs to be 'stock' or 'forex'.")

        self.instrument = instrument

    def create_order(
        self,
        size: int,
        price: float,
        time: datetime,
    ) -> None:
        return self.order_book.append(
            {
                "execution_size": size,
                "execution_price": price,
                "comission": self._calculate_comission(price * size),
                "execution_time": time,
            }
        )

    def _calculate_comission(
        self,
        trade_value: float,
    ):
        if self.commission_type == "fns":
            return self.commission(trade_value)
        elif self.commission_type == "abs":
            return self.commission
        else:
            return (trade_value / 100) * self.commission

    def get_order_book(self):
        return self.order_book


class TickerStrategy:
    def __init__(
        self,
        dataX: Iterable[datetime],
        dataY: Iterable[float],
        broker: Type[Broker],
    ) -> None:
        self.broker = broker
        self.dataX = dataX
        self.dataY = dataY

    @abstractmethod
    def next(self) -> None:
        """
        Main strategy runtime method, called as each new
        `backtesting.backtesting.Strategy.data`
        instance (row; full candlestick bar) becomes available.
        This is the main method where strategy decisions
        upon data precomputed in `backtesting.backtesting.Strategy.init`
        take place.

        If you extend composable strategies from `backtesting.lib`,
        make sure to call:

            super().next()
        """

    def buy(
        self,
        size: Union[int, float],
        price: float,
        time: datetime,
    ) -> None:
        assert size > 0
        return self.broker.create_order(
            size,
            price,
            time,
        )

    def sell(
        self,
        size: Union[int, float],
        price: float,
        time: datetime,
    ) -> None:
        assert size > 0
        return self.broker.create_order(
            -size,
            price,
            time,
        )

    def get_broker(self) -> Type[Broker]:
        return self.broker

    def base_plot(self, ax):

        executionX, executionY, executionC, executionS = [], [], [], []

        for order in self.get_broker().get_order_book():
            executionX.append(order["execution_time"])
            executionY.append(order["execution_price"])
            executionS.append(100)
            if order["execution_size"] < 0:
                executionC.append("red")
            else:
                executionC.append("green")

        ax.scatter(executionX, executionY, c=executionC, s=executionS)
        ax.plot(self.dataX, self.dataY)
        
        return ax
