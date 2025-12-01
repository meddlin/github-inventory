"""Main module
"""

import argparse
import textwrap
from dotenv import load_dotenv
from github_cli.actions import repos as repo_actions
from github_cli.actions import refresh as refresh_actions

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

    parser = argparse.ArgumentParser(
        prog = 'github-inventory',
        formatter_class = argparse.RawDescriptionHelpFormatter,
        epilog = textwrap.dedent('Examples: main.py --option')
    )
    subparsers = parser.add_subparsers(dest="command")

    refresh_parser = subparsers.add_parser("refresh", help="Refresh the database")

    import_parser = subparsers.add_parser("import", help="Import data to the database")
    import_parser.add_argument(
        "--repos",
        action="store_true",
        help="Import all repos"
    )
    import_parser.add_argument(
        "--orgs",
        action="store_true",
        help="Import all orgs"
    )

    list_parser = subparsers.add_parser("list", help="List items in the database")
    list_parser.add_argument(
        "--repos",
        action="store_true",
        help="List all repos.",
    )

    args = parser.parse_args()

    if args.command == "refresh":
        # TODO: Implement refresh action
        refresh_actions.handle_refresh()
    elif args.command == "list":
        if args.repos:
            repo_actions.handle_repos(username="meddlin")
            # repo_data = repos.__request_repos_for_user(username="meddlin")
            # print(repo_data)

    # parser.add_argument('--repl', action = argparse.BooleanOptionalAction, help = "Start REPL-mode")

    # subparsers = parser.add_subparsers(dest = 'service', required = True)
    # gh_parser = subparsers.add_parser('github', help = 'GitHub related commands')
    # gh_subparser = gh_parser.add_subparsers(dest = 'command')

    # repo_parser = gh_subparser.add_parser('repo', help = 'GitHub repo commands')
    # repo_parser.add_argument('--name', type = str, help = 'Name of repository')
    # repo_parser.add_argument('--owner', type = str, help = 'Owner of repository')
    # repo_parser.add_argument('--report', type = str, help = 'Type of report to execute')
    # repo_parser.add_argument('--user', type = str, help = 'GitHub username')
    # repo_parser.add_argument('--csv', action = argparse.BooleanOptionalAction)
    # repo_parser.set_defaults(func = repos.handle_args)

    # args = parser.parse_args()
    # if hasattr(args, 'func'):
    #     args.func(args)

if __name__ == "__main__":
    main()
