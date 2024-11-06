import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export async function getRepoDetails(owner: string, repo: string) {
  const { data } = await octokit.repos.get({
    owner,
    repo,
  });
  return data;
}