import re
import pathlib

import setuptools
from setuptools import setup

name = "ion_client"
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


def get_long_description():
    with open("./README.md", "r", encoding="utf-8") as fh:
        return fh.read()


base_requirements = {
    "typing_extensions>=3.7.4.3 ;  python_version < '3.8'",
    "typing_extensions>=3.10.0.2 ;  python_version >= '3.8'",
    "mypy_extensions>=0.4.3",
    "typing-inspect",
    "pydantic>=1.5.1",
    "mixpanel>=4.9.0",
}

framework_common = {
    "fastapi==0.85.1",
    "uvicorn==0.19.0",
    "websockets==10.4",
}

base_dev_requirements = {
    "black==22.10.0",
    "pip-chill==1.0.1",
    "pre-commit==2.20.0",
    "coverage>=5.1",
    "flake8>=3.8.3",
    "flake8-tidy-imports>=4.3.0",
    "isort>=5.7.0",
    "mypy==0.991",
    "pytest>=6.2.2",
}

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
    entry_points={"console_scripts": [f"{name}=ion_clients.entrypoints:main"]},
    python_requires=">=3.9",
    install_requires=list(base_requirements | framework_common),
    extras_require={"dev": [*base_dev_requirements]},
)
