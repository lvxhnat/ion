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


ROOT_PATH = Path(__file__).parents[4] / "docker"
DOCKER_COMPOSE_POSTGRES = str(ROOT_PATH / "postgres" / "docker-compose.postgres.yml")
DOCKER_COMPOSE_WITHOUT_KAFKA = str(ROOT_PATH / "docker-compose-without-kafka.yml")


@click.command()
@click.option(
    "-d",
    "--detach",
    type=bool, 
    default=False,
    help="Deteched mode: Run containers in the background"
)
@click.option(
    "--stop",
    type=bool,
    is_flag=True,
    default=False,
    help="Use this flag to stop the running containers",
)
@click.pass_context
def quickstart(
    context,
    detach: bool, 
    stop: bool
) -> None:

    quickstart_file: str = DOCKER_COMPOSE_WITHOUT_KAFKA
    base_command: List[str] = ["docker", "compose", "-f", quickstart_file, "-p", package_name]

    if stop:
        subprocess.run(
            [*base_command, "stop"],
            check=True,
        )
        return

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
            suffix_helpers: List[str] = ["-d", "--remove-orphans"] if detach else ["--remove-orphans"]
            subprocess.run(
                base_command + ["up", *suffix_helpers],
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
