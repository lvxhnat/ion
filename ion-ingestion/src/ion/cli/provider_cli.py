import click
import subprocess
from pathlib import Path


@click.group()
def provider() -> None:
    """Helper Commands for setting up and interacting with Ion Provider Instance."""
    pass


@click.command()
def deploy():
    DEPLOYMENT_FILE_PATH = Path(__file__).parents[2] / "ion_provider" / "deployment.py"
    subprocess.run(["python", DEPLOYMENT_FILE_PATH])


provider.add_command(deploy)

if __name__ == "__main__":
    deploy()
