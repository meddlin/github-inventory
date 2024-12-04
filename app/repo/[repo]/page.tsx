'use client'

import { RepoDetail } from "@/components/repo-detail";
interface RepoPageProps {
    params: {
      owner: string
      repo: string
    }
  }

export default function RepoPage() { // { params }: RepoPageProps
  // const { owner, repo } = params

  // We're using sample data, so we don't need to fetch from GitHub
  // const repoData = { ...sampleRepoData, name: repo, owner: { login: owner } }
  
  const sampleRepoData = {
    name: "react",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    stargazers_count: 200000,
    forks_count: 40000,
    watchers_count: 6500,
    language: "JavaScript",
    updated_at: "2023-06-15T10:30:00Z",
    owner: {
      login: "facebook"
    }
  };
  
  const repoData = {
    ...sampleRepoData,
    name: 'sample repo',
    owner: {
      login: 'sample owner'
    }
  }

  return <RepoDetail repoData={repoData} />
}