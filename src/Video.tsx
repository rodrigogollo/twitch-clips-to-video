import { continueRender, delayRender, Sequence } from "remotion";
import { useState, useEffect, useCallback } from "react";
import { getVideoMetadata } from "@remotion/media-utils";
const { asyncWrapper} = require('../utils');

import clipsJSON from '../downloads/clips.json';
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { ClipsList } from "./ClipsList";
import { transpileModule } from "typescript";

export const Video: React.FC <{clipList: any, totalDuration: any }>= ({ clipList, totalDuration }) => {

  const [handle] = useState(() => delayRender());
  const [duration, setDuration] = useState(null);
  const transition = 120;
  
  // const fetchData = useCallback(async () => {
    
  //   let totalDuration = 1;

  //   for await (const clip of clipsJSON.clips){
  //     let currentVideo = await require('../downloads/' + clip.video);
  //     let duration = await getVideoMetadata(currentVideo).then(({ durationInSeconds }) => (Math.round(durationInSeconds * 30)));
  //     Object.assign(clip, {
  //       duration: duration,
  //       id: clip.video.split('.')[0],
  //       clipName: currentVideo
  //     });
  //     totalDuration += duration;
  //     break;
  //   }

  //   setDuration(totalDuration);
  //   setClipList(clipsJSON.clips);
  //   continueRender(handle);
  // }, [handle]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData])


	return (
    <>
    { clipList ? (
        <>
          <Sequence from={0} durationInFrames={transition + 15}>
            <Intro />
          </Sequence>
          <ClipsList clipList={clipList} transition={transition} />
          {/* <Sequence from={transition + 15 + totalDuration} durationInFrames={transition}>
            <Outro />
          </Sequence> */}
        </>
    ) : null }
    </>
	);
};


/*

 
*/