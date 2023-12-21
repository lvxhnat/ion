import click
import subprocess
from pathlib import Path
from typing import Optional


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
    """Deploy any code changes directly onto the prefect agent server"""
    DEPLOYMENT_FILE_PATH = Path(__file__).parents[2] / "ion_provider" / "deployment.py"
    subprocess.run(["python", DEPLOYMENT_FILE_PATH])


@click.command("update-data")
@click.option(
    "--pipeline-name",
    type=str,
    is_flag=True,
    required=False,
    help="Either 'common', 'asset' or 'treasury'",
)
def update_data(pipeline_name: Optional[str]):
    """Runs all the pipelines declared within prefect, unless otherwise specified"""
    ROOT_RUN_FOLDER = Path(__file__).parents[2] / "ion_provider" / "flows"
    if not pipeline_name:
        subprocess.run(["python", ROOT_RUN_FOLDER / "flows.py"])
    else:
        run_files: dict = {
            "common": "common/area_latlon.py",
            "asset": "tickers/tickers.py",
            "treasury": "treasury/usgov.py",
        }
        subprocess.run(["python", ROOT_RUN_FOLDER / run_files[pipeline_name]])


provider.add_command(update_data)
provider.add_command(deploy)
