from abc import ABC
from typing import Callable


class AbstractMonad(ABC):
    def __init__(self, state: object = None):
        self.state = state

    def bind(self, prefect_task: Callable, **kwargs):
        try:
            if self.state is None:
                return AbstractMonad(prefect_task(**kwargs).submit().result())
            else:
                return AbstractMonad(
                    prefect_task(self.state, **kwargs).submit().result()
                )
        except:
            return AbstractMonad(None)


class Flow(AbstractMonad):
    pass


def pipeline(input_data: object) -> Flow:
    return Flow(input_data)
