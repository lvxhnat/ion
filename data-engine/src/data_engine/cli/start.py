import os
import sys
import click
import importlib
import importlib.util

from typing import List
from pathlib import Path

import inspect
from ion_clients.services.postgres.actions import get_session, table_exists


@click.command()
def start() -> None:
    """Generate the network partitions given an edge file. Kube Flow abstractions such as writing and reading are done at this level."""
    subdirectories = ["database"]
    base_path: Path = Path(__file__).parent.parent / "models"

    for subdirectory in subdirectories:
        files: List[str] = os.listdir(base_path / subdirectory)
        for file in files:
            for n, c in inspect.getmembers(sys.modules[str(base_path / file)]):
                print(n, c)

    spec = importlib.util.spec_from_file_location(
        "module.name", "/path/to/file.py"
    )
    foo = importlib.util.module_from_spec(spec)
    sys.modules["module.name"] = foo
    spec.loader.exec_module(foo)
    foo.MyClass()
