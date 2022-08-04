import { continueRender, delayRender, Composition } from "remotion";
import { useState, useEffect, useCallback } from "react";
import { getVideoMetadata } from "@remotion/media-utils";

import { Video } from "./Video";
import clipsJSON from '../downloads/clips.json';

export const RemotionVideo: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [duration, setDuration] = useState(1000);

  // const fetchData = useCallback(async () => {
  //   let totalDuration = 1;
  //   clipsJSON.clips.map(async (clip: any) => {
  //     let currentVideo = require('../downloads/' + clip.video);
  //     let duration = await getVideoMetadata(currentVideo).then(({ durationInSeconds }) => (Math.round(durationInSeconds * 30)));
  //     totalDuration += duration;
  //   })
  //   setDuration(totalDuration);
  //   continueRender(handle);
  // }, [handle]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData])

  return (
			<Composition
        id="MyVideo"
        component={Video}
        durationInFrames={duration}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
	);
};
