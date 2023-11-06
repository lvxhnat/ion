import itertools
from functools import partial
from typing import Dict, Any, Callable, List
from concurrent.futures import ThreadPoolExecutor, as_completed


class MultithreadHandler:

    """General Class to Parallelize most functions."""

    def __init__(
        self,
        callback: Callable,
    ):
        self.callback_function = callback

    @staticmethod
    def split_array_for_workers(array: List[str], num: int):
        k, m = divmod(len(array), num)
        d = (
            array[i * k + min(i, m) : (i + 1) * k + min(i + 1, m)]
            for i in range(num)
        )
        return d

    def calculate_number_of_workers(self, param_length: int):
        return min(12, param_length)

    def lazy_execute(
        self,
        iterable_params: Dict[str, Any],
        constant_params: Dict[str, Any],
    ) -> Callable:
        """Returns a lazily evaluated function for later calls.
         Example Usage
        -------------
        >>> def foo(a: int, b: str):
        >>>     time.sleep(1)
        >>>     return a, b
        >>> f = MultithreadHandler(f).lazy_execute(iterable_params = {'a': [1,2,3]}, constant_params = {'b': 'test'})
        >>> f
        $ functools.partial(<bound method MultithreadHandler.execute of <__main__.MultithreadHandler object at 0x7fb4a23adb00>>, iterable_params = {'a': [1,2,3]}, constant_params = {'b': 'test'})
        >>> f()
        $   1, test
        $   2, test
        $   3, test
        """

        return partial(
            MultithreadHandler(self.callback_function).execute,
            iterable_params=iterable_params,
            constant_params=constant_params,
        )

    def execute(
        self,
        iterable_params: Dict[str, Any],
        constant_params: Dict[str, Any],
    ) -> List[Any]:
        """Executes jobs in parallel based on specified parameters.
        Example Usage
        -------------
        >>> def foo(a: int, b: str):
        >>>     time.sleep(1)
        >>>     return a, b
        >>> MultithreadHandler(f).execute(iterable_params = {'a': [1,2,3]}, constant_params = {'b': 'test'})
        $   1, test
        $   2, test
        $   3, test
        """

        # Set the number of thread workers
        clients = []
        length = len(list(iterable_params.values())[0])
        num_workers = self.calculate_number_of_workers(length)

        # Make sure that all of our input parameters are the same length
        # Maps across and checks if length of first key's value is the same as subsequent values. (1 if true, 0 if false).
        # Values should all be 1 (Lengths should all be equivalent, hence true), and therefore equal to number of existing parameters passed.
        assert sum(
            map(lambda x: (len(x) == length), [*iterable_params.values()])
        ) == len(
            iterable_params.values()
        ), "Ensure that input parameters are of the same length"

        # Convert the objects data structure from dict to list, for ingestion.
        parameter_set = []
        for i in range(length):
            d = {}
            for key, value in iterable_params.items():
                d[key] = value[i]
            parameter_set.append(d)

        # Split the parameters for each worker, distribute jobs equally.
        worker_parameters = MultithreadHandler.split_array_for_workers(
            parameter_set, num_workers
        )

        with ThreadPoolExecutor(max_workers=num_workers) as executor:

            futures = []

            for worker_parameter_list in worker_parameters:

                worker_job = partial(
                    self.callback_function.execute,
                    constant_params=constant_params,
                )

                job = executor.submit(
                    worker_job,
                    iterable_params=worker_parameter_list,
                )

                futures.append(job)

            for _, future in enumerate(as_completed(futures), start=1):

                client = future.result()
                clients.append(client)

        return list(itertools.chain.from_iterable(clients))
