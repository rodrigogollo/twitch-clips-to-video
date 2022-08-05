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
  const [duration, setDuration] = useState(1);
  const transition = 120;
  
  const fetchData = useCallback(async () => {
    
    let totalDuration = 0;

    for await (const clip of clipsJSON.clips){
      totalDuration += (Math.round(clip.data.duration * 30) + transition);
      break;
    }

    setDuration(totalDuration);
    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData])


	return (
    <>
    { clipList ? (
        <>
          <Sequence from={0} durationInFrames={transition}>
            <Intro />
          </Sequence>
          <ClipsList clipList={clipList} transition={transition} />
          <Sequence from={transition + totalDuration} durationInFrames={transition * 3}>
            <Outro />
          </Sequence>
        </>
    ) : null }
    </>
	);
};


/*

 
*/