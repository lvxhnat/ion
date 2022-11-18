import os
import re
import pathlib
import pkg_resources
from setuptools import setup, find_packages

name = "data_ingestion"
req_file = "requirements.dev.txt"
here = pathlib.Path.absolute(pathlib.Path(__file__).resolve().parent)

# get package version
with open(
    pathlib.Path(here, "src/data_ingestion/__init__.py"), encoding="utf-8"
) as f:
    result = re.search(r'__version__ = ["\']([^"\']+)', f.read())

    if not result:
        raise ValueError(
            "Can't find the version in data_ingestion/__init__.py"
        )

    version = result.group(1)

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

with pathlib.Path(os.path.abspath("."), req_file).open() as requirements:
    install_requires = [
        str(requirement)
        for requirement in pkg_resources.parse_requirements(requirements)
    ]

setup(
    name=name,
    version=version,
    author="Loh Yi Kuang",
    description="",
    long_description=long_description,
    long_description_content_type="text/markdown",
    package_dir={"": "src"},
    packages=find_packages("src", exclude=["*tests"]),
    install_requires=install_requires,
    entry_points={
        "console_scripts": [
            "data_ingestion = data_ingestion.launchers.cli:cli"
        ],
    },
    python_requires=">=3.9",
)
