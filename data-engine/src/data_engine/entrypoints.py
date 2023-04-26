import click

from data_engine import __version__ as version
from data_engine.cli.start import start


@click.group(name="dataengine")
@click.version_option(version, "--version", "-v", help="Show version and exit")
def main():
    """CLI entrypoint"""
    pass


@main.command()
def info():
    """Information about Data Engine
    Ion Title Type: ANSI Shadow / Default / Default
    Data Engine Title Type: Ivrit / Smush (R) / Smush (R)
    """
    LOGO_COLOR = "\033[91m"
    LOGO = rf"""
        
                        ██╗ ██████╗ ███╗   ██╗
                        ██║██╔═══██╗████╗  ██║
                        ██║██║   ██║██╔██╗ ██║
                        ██║██║   ██║██║╚██╗██║
                        ██║╚██████╔╝██║ ╚████║
                        ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
             _       _                           _            
          __| | __ _| |_ __ _    ___ _ __   __ _(_)_ __   ___ 
         / _` |/ _` | __/ _` |  / _ \ '_ \ / _` | | '_ \ / _ \
        | (_| | (_| | || (_| | |  __/ | | | (_| | | | | |  __/
         \__,_|\__,_|\__\__,_|  \___|_| |_|\__, |_|_| |_|\___|
                                           |___/              
    """
    LOGO_FOOTNOTE = f"{click.style('Made by the Big Data Corp 🐍💚📊', 'red')}\n"
    click.echo(f"{LOGO_COLOR}{LOGO}{LOGO_COLOR}")
    click.echo(LOGO_FOOTNOTE)


main.add_command(start)
