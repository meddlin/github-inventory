import os
import logging
from typing import Dict, List, Any
import requests

def __request_repos_for_user(username: str) -> List[Any]:
    """Get repos for a GitHub user
    GitHub docs: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user

    Args:
        username (str): _description_
    """
    token = os.environ.get('GITHUB_TOKEN')
    headers = {
        'Authorization': f'token {token}',
        'X-GitHub-Api-Version': '2022-11-28',
        'Accept': 'application/vnd.github+json'
    }
    timeout = 10

    params: Dict[str, int] = { 'per_page': 100, 'page': 1 }
    repos: List[Any] = []
    try:
        continue_paging = True
        while continue_paging:
            r = requests.get(f'https://api.github.com/users/{username}/repos',
                             headers = headers,
                             params = params,
                             timeout = timeout
                            )
            result = r.json()
            if len(result) == 0:
                continue_paging = False
            else:
                params['page'] = params['page'] + 1
            repos.extend(result)
    except Exception as e:
        logging.error(f"--- ERROR --- {e}")
        print(f"--- ERROR --- {e}")
    
    return repos

def user_repos_report(username: str):
    """Handle reporting GitHub repos for user
    """

    repos = __request_repos_for_user(username)
    print(repos)

def handle_args(args):
    print(f"IN github/repos.py args: {args}")

    if args.report == 'list':
        user_repos_report(args.user)