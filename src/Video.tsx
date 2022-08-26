import { continueRender, delayRender, Sequence } from "remotion";
import { useState, useEffect, useCallback } from "react";
const { asyncWrapper} = require('../utils');

import clipsJSON from '../downloads/clips.json';
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { ClipsList } from "./ClipsList";

export const Video: React.FC <{clipList: any, totalDuration: any }>= ({ clipList, totalDuration }) => {

  const [handle] = useState(() => delayRender());
  const [duration, setDuration] = useState(1);
  const transition = 240;
  
  const fetchData = useCallback(async () => {
    
    let totalDuration = 0;

    for await (const clip of clipsJSON.clips){
      totalDuration += (Math.round(clip.data.duration * 60));
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
          {/* <Sequence from={0} durationInFrames={transition}>
            <Intro />
          </Sequence> */}
          <ClipsList clipList={clipList} transition={transition} />
          {/* <Sequence from={transition + duration} durationInFrames={transition * 2}>
            <Outro />
          </Sequence> */}
        </>
    ) : null }
    </>
	);
};


/*

 
*/