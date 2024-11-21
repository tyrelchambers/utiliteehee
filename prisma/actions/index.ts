import { SpotifyPlaylist } from "@prisma/client";
import { prisma } from "../client";

export const savePlaylist = async (data: Omit<SpotifyPlaylist, "id">) => {
  return await prisma.spotifyPlaylist.create({ data });
};

export const getAllPlaylists = async () => {
  return await prisma.spotifyPlaylist.findMany();
};
