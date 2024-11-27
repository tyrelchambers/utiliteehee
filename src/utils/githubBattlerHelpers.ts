const weights: Omit<ProfileInfo, "username" | "bio" | "powerLevel"> = {
  commits: 3,
  repos: 2,
  followers: 1.5,
  stars: 2.5,
};

export interface ProfileInfo {
  username: string;
  bio: string | null;
  commits: number;
  repos: number;
  followers: number;
  stars: number;
  powerLevel: number;
  avatarUrl: string | null;
  [key: string]: number | string | null;
}

export const statsWithWeights = (stat: ProfileInfo) => {
  for (const key in stat) {
    if (typeof stat[key] !== "number" || typeof weights[key] !== "number")
      continue;

    stat[key] *= Math.floor(weights[key]);
  }
};

export const calcPowerLevel = (stats: ProfileInfo) => {
  let total = 0;
  for (const key in stats) {
    if (typeof stats[key] !== "number" || typeof weights[key] !== "number")
      continue;

    total += stats[key] * Math.floor(weights[key]);
  }

  return total;
};
