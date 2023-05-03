import os
from enum import Enum
from typing import Iterator
from contextlib import contextmanager

import docker
import docker.errors
import docker.models.containers

MIN_MEMORY_NEEDED = 3.8  # GB

class ContainerStateType(Enum):
    CONTAINER_RUNNING = "running"
    CONTAINER_SLEEPING = "sleeping"
    CONTAINER_NOTEXIST = "notexist"

class DockerNotRunningError(Exception):
    SHOW_STACK_TRACE = False


class DockerLowMemoryError(Exception):
    SHOW_STACK_TRACE = False


def is_running(container_name) -> ContainerStateType:
    """
    verify the status of a sniffer container by it's name
    :param container_name: the name of the container
    :return: Boolean if the status is ok
    """
    with get_docker_client() as client:
        try:
            container = client.containers.get(container_name)
            container_state = container.attrs["State"]
            if container_state["Status"] == ContainerStateType.CONTAINER_RUNNING:
                return ContainerStateType.CONTAINER_RUNNING
            else:
                return ContainerStateType.CONTAINER_SLEEPING
        except docker.errors.NotFound:
            return ContainerStateType.CONTAINER_NOTEXIST


@contextmanager
def get_docker_client() -> Iterator[docker.DockerClient]:
    # Get a reference to the Docker client.
    client = None
    try:
        client = docker.from_env()
    except docker.errors.DockerException as error:
        try:
            # Docker Desktop 4.13.0 broke the docker.sock symlink.
            # See https://github.com/docker/docker-py/issues/3059.
            maybe_sock_path = os.path.expanduser("~/.docker/run/docker.sock")
            if os.path.exists(maybe_sock_path):
                client = docker.DockerClient(base_url=f"unix://{maybe_sock_path}")
            else:
                raise error
        except docker.errors.DockerException as error:
            raise DockerNotRunningError(
                "Docker doesn't seem to be running. Did you start it?"
            ) from error
    assert client

    # Make sure that we can talk to Docker.
    try:
        client.ping()
    except docker.errors.DockerException as error:
        raise DockerNotRunningError(
            "Unable to talk to Docker. Did you start it?"
        ) from error

    # Yield the client and make sure to close it.
    try:
        yield client
    finally:
        client.close()


def memory_in_gb(mem_bytes: int) -> float:
    return mem_bytes / (1024 * 1024 * 1000)


def run_quickstart_preflight_checks(client: docker.DockerClient) -> None:
    # Check total memory.
    # TODO: add option to skip this check.
    total_mem_configured = int(client.info()["MemTotal"])
    if memory_in_gb(total_mem_configured) < MIN_MEMORY_NEEDED:
        raise DockerLowMemoryError(
            f"Total Docker memory configured {memory_in_gb(total_mem_configured):.2f}GB is below the minimum threshold {MIN_MEMORY_NEEDED}GB. "
            "You can increase the memory allocated to Docker in the Docker settings."
        )


if __name__ == "__main__":
    is_running("ion")
