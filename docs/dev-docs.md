# Development Docs

Database: SQLite

Virtual Environment: venv

- `python3 -m venv ven`
- `source venv/bin/activate`

## Project Structure & Build State

If everything is structured correctly, you should be able to run:

- `source venv/bin/activate`
- `github-cli list repos`

### Setup for Modules and Development

a) Move things under `/src` directory

b) Make sure module references are updated

c) Add `__init__.py` and `__main__.py` to the 

Setup these two files:

- pyproject.toml
- build.sh

Then run: `pip install -e .`