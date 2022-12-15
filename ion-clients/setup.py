import os
import re
import pathlib
import pkg_resources

import setuptools
from setuptools import setup

name = "ion_client"
req_file = "requirements.dev.txt"
here = pathlib.Path.absolute(pathlib.Path(__file__).resolve().parent)

# get package version
with open(
    pathlib.Path(here, "src/ion_clients/__init__.py"), encoding="utf-8"
) as f:
    result = re.search(r'__version__ = ["\']([^"\']+)', f.read())

    if not result:
        raise ValueError(
            f"Can't find the version in {pathlib.Path(here, 'src/ion_clients/__init__.py')}"
        )

    version = result.group(1)

with pathlib.Path(os.path.abspath("."), req_file).open() as requirements:
    install_requires = [
        str(requirement)
        for requirement in pkg_resources.parse_requirements(requirements)
    ]


def get_long_description():
    with open("./README.md", "r", encoding="utf-8") as fh:
        return fh.read()


setup(
    name=name,
    version=version,
    author="Loh Yi Kuang",
    description="A CLI to manage shared package resource among the Ion Project",
    long_description=get_long_description(),
    license="Apache License 2.0",
    long_description_content_type="text/markdown",
    package_dir={"": "src"},
    packages=setuptools.find_namespace_packages(where="./src"),
    package_data={"ion_clients": ["*.txt", "*.json", "*.preamble", "*.sql"]},
    install_requires=install_requires,
    entry_points={"console_scripts": [f"{name}=ion_clients.entrypoints:main"]},
    python_requires=">=3.9",
)
