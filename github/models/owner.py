from typing import Any

class GitHubOwner:
    def __init__(
            self,
            login: str,
            id: int,
            node_id: str,
            avatar_url: str,
            gravatar_id: str,
            url: str,
            html_url: str,
            followers_url: str,
            following_url: str,
            gists_url: str,
            starred_url: str,
            subscriptions_url: str,
            organizations_url: str,
            repos_url: str,
            events_url: str,
            received_events_url: str,
            type: str,
            user_view_type: str,
            site_admin: bool
    ):
        self.login: str = login
        self.id: int = id
        self.node_id: str = node_id
        self.avatar_url: str = avatar_url
        self.gravatar_id: str = gravatar_id
        self.url: str = url
        self.html_url: str = html_url
        self.followers_url: str = followers_url
        self.following_url: str = following_url
        self.gists_url: str = gists_url
        self.starred_url: str = starred_url
        self.subscriptions_url: str = subscriptions_url
        self.organizations_url: str = organizations_url
        self.repos_url: str = repos_url
        self.events_url: str = events_url
        self.received_events_url: str = received_events_url
        self.type: str = type
        self.user_view_type: str = user_view_type
        self.site_admin: bool = site_admin

    @classmethod
    def from_dict(cls, data: Any):
        return cls(
            data['login'],
            data['id'],
            data['node_id'],
            data['avatar_url'],
            data['gravatar_id'],
            data['url'],
            data['html_url'],
            data['followers_url'],
            data['following_url'],
            data['gists_url'],
            data['starred_url'],
            data['subscriptions_url'],
            data['organizations_url'],
            data['repos_url'],
            data['events_url'],
            data['received_events_url'],
            data['type'],
            data['user_view_type'],
            data['site_admin']
        )
