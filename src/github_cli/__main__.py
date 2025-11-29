"""Entry point so `python -m github_cli` works and PyInstaller can target the package."""

# from recipes_cli.main import main
from github_cli.main import main


if __name__ == "__main__":
    main()
