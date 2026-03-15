from github_cli.actions.repos  import handle_repo_import

from yaspin import yaspin
from yaspin.spinners import Spinners

from github_cli.utilities import file_utils

def handle_refresh(is_tty: bool = True):
    """Handle refresh database"""
    print('Refreshing...')

    # if nuclear option
    #   issue: docker-compose down
    #   remove ./postgres-data directory
    #   remove ./pgadmin-data directory
    #   restart docker-compose up -d

    # Basic refresh
    #   drop database
    #   

    __tmp_dir__ = "./tmp"
    __db_path__ = "./inventory.db"

    # Configure spinner based on TTY detection
    if is_tty:
        spinner_config = {"color": "green"}
    else:
        # No color configuration to avoid warnings
        spinner_config = {}

    with yaspin(**spinner_config) as sp:
        sp.spinner = Spinners.arc

        # print("Deleting cve.db...")
        # file_utils.remove_file(__db_path__)

        # print("Deleting temp dir: /tmp ...")
        # file_utils.clean_directory(dir_to_be_deleted=__tmp_dir__)

        print("Ingesting GitHub data...")
        handle_repo_import()
