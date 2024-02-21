import re
import pathlib
from setuptools import setup, find_packages

name = "data_backend"
here = pathlib.Path.absolute(pathlib.Path(__file__).resolve().parent)

# get package version
with open(
    pathlib.Path(here, "src/data_backend/__init__.py"), encoding="utf-8"
) as f:
    result = re.search(r'__version__ = ["\']([^"\']+)', f.read())

    if not result:
        raise ValueError(
            "Can't find the version in data_backend/__init__.py"
        )

    version = result.group(1)

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

framework_common = { "fastapi", "sqlalchemy", "requests", "pandas", "uvicorn", "pydantic-settings" }

setup(
    name=name,
    version=version,
    author="Loh Yi Kuang",
    description="",
    long_description=long_description,
    long_description_content_type="text/markdown",
    package_dir={"": "src"},
    packages=find_packages("src", exclude=["*tests"]),
    install_requires=list(base_requirements | framework_common),
    entry_points={
        "console_scripts": [
            "data_backend = data_backend.launchers.cli:cli"
        ],
    },
    python_requires=">=3.9",
)
