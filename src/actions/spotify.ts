"use server";
import querystring from "node:querystring";
var client_id = process.env.SPOTIFY_ID;
var client_secret = process.env.SPOTIFY_SECRET;
const spotify_url = "https://api.spotify.com/v1/";

interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getSpotifyToken = async (): Promise<Token> => {
  const resp = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body: `grant_type=client_credentials`,
    cache: "default",
    next: {
      revalidate: 3500,
    },
  })
    .then((res) => res.json())
    .catch((error) => Error(error));
  console.log(resp);

  return resp;
};

interface Config {
  [x: string]: {
    min_energy?: number;
    max_energy?: number;
    min_popularity?: number;
    seed_genres?: string;
    min_valence?: number;
    max_valence?: number;
    seed_tracks?: string;
    seed_artists?: string;
  };
}

const moodConfigs: Config = {
  happy: {
    min_energy: 0.8,
    min_popularity: 80,
    seed_tracks:
      "0rtDE9zfXbamTlRUSwY7zy,09IStsImFySgyp0pIQdqAc,3LxG9HkMMFP0MZuiw3O2rF",
  },
  sad: {
    max_energy: 0.4,
    max_valence: 0.5,
    seed_tracks: "1ei3hzQmrgealgRKFxIcWn,4Skkx52Dh8yo4G1ijAEGs3",
  },
  energetic: {
    seed_artists: "0p3tzEAt0XWrBqbrwBoN1I,3bO19AOone0ubCsfDXDtYt",
    seed_tracks: "3xkHsmpQCBMytMJNiDf3Ii,5IZXB5IKAD2qlvTPJYDCFB",
  },
  relaxed: {
    seed_tracks: "6pf5028wjrwmlCtipE0N1x,0bUYgpgrUaoFouvS0vf6qe",
    seed_artists: "4wOqWyXZiVMLchDC2H9CyP",
  },
  pumped: {
    seed_artists:
      "6XyY86QOPPrYVGvF9ch6wz,2xiIXseIJcq3nG7C8fHeBj,2CmaKO2zEGJ1NWpS1yfVGz",
  },
  angry: {},
  ["give-me-metal"]: {},
};

export const getRecommendations = async (mood: string) => {
  try {
    const token = await getSpotifyToken();

    const params = querystring.stringify({
      ...moodConfigs[mood],
    });

    const resp = await fetch(spotify_url + `recommendations?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
      .then((res) => res.json())
      .catch((error) => Error(error));
    console.log(resp);

    const tracks = [];

    for (const track of resp.tracks) {
      let embed = await getTrackEmbed(track.external_urls.spotify);

      tracks.push(embed);
    }

    return tracks;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTrackEmbed = async (url: string) => {
  const token = await getSpotifyToken();
  const resp = fetch("https://open.spotify.com/oembed" + `?url=${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => Error(error));
  return resp;
};
