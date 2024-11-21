import { useQuery, useQueryClient } from "@tanstack/react-query";

export const usePlaylists = () => {
  const ctx = useQueryClient();

  const getPlaylists = useQuery({
    queryKey: ["playlists"],
    queryFn: () => ctx.getQueryData(["playlists"]),
  });
};
