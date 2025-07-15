'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge' // '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton'
import { Star, GitFork, Eye } from 'lucide-react'
import Markdown from 'react-markdown'

interface RepoData {
  name: string
  description: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string
  updated_at: string
  owner: {
    login: string
  }
}

interface RepoDetailProps {
  repoData: RepoData
}

const sampleReadme = `# React

React is a JavaScript library for building user interfaces.

* **Declarative:** React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
* **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs.
* **Learn Once, Write Anywhere:** We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.

[Learn how to use React in your project](https://react.dev/learn).

## Installation

React has been designed for gradual adoption from the start, and you can use as little or as much React as you need:

* Use [Online Playgrounds](https://reactjs.org/docs/getting-started.html#online-playgrounds) to get a taste of React.
* [Add React to a Website](https://reactjs.org/docs/add-react-to-a-website.html) as a \`<script>\` tag in one minute.
* [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html) if you're looking for a powerful JavaScript toolchain.

You can use React as a \`<script>\` tag from a [CDN](https://reactjs.org/docs/cdn-links.html), or as a \`react\` package on [npm](https://www.npmjs.com/package/react).

## Documentation

You can find the React documentation [on the website](https://react.dev/).  

Check out the [Getting Started](https://react.dev/learn) page for a quick overview.

The documentation is divided into several sections:

* [Tutorial](https://react.dev/learn)
* [Main Concepts](https://react.dev/learn/describing-the-ui)
* [Advanced Guides](https://react.dev/learn/escape-hatches)
* [API Reference](https://react.dev/reference/react)
* [Where to Get Support](https://react.dev/community)
* [Contributing Guide](https://legacy.reactjs.org/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/reactjs/reactjs.org).

## Examples

We have several examples [on the website](https://react.dev/). Here is the first one to get you started:

\`\`\`jsx
import { createRoot } from 'react-dom/client';

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById('container'));
root.render(<HelloMessage name="Taylor" />);
\`\`\`

This example will render "Hello Taylor" into a container on the page.

You'll notice that we used an HTML-like syntax; [we call it JSX](https://react.dev/learn#writing-markup-with-jsx). JSX is not required to use React, but it makes code more readable, and writing it feels like writing HTML. If you're using React as a \`<script>\` tag, read [this section](https://reactjs.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx) on integrating JSX; otherwise, the [recommended JavaScript toolchains](https://reactjs.org/docs/create-a-new-react-app.html) handle it automatically.

## Contributing

The main purpose of this repository is to continue evolving React core, making it faster and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### [Code of Conduct](https://code.fb.com/codeofconduct)

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://reactjs.org/docs/how-to-contribute.html)

Read our [contributing guide](https://reactjs.org/docs/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React.

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/facebook/react/labels/good%20first%20issue) that contain bugs which have a relatively limited scope. This is a great place to get started.

### License

React is [MIT licensed](./LICENSE).
`;

export function RepoDetail({ repoData }: RepoDetailProps) {
  const [readme, setReadme] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setReadme(sampleReadme)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!repoData) {
    return <div>No repository data available.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{repoData.name}</CardTitle>
          <CardDescription>{repoData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {repoData.stargazers_count.toLocaleString()}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              {repoData.forks_count.toLocaleString()}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {repoData.watchers_count.toLocaleString()}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Language: {repoData.language}</p>
            <p>Last updated: {new Date(repoData.updated_at).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-row justify-start space-x-12">
        <div className="max-w-[65%]">
          <Card>
            <CardHeader>
              <CardTitle>README</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : readme ? (
                <div className="prose dark:prose-invert max-w-none">
                  <Markdown>{readme}</Markdown>
                </div>
              ) : (
                <p>No README found for this repository.</p>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="max-w-[35%]">
          <h2 className="mb-6 text-lg font-bold">Extras to enable</h2>
          <ul>
            <li>Has license?</li>
            <li>Has codeowners?</li>
            <li>Has branch protection?</li>
            <li>Has GitHub Actions?</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

