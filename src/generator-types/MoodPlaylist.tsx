"use client";
import { getPlaylists, getRecommendations } from "@/actions/spotify";
import SharePlaylistModal from "@/components/SharePlaylistModal";
import { Button } from "@/components/ui/button";
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
  const [mood, setMood] = React.useState<string>("");
  const [tracks, setTracks] = React.useState<any[]>([]);
  const [playlists, setPlaylists] = React.useState<SpotifyPlaylist[]>([]);

  useEffect(() => {
    (async () => {
      const playlists = await getPlaylists();
      setPlaylists(playlists);
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
      <h1 className="h1">Mood Playlist Generator</h1>
      {console.log(playlists)}
      <section className="grid grid-cols-[900px_1fr] gap-10 mt-10">
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

        <div className="flex flex-col bg-secondary border border-border p-4 rounded-xl">
          <header className="flex items-center justify-between mb-10">
            <h2 className="h2 mb-0">Shared Playlists</h2>
            <SharePlaylistModal setPlaylists={addPlaylist} />
          </header>

          <div className="grid grid-cols-6 gap-2">
            {playlists.length > 0 &&
              playlists.map((p, i) => (
                <Link
                  href={p.url}
                  target="_blank"
                  key={i}
                  className="relative rounded-md overflow-hidden playlist-item"
                >
                  <div className="absolute bottom-0 left-0 z-10 bg-gradient-to-t from-muted to-muted/10 h-full flex flex-col justify-end p-2">
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
                    />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default MoodPlaylist;
