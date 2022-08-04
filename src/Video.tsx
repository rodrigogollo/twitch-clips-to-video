import { continueRender, delayRender, Series } from "remotion";
import { useState, useEffect, useCallback } from "react";
import { getVideoMetadata } from "@remotion/media-utils";

import clipsJSON from '../downloads/clips.json';
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { ClipsList } from "./ClipsList";
import { transpileModule } from "typescript";

export const Video: React.FC = () => {

  const [handle] = useState(() => delayRender());
  const [duration, setDuration] = useState(1);
  const [clipList, setClipList] = useState(null);
  const transition = 120;
  
  const fetchData = useCallback(async () => {
    
    let totalDuration = 1;
    clipsJSON.clips.map(async (clip: any) => {
      let currentVideo = await require('../downloads/' + clip.video);
      let duration = await getVideoMetadata(currentVideo).then(({ durationInSeconds }) => (Math.round(durationInSeconds * 30)));
      await Object.assign(clip, {
        duration: duration,
        id: clip.video.split('.')[0],
        clipName: currentVideo
      });
      totalDuration += duration;
    })

    setDuration(totalDuration);
    setClipList(clipsJSON.clips);
    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData])


	return (
    <>
    { duration > 1 ? (
        <Series>
          {/* <Series.Sequence durationInFrames={transition + 15}>
            <Intro />
          </Series.Sequence> */}
          <Series.Sequence durationInFrames={duration}>
            {/* <ClipsList clipList={clipList} transition={transition} /> */}
            <h1>{duration}</h1>
          </Series.Sequence>
          {/* <Series.Sequence durationInFrames={transition}>
            <Outro />
          </Series.Sequence> */}
        </ Series>
          ) : null
 }
    </>
	);
};


/*

 
*/