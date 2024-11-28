"use client";
import {
  getFighers,
  getGithubProfile,
  getUser,
} from "@/actions/github-battler";
import Leaderboards from "@/components/github-battler/Leaderboards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";
import { saveToLocalStorage } from "@/lib/utils";
import { ProfileInfo } from "@/utils/githubBattlerHelpers";
import { faBolt } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect } from "react";

const fav = {
  name: "github-battler",
  label: "Github Battler",
};

const GithubBattler = () => {
  const { setOpen } = useSidebar();
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // const [imageBlob, setImageBlob] = React.useState<Blob | null>(null);
  const [profileInfo, setProfileInfo] = React.useState<ProfileInfo | null>(
    null
  );
  const [leaderboards, setLeaderboards] = React.useState<ProfileInfo[]>([]);

  useEffect(() => {
    const fn = async () => {
      const existingUser = window.localStorage.getItem(
        "github-battler-username"
      );

      if (!existingUser) return;

      const user = await getUser(existingUser);
      if (!user) {
        return;
      }

      setProfileInfo(user);
    };
    fn();
  }, []);

  useEffect(() => {
    setOpen(false);
    const fn = async () => {
      const ld = await getFighers();
      setLeaderboards(ld);
    };

    fn();
  }, []);

  const generate = async () => {
    if (!username) return;
    saveToLocalStorage("github-battler-username", username);
    setLoading(true);
    const profile = await getGithubProfile(username);
    setProfileInfo(profile);

    // const generatedPrompt = await generateImagePrompt(profile);
    // const image = await createCardImage(generatedPrompt);

    // setImageBlob(image);
    setLoading(false);
  };

  return (
    <GeneratorWrapper title="Github Ranker" favourite={fav}>
      <section className="max-w-screen-md mx-auto flex flex-col  items-center">
        <h2 className="h2">Add your profile to the ranks</h2>

        <div className="flex items-center gap-3 w-full">
          <Input
            placeholder="Your Github username"
            className="w-full"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Button onClick={generate} type="button">
            Add profile
          </Button>
        </div>

        {loading && (
          <div className="flex flex-col gap-3 my-6 items-center bg-secondary p-3 rounded-xl">
            <p>
              Generating profile stats, please don&apos;t go. I&apos;m doing
              something.
            </p>
            <iframe
              src="https://giphy.com/embed/adWFYC5ugCEIImQ4pK"
              width="480"
              height="360"
              frameBorder="0"
              className="giphy-embed"
            ></iframe>
          </div>
        )}
      </section>
      <section>
        {profileInfo && !loading && (
          <>
            <div className="flex flex-col gap-3 p-3 rounded-xl text-foreground w-full font-mono my-10 items-center">
              <div className="bg-glow-green rounded-xl overflow-hidden">
                <Image
                  src={profileInfo.avatarUrl ?? ""}
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <p className="text-4xl glow flex items-center ">
                {profileInfo.username}{" "}
                <FontAwesomeIcon icon={faBolt} className="text-2xl ml-5 mr-1" />
                {profileInfo.powerLevel}
              </p>
              <p className="text-muted-foreground text-xl max-w-4xl text-center">
                {profileInfo.bio}
              </p>
              <div className="flex gap-3">
                <p className="text-green-500 glow-green">
                  <span>Commits:</span>
                  {profileInfo.commits}
                </p>
                <p className="text-green-500 glow-green">
                  <span>Repos:</span>
                  {profileInfo.repos}
                </p>
                <p className="text-green-500 glow-green">
                  <span>Followers:</span>
                  {profileInfo.followers}
                </p>
                <p className="text-green-500 glow-green">
                  <span>Stars:</span>
                  {profileInfo.stars}
                </p>
              </div>
            </div>
            <div className="player-card"></div>
          </>
        )}
        <Separator className="my-10 max-w-screen-lg mx-auto" />
        <Leaderboards data={leaderboards} />
      </section>
    </GeneratorWrapper>
  );
};

export default GithubBattler;
