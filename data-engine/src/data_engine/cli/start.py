import os
import sys
import click
import importlib
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
