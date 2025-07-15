# GitHub Inventory

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

GitHub Inventory is a project to make managing GitHub-based projects easier. 

Key features are (***intended to be***): table list, filtering, sorting, license checks, actions checks, basic security coverage reporting.

## Getting Started

> Note: This inventory is dependent on GitHub Consumer API: [https://github.com/meddlin/github-consumer](https://github.com/meddlin/github-consumer). This API needs to be running locally for this UI to operate correctly.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Inspiration/Motivation

A "query-able SDLC".

After observing efforts around modernizing SDLC processes and building DevSecOps tooling, I started 
considering what if it was possible to query an SDLC similar to how analysts can query data lakes. At the least,
we would need to have an inventory of code repos. From there, we would need to pull metrics from various CI/CD
tooling processes.

All of this is very possible. However, this project focuses on building a PoC based on the GitHub platform
instead of trying to incorporate every permutation of common CI/CD integrations (e.g. Jenkins, Terraform, etc.).