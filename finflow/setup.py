import re
import pathlib
from setuptools import setup, find_packages

here = pathlib.Path.absolute(pathlib.Path(__file__).resolve().parent)

# get package version
with open(pathlib.Path(here, f"src/finflow/__init__.py"), encoding="utf-8") as f:

    package_name = re.search(
        r"__package_name__\s*=\s*['\"]([^'\"]+)['\"]", f.read()
    ).group(1)
    
    if not package_name:
        raise ValueError(
            f"Can't find __package_name__ in {package_name}/__init__.py"
        )

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

framework_common = {
    "aiohttp==3.8.4",
    "fastapi==0.85.1",
    "uvicorn==0.19.0",
    "websockets==10.4",
    "kombu==5.2.4",
    "celery==5.2.7",
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

setup(
    name=package_name,
    version="0.1.1",
    author="Loh Yi Kuang",
    description="",
    long_description=long_description,
    long_description_content_type="text/markdown",
    package_dir={"": "src"},
    packages=find_packages("src", exclude=["*tests"]),
    install_requires=list(base_requirements | framework_common),
    entry_points = {
        "console_scripts": [f"{package_name} = {package_name}.entrypoints:main"],
    },
    python_requires=">=3.9",
)
