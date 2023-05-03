import re
import click
import time
import subprocess
from typing import List
from pathlib import Path
from datetime import timedelta

from ion import __package_name__ as package_name
from ion.cli.docker_cli_utils import (
    get_docker_client,
    run_quickstart_preflight_checks,
)
from ion.configs.base import configs as base_configs


@click.group()
def docker() -> None:
    """Helper Commands for setting up and interacting with local Ion Instances using Docker."""
    pass


@click.command()
@click.pass_context
def quickstart(context) -> None:

    quickstart_file: str = str(
        Path(__file__).parents[4]
        / "docker"
        / "postgres"
        / "docker-compose.postgres.yml"
    )

    base_command: List[str] = ["docker", "compose", "-f", quickstart_file]

    with get_docker_client() as client:
        run_quickstart_preflight_checks(client)
    # Start the docker service
    click.echo(f"Starting up Ion Engine ... ...")

    start_time: float = time.time()
    start_up_status: str = "ok"
    start_up_attempts: int = 0

    while (
        timedelta(seconds=time.time() - start_time)
        < base_configs.QUICKSTART_MAX_WAIT_TIME
    ):
        try:
            subprocess.run(
                base_command + ["-p", package_name, "up", "-d", "--remove-orphans"],
                check=True,
                stderr=subprocess.PIPE,
            )
        except subprocess.CalledProcessError as error:
            click.secho(
                "Ion Engine failed to start up due to error while calling docker-compose",
                fg="red",
            )
            click.secho(error.stderr.decode(), fg="red")
            return

        start_up_attempts += 1

        if start_up_status == "ok":
            break

    click.secho(base_configs.LOGO, fg="white")
    click.secho("✔ Ion Engine is now running", fg="green")
    click.secho(
        "Need support? Get in touch through my personal email: yikuang5@gmail.com",
        fg="magenta",
    )


docker.add_command(quickstart)
