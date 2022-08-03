import { continueRender, delayRender, Composition } from "remotion";
import { useState } from "react";
import { parse } from "dotenv";
import { getVideoMetadata } from "@remotion/media-utils";

import { ClipsList } from "./ClipsList";
import {clips as clipList} from '../downloads/clips.json';
import { useEffect } from "react";

export const RemotionVideo: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    async function getTotalDuration(){
      let totalDuration = 1;
      for(const [key, value] of Object.entries(clipList)){
        let currentVideo = require('../downloads/' + value)
        let duration = getVideoMetadata(currentVideo).then(({ durationInSeconds }) => (Math.round(durationInSeconds * 30)))
        totalDuration += await duration
      }
      return totalDuration
    }
    getTotalDuration().then(result => {
      setDuration(result);
      continueRender(handle);
    })
  }, [handle])

  return (
		 <>
			<Composition
        id="MyVideo"
        component={ClipsList}
        durationInFrames={duration}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ clipList: clipList }}        
      />
		</>
	);
};
