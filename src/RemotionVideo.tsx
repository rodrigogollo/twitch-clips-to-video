import { continueRender, delayRender, Composition } from "remotion";
import { useState, useEffect, useCallback } from "react";
import { getVideoMetadata } from "@remotion/media-utils";

import { Video } from "./Video";
import clipsJSON from '../downloads/clips.json';
import { transform } from "typescript";

export const RemotionVideo: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [duration, setDuration] = useState(1000);

  const fetchData = useCallback(async () => {
    let totalDuration = 1;
    
    for await (const clip of clipsJSON.clips) {
      let duration = Math.round(clip.data.duration * 60);
      totalDuration += duration;
    }
    setDuration(totalDuration);
    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData])


  const intro = 240;
  const outro = intro * 2;

  return (
			<Composition
        id="MyVideo"
        component={Video}
        durationInFrames={intro + duration + outro} //videos duration + intro(120) + outro(360)
        fps={60}
        // width={1920}
        // height={1080}
        width={1920}
        height={1080}
        defaultProps={{ clipList: clipsJSON.clips, totalDuration: duration }}
      />
	);
};
