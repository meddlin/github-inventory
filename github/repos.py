"""Handle repository actions with GitHub
"""

import os
import logging
import uuid
from typing import Dict, List, Any
import requests
from rich.console import Console
from rich.table import Table
from github.gh_actions import __request_repo_workflows
from github.models.workflow import GitHubWorkflow
from database.manager import DatabaseManager

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

def insert_repo(repo):
    repo_id = str(uuid.uuid4())
    with DatabaseManager() as db:
        db.execute('''
                   INSERT INTO repositories (id, name, url)
                   VALUES (?, ?, ?)
                   ''', (repo_id, repo['name'], repo['html_url'])
                )

def user_repos_report(username: str):
    """Handle reporting GitHub repos for user
    """

    repos = __request_repos_for_user(username)
    
    console = Console()
    table = Table(title="GitHub Repositories")

    table.add_column("Name", style="cyan", no_wrap=True)
    table.add_column("Private", justify="center", style="magenta")
    table.add_column("Language", style="green")
    table.add_column("Stars", justify="right", style="yellow")

    for repo in repos:
        # insert_repo(repo)
        table.add_row(
            repo["name"],
            "🔒" if repo["private"] else "🌐",
            repo["language"] or "—",
            str(repo["stargazers_count"])
        )

    # Render table
    console.print(table)

def handle_args(args):

    if args.report == 'list':
        user_repos_report(args.user)
    
    if args.report == 'workflows':
        wfs = __request_repo_workflows(owner = 'meddlin', repo = 'github-inventory')
        for w in wfs:
            workflow = GitHubWorkflow.from_dict(w)
            print(workflow.name)