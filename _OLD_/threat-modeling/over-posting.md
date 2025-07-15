## Over posting, DDOS threat

```mermaid
flowchart TD
    A[auth'd client calls API] --> B{API responds};
    C[client calls API] --> B{API responds};
    D[client calls API x10,000] --> B{API responds};
```