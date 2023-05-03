import click

from ion.cli.docker_cli import docker
from ion.cli.provider_cli import provider

from ion.configs.base import configs as base_configs
from ion import __version__ as version, __package_name__ as package_name


@click.group(name=package_name)
@click.version_option(version, "--version", "-v", help="Show version and exit")
def main():
    """CLI entrypoint"""
    pass


@main.command()
def info():
    """Information about Data Engine
    Ion Title Type: ANSI Shadow / Default / Default
    """
    LOGO = base_configs.LOGO
    LOGO_COLOR = base_configs.LOGO_COLOR
    LOGO_FOOTNOTE = f"{click.style('Made by the Big Data Corp 🐍💚📊. Enjoy!', 'red')}\n"

    click.echo(f"{LOGO_COLOR}{LOGO}{LOGO_COLOR}")
    click.echo(LOGO_FOOTNOTE)


main.add_command(docker)
main.add_command(provider)
