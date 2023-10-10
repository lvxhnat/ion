import click
from finflow import __package_name__ as package_name, __version__ as version

@click.group(name=package_name)
@click.version_option(version, "--version", "-v", help="Show version and exit")
def main():
    """CLI entrypoint"""
    pass