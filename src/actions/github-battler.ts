"use server";

import { octokit } from "@/lib/github";
import { calcPowerLevel, ProfileInfo } from "@/utils/githubBattlerHelpers";
import { Octokit } from "octokit";
import { prisma } from "../../prisma/client";

export const createCardImage = async (prompt: string) => {
  const convertToSnakecase = (str: string) =>
    str.replaceAll(/\s/gi, "_").toLowerCase();

  const url = `https://pollinations.ai/p/${convertToSnakecase(prompt)}`;

  const resp = await fetch(url).then((res) => res.blob());

  return resp;
};

export const getGithubProfile = async (username: string) => {
  const profile = await octokit.rest.users.getByUsername({
    username,
  });

  if (!profile.data) Error("User not found");

  const repos = await octokit.rest.repos.listForUser({
    username,
  });

  const profileInfo: ProfileInfo = {
    username: profile.data.login,
    bio: profile.data.bio,
    avatarUrl: profile.data.avatar_url,
    commits: 0,
    repos: 0,
    followers: 0,
    stars: 0,
    powerLevel: 0,
    // pr_merged
    // contrib to other repos
  };

  for (const repo of repos.data) {
    profileInfo.repos += 1;
    const isEmpty = await repoIsEmpty(octokit, username, repo.name);

    if (isEmpty) {
      continue;
    }

    const commits = await getRepoCommitCount(octokit, username, repo.name);
    if (repo.stargazers_count) {
      profileInfo.stars += repo.stargazers_count;
    }

    if (commits) {
      for (const commit of commits) {
        if (commit.author?.login.toLowerCase() === username.toLowerCase()) {
          profileInfo.commits += 1;
        }
      }
    }
  }

  profileInfo.followers = profile.data.followers;

  profileInfo.powerLevel = calcPowerLevel(profileInfo);

  await saveUserToDb(profileInfo);

  return profileInfo;
};

const getRepoCommitCount = async (
  api: Octokit,
  owner: string,
  repo: string
) => {
  if (!owner || !repo) return 0;

  console.log("Fetching commits for", owner, repo);

  const commits = await api.rest.repos.listCommits({
    owner,
    repo,
  });

  if (!commits.data) return 0;

  return commits.data;
};

const repoIsEmpty = async (api: Octokit, owner: string, repo: string) => {
  try {
    await api.rest.repos.getContent({ owner, repo, path: "" });
    return false;
  } catch {
    return true;
  }
};

export const getFighers = async () => {
  return await prisma.githubFighter.findMany({
    take: 100,
    orderBy: {
      powerLevel: "desc",
    },
  });
};

const saveUserToDb = async (info: ProfileInfo) => {
  const exists = await prisma.githubFighter.findFirst({
    where: {
      username: info.username,
    },
  });

  if (exists) {
    return;
  }
  console.log("Saving user to db", info);

  await prisma.githubFighter.create({
    data: {
      username: info.username,
      bio: info.bio ?? "",
      commits: info.commits,
      repos: info.repos,
      followers: info.followers,
      stars: info.stars,
      powerLevel: info.powerLevel,
      avatarUrl: info.avatarUrl ?? "",
    },
  });
};

export const getUser = async (username: string) => {
  return await prisma.githubFighter.findFirst({
    where: {
      username,
    },
  });
};
