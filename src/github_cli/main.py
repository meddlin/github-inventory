"""Main module
"""

import argparse
import textwrap
from dotenv import load_dotenv
from github_cli import repos

def start_repl():
    print("Welcome to the REPL")

    while True:
        try:
            user_input = input(">> ").strip().lower()
            if user_input in ('exit', 'quit'):
                print('Exiting!...')
                break

            args_list = user_input.split()
            print(args_list)
        except KeyboardInterrupt:
            print('Exiting \n')
            break

def main():
    """Main - entry point, and sets up CLI args handling
    """
    print("Welcome to GitHub Inventory!")
    load_dotenv()

    parser = argparse.ArgumentParser(prog = 'github-inventory',
                                     formatter_class = argparse.RawDescriptionHelpFormatter,
                                     epilog = textwrap.dedent('Examples: main.py --option')
                                    )
    parser.add_argument('--repl', action = argparse.BooleanOptionalAction, help = "Start REPL-mode")

    subparsers = parser.add_subparsers(dest = 'service', required = True)
    gh_parser = subparsers.add_parser('github', help = 'GitHub related commands')
    gh_subparser = gh_parser.add_subparsers(dest = 'command')

    repo_parser = gh_subparser.add_parser('repo', help = 'GitHub repo commands')
    repo_parser.add_argument('--name', type = str, help = 'Name of repository')
    repo_parser.add_argument('--owner', type = str, help = 'Owner of repository')
    repo_parser.add_argument('--report', type = str, help = 'Type of report to execute')
    repo_parser.add_argument('--user', type = str, help = 'GitHub username')
    repo_parser.add_argument('--csv', action = argparse.BooleanOptionalAction)
    repo_parser.set_defaults(func = repos.handle_args)

    args = parser.parse_args()
    if hasattr(args, 'func'):
        args.func(args)

if __name__ == "__main__":
    main()
