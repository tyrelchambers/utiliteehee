-- CreateTable
CREATE TABLE "SpotifyPlaylist" (
    "id" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userDisplayName" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "SpotifyPlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyPlaylist_playlistId_key" ON "SpotifyPlaylist"("playlistId");
