"use client";
import { getPlaylists, getRecommendations } from "@/actions/spotify";
import Heading from "@/components/Heading";
import SharePlaylistModal from "@/components/SharePlaylistModal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { faSpinner, faUser } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpotifyPlaylist } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const MoodPlaylist = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingPlaylists, setLoadingPlaylists] = React.useState<boolean>(true);
  const [mood, setMood] = React.useState<string>("");
  const [tracks, setTracks] = React.useState<any[]>([]);
  const [playlists, setPlaylists] = React.useState<SpotifyPlaylist[]>([]);

  useEffect(() => {
    (async () => {
      const playlists = await getPlaylists();
      setPlaylists(playlists);
      setLoadingPlaylists(false);
    })();
  }, []);

  const getRecs = async () => {
    setLoading(true);
    try {
      const recs = await getRecommendations(mood);

      setTracks(recs);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const addPlaylist = (playlist: SpotifyPlaylist) => {
    setPlaylists((prev) => [...prev, playlist]);
  };

  return (
    <section className="section">
      <Heading module="mood-playlist">
        <h1 className="h1">Mood Playlist Generator</h1>
      </Heading>
      <p className="text-muted-foreground max-w-6xl">
        This playlist generator uses Spotify to curate a playlist based on your
        mood. Also checkout the playlists added by the community. If you have a
        sweet playlist in mind, add it in the section below.
      </p>
      <section className="grid grid-cols-[minmax(500px,900px)_minmax(500px,1fr)] gap-10 mt-10">
        <div className="flex flex-col">
          <div className="bg-secondary border border-border p-4 rounded-xl ">
            <p className="font-medium">
              How are we feeling today? What music are we craving?
            </p>

            <div className="flex items-center gap-6 mt-2">
              <Select onValueChange={(v) => setMood(v)} defaultValue={mood}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happy">Happy</SelectItem>
                  <SelectItem value="sad">Sad</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                  <SelectItem value="relaxed">Relaxed</SelectItem>
                  <SelectItem value="pumped">Pumped</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" disabled={loading} onClick={getRecs}>
                {loading && <FontAwesomeIcon icon={faSpinner} spin />} Get
                recommendations
              </Button>
            </div>
          </div>

          {loading && (
            <div className="flex flex-col gap-6 mt-6">
              <Skeleton className="h-20  w-full" />
              <Skeleton className="h-20  w-full" />
              <Skeleton className="h-20  w-full" />
            </div>
          )}

          {tracks.length > 0 && (
            <div className="flex flex-col gap-6 mt-6">
              {!loading &&
                tracks.map((t, i) => (
                  <div
                    key={i}
                    dangerouslySetInnerHTML={{ __html: t.html }}
                  ></div>
                ))}
            </div>
          )}
        </div>

        <div className="flex flex-col bg-secondary border border-border p-4 rounded-xl  h-fit">
          <header className="flex items-center justify-between mb-10">
            <div className="flex flex-col">
              <h2 className="h2 mb-0">Shared Playlists</h2>
              <p className="text-muted-foreground">
                These playlists have been added by the community for your
                enjoyment!
              </p>
            </div>
            <SharePlaylistModal setPlaylists={addPlaylist} />
          </header>

          <ScrollArea className="h-[500px]">
            <div className="playlist-grid gap-2">
              {!loadingPlaylists &&
                playlists.length > 0 &&
                playlists.map((p, i) => (
                  <Link
                    href={p.url}
                    target="_blank"
                    key={i}
                    className="relative rounded-md overflow-hidden playlist-item"
                  >
                    <div className="absolute bottom-0 left-0 w-full z-10 bg-gradient-to-t from-muted to-muted/10 h-full flex flex-col justify-end p-2">
                      <p className="font-bold">{p.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {p.description}
                      </p>
                      <div className="flex text-xxs">
                        <FontAwesomeIcon icon={faUser} />
                        <p className="ml-2  font-bold text-muted-foreground">
                          {p.userDisplayName}
                        </p>
                      </div>
                    </div>
                    <div className="relative aspect-square">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="playlist-thumb transition-all"
                        sizes="200px"
                      />
                    </div>
                  </Link>
                ))}
              {loadingPlaylists && <Loaders />}
            </div>
          </ScrollArea>
        </div>
      </section>
    </section>
  );
};

const Loaders = () => (
  <>
    <Skeleton className="aspect-square !bg-background" />
    <Skeleton className="aspect-square  !bg-background" />
    <Skeleton className="aspect-square  !bg-background" />
    <Skeleton className="aspect-square  !bg-background" />
    <Skeleton className="aspect-square  !bg-background" />
    <Skeleton className="aspect-square  !bg-background" />
  </>
);

export default MoodPlaylist;
