import os
from typing import Dict, List, Any
import requests

def __request_repo_workflows(owner: str, repo: str) -> List[Any]:

    token = os.environ.get('GITHUB_TOKEN')
    headers = {
        'Authorization': f'token {token}',
        'X-GitHub-Api-Version': '2022-11-28',
        'Accept': 'application/vnd.github+json'
    }
    timeout = 10

    params: Dict[str, int] = { 'per_page': 100, 'page': 1 }
    data = []

    try:
        continue_paging = True
        while continue_paging:
            r = requests.get(f'https://api.github.com/repos/{owner}/{repo}/actions/workflows',
                             headers = headers,
                             params = params,
                             timeout = timeout
                            )
            result = r.json()
            data = result['workflows']
    except Exception as e:
        # logging.error(f"--- ERROR --- {e}")
        print(f"--- ERROR --- {e}")

    return data
