import click
import subprocess
from pathlib import Path
from sqlalchemy import

@click.group()
def provider() -> None:
    """Helper Commands for setting up and interacting with Ion Provider Instance."""
    pass

@click.command() 
def preinitialise():
    ## A step that we run before initialising the prefect servers. This instantiates any missing tables in our postgres DB and runs the necessary flows
    pass

@click.command()
def deploy():
    """ Deploy any code changes directly onto the prefect agent server """
    DEPLOYMENT_FILE_PATH = Path(__file__).parents[2] / "ion_provider" / "deployment.py"
    subprocess.run(["python", DEPLOYMENT_FILE_PATH])


provider.add_command(deploy)

if __name__ == "__main__":
    deploy()
