import re
import pathlib
from setuptools import setup, find_packages

name = "ion"
here = pathlib.Path.absolute(pathlib.Path(__file__).resolve().parent)

package_metadata: dict = {}
with open(f"./src/{name}/__init__.py") as fp:
    exec(fp.read(), package_metadata)

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

base_requirements = {
    "typing_extensions>=3.7.4.3 ;  python_version < '3.8'",
    "typing_extensions>=3.10.0.2 ;  python_version >= '3.8'",
    "mypy_extensions>=0.4.3",
    "typing-inspect",
    "pydantic>=1.5.1",
    "mixpanel>=4.9.0",
    "python-dotenv==1.0.0",
}

main_requirements = {
    "usda_api",
    "hydra-core==1.3",
}

dev_requirements = {
    "black==22.10.0",
    "pip-chill==1.0.1",
    "pre-commit==2.20.0",
    "coverage>=5.1",
    "flake8>=3.8.3",
    "flake8-tidy-imports>=4.3.0",
    "isort>=5.7.0",
    "mypy==0.991",
    "pytest>=6.2.2",
    "pytest-testmon==1.4.2",
    "pytest-asyncio==0.20.3",
    "vulture==2.7",
}

entry_points = {
    "console_scripts": ["ion = ion.entrypoints:main"],
}

setup(
    name=package_metadata["__package_name__"],
    version=package_metadata["__version__"],
    author="Loh Yi Kuang",
    description="",
    license="Apache License 2.0",
    long_description=long_description,
    long_description_content_type="text/markdown",
    package_dir={"": "src"},
    packages=find_packages("src", exclude=["*tests"]),
    install_requires=list(base_requirements | main_requirements),
    entry_points=entry_points,
    python_requires=">=3.9",
)
