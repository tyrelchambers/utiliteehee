"use client";
import { generateImagePrompt } from "@/actions/chats";
import { createCardImage, getGithubProfile } from "@/actions/github-battler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/ui/sidebar";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";
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
  const [imageBlob, setImageBlob] = React.useState<Blob | null>(null);
  const [profileInfo, setProfileInfo] = React.useState<ProfileInfo | null>(
    null
  );

  useEffect(() => {
    setOpen(false);
  }, []);

  const generate = async () => {
    if (!username) return;
    setLoading(true);
    const profile = await getGithubProfile(username);
    setProfileInfo(profile);

    // const generatedPrompt = await generateImagePrompt(profile);
    // const image = await createCardImage(generatedPrompt);

    // setImageBlob(image);
    setLoading(false);
  };

  return (
    <GeneratorWrapper title="Github Battler" favourite={fav}>
      <section className="max-w-screen-md mx-auto flex flex-col  items-center">
        <h2 className="h2">Create your fighter</h2>
        <p className="text-muted-foreground mb-2">
          Create your fighter card by inputting your Github username.
        </p>
        <div className="flex items-center gap-3 w-full">
          <Input
            placeholder="Your Github username"
            className="w-full"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Button onClick={generate} type="button">
            Create fighter
          </Button>
        </div>

        {loading && (
          <div className="flex flex-col gap-3 my-6 items-center bg-secondary p-3 rounded-xl">
            <p>
              Generating fights, please don&apos;t go. I&apos;m doing something.
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
        {imageBlob && (
          <Image
            src={imageBlob ? URL.createObjectURL(imageBlob) : ""}
            alt=""
            width="400"
            height="600"
          />
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
      </section>
    </GeneratorWrapper>
  );
};

export default GithubBattler;
