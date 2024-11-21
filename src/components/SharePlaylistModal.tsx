"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import { addPlaylist } from "@/actions/spotify";
import { toast } from "sonner";
import { SpotifyPlaylist } from "@prisma/client";

const formSchema = z.object({
  id: z.string().min(1, {
    message: "Playlist ID is required",
  }),
});

const SharePlaylistModal = ({
  setPlaylists,
}: {
  setPlaylists: (param: SpotifyPlaylist) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const savedPlaylist = await addPlaylist(data.id);

      if (!savedPlaylist) {
        return;
      }

      setPlaylists(savedPlaylist);
      toast.success("Playlist shared!");
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      console.log(error);
      toast.error("Something went wrong.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Share your playlist</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Playlist</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Playlist ID</FormLabel>
                  <FormDescription>
                    https://open.spotify.com/playlist/[playlist_id]
                  </FormDescription>
                  <Input {...field} placeholder="Playlist ID" />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 flex justify-self-end">
              Share playlist
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SharePlaylistModal;
