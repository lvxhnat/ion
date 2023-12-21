"""
Broker -> Strategy -> Ticker

Strategy -> BackTest
List[Ticker] -> BackTest
"""

import talib
import numpy as np
from ticker import TickerStrategy


class EMATickerStrategy(TickerStrategy):
    def __init__(
        self,
        dataX,
        dataY,
        broker,
        /,
        emaFast: int = 7,
        emaSlow: int = 14,
    ):
        super().__init__(dataX, dataY, broker)

        if isinstance(dataY, list):
            dataY = np.array(dataY)

        self.EMAFast = talib.EMA(dataY, emaFast)
        self.EMASlow = talib.EMA(dataY, emaSlow)

        self.index = 0
        
    def next(self):

        self.index += 1

        if self.index == len(self.dataY):
            return

        order_params = {
            "size": 1,
            "price": self.dataY[self.index],
            "time": self.dataX[self.index],
        }

        if (
            self.EMAFast[self.index] > self.EMASlow[self.index]
            and self.EMAFast[self.index - 1] < self.EMASlow[self.index - 1]
        ):
            self.buy(**order_params)

        if (
            self.EMAFast[self.index] < self.EMASlow[self.index]
            and self.EMAFast[self.index - 1] > self.EMASlow[self.index - 1]
        ):
            self.sell(**order_params)

        return

    def get_order_book(self):
        return self.broker.get_order_book()
