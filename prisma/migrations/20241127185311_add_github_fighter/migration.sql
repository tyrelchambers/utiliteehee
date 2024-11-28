-- CreateTable
CREATE TABLE "GithubFighter" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "commits" INTEGER NOT NULL,
    "repos" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "powerLevel" INTEGER NOT NULL,

    CONSTRAINT "GithubFighter_pkey" PRIMARY KEY ("id")
);
