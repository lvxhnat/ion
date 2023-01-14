import re
import pathlib
import setuptools
from setuptools import setup

name = "data_engine"
here = pathlib.Path.absolute(pathlib.Path(__file__).resolve().parent)

# get package version
with open(
    pathlib.Path(here, "./src/data_engine/__init__.py"), encoding="utf-8"
) as f:
    result = re.search(r'__version__ = ["\']([^"\']+)', f.read())

    if not result:
        raise ValueError(
            f"Can't find the version in {pathlib.Path(here, 'src/data_engine/__init__.py')}"
        )

    version = result.group(1)

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

base_requirements = {
    "prefect==2.7.4",
    "hydra-core==1.3.1",
    "pydantic==1.10.2",
    "pandas==1.5.2",
    "python-dotenv==0.21.0",
    "psycopg2-binary==2.9.5",
}

setup(
    name=name,
    version=version,
    author="Loh Yi Kuang",
    description="",
    long_description=long_description,
    long_description_content_type="text/markdown",
    package_dir={"": "src"},
    packages=setuptools.find_namespace_packages(where="./src"),
    package_data={"data_engine": ["*.txt", "*.json", "*.preamble", "*.sql"]},
    install_requires=list(base_requirements),
    python_requires=">=3.9",
)
