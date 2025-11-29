

class GitHubWorkflow:
    def __init__(
            self,
            id: int,
            node_id: str,
            name: str,
            path: str,
            state: str,
            created_at: str,
            updated_at: str,
            url: str,
            html_url: str,
            badge_url: str
        ):
        self.id: int = id
        self.node_id: str = node_id
        self.name: str = name
        self.path: str = path
        self.state: str = state
        self.created_at: str = created_at
        self.updated_at: str = updated_at
        self.url: str = url
        self.html_url: str = html_url
        self.badge_url: str = badge_url

    @classmethod
    def from_dict(cls, data):
        return cls(
            data['id'],
            data['node_id'],
            data['name'],
            data['path'],
            data['state'],
            data['created_at'],
            data['updated_at'],
            data['url'],
            data['html_url'],
            data['badge_url']
        )
