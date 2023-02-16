import re
import pathlib
from setuptools import setup, find_packages

name = "ion_users"
here = pathlib.Path.absolute(pathlib.Path(__file__).resolve().parent)

# get package version
with open(
    pathlib.Path(here, "src/ion_users/__init__.py"), encoding="utf-8"
) as f:
    result = re.search(r'__version__ = ["\']([^"\']+)', f.read())

    if not result:
        raise ValueError("Can't find the version in ion_users/__init__.py")

    version = result.group(1)

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name=name,
    version=version,
    author="Loh Yi Kuang",
    description="",
    long_description=long_description,
    long_description_content_type="text/markdown",
    package_dir={"": "src"},
    packages=find_packages("src", exclude=["*tests"]),
    install_requires=[*{}],
    entry_points={
        "console_scripts": ["ion_users = ion_users.launchers.cli:cli"],
    },
    python_requires=">=3.9",
)
