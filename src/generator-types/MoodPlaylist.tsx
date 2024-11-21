"use client";
import { getRecommendations } from "@/actions/spotify";
import SharePlaylistModal from "@/components/SharePlaylistModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";

const MoodPlaylist = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [mood, setMood] = React.useState<string>("");
  const [tracks, setTracks] = React.useState<any[]>([]);
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

  return (
    <section className="section">
      <h1 className="h1">Mood Playlist Generator</h1>

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
          <header className="flex items-center justify-between">
            <h2 className="h2 mb-0">Shared Playlists</h2>
            <SharePlaylistModal />
          </header>
        </div>
      </section>
    </section>
  );
};

export default MoodPlaylist;
