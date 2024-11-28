import { ProfileInfo } from "@/utils/githubBattlerHelpers";
import { faBolt } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const Leaderboards = ({ data }: { data: ProfileInfo[] }) => {
  return (
    <div className="bg-green-900/10 backdrop-blur-sm p-6 rounded-xl max-w-screen-lg mx-auto">
      <h2 className="h2 font-mono">Leaderboards - Top 100</h2>

      <ul className="mt-6 ">
        {data.map((d, i) => (
          <li
            key={d.username}
            className="flex items-center gap-4 p-3 w-full odd:bg-green-700/10"
          >
            <p className="font-mono text-xl">{i + 1}</p>
            <Image
              src={d.avatarUrl ?? ""}
              alt={d.username}
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
            />
            <div>
              <h3 className="h3 font-mono">{d.username}</h3>
              <p className="text-sm text-muted-foreground">{d.name}</p>
            </div>

            <p className="font-mono ml-auto text-xl">
              <FontAwesomeIcon icon={faBolt} /> {d.powerLevel}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboards;
