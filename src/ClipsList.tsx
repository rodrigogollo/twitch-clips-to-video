import { useCurrentFrame, useVideoConfig, Sequence, continueRender, delayRender } from "remotion";
import { Clip } from "./Clip";
import { useEffect, useCallback, useState } from "react";

import clip1  from '../downloads/clip1.mp4';
import clip2  from '../downloads/clip2.mp4';
import clip3  from '../downloads/clip3.mp4';
import clip4  from '../downloads/clip4.mp4';
import clip5  from '../downloads/clip5.mp4';
// import clip6  from '../downloads/clip6.mp4';
// import clip7  from '../downloads/clip7.mp4';
// import clip8  from '../downloads/clip8.mp4';
// import clip9  from '../downloads/clip9.mp4';
// import clip10  from '../downloads/clip10.mp4';

import { getVideoMetadata } from "@remotion/media-utils";

// import { getVideos } from '../server/index.js';

export const ClipsList: React.FC = () => {
	const [handle] = useState(() => delayRender());
  const [duration1, setDuration1] = useState(1);
  const [duration2, setDuration2] = useState(1);
  const [duration3, setDuration3] = useState(1);
  const [duration4, setDuration4] = useState(1);
  const [duration5, setDuration5] = useState(1);
	// const [videos, setVideos] = useState([]);

	useEffect(() => {
		// let videosData = getVideos();
		// setVideos(videosData);

    try {

      getVideoMetadata(clip1).then(({ durationInSeconds }) => {
        setDuration1(Math.round(durationInSeconds * 30));
        continueRender(handle);
      })

      getVideoMetadata(clip2).then(({ durationInSeconds }) => {
        setDuration2(Math.round(durationInSeconds * 30));
        continueRender(handle);
      })

      getVideoMetadata(clip3).then(({ durationInSeconds }) => {
        setDuration3(Math.round(durationInSeconds * 30));
        continueRender(handle);
      })

      getVideoMetadata(clip4).then(({ durationInSeconds }) => {
        setDuration4(Math.round(durationInSeconds * 30));
        continueRender(handle);
      })

      getVideoMetadata(clip5).then(({ durationInSeconds }) => {
        setDuration5(Math.round(durationInSeconds * 30));
        continueRender(handle);
      })

    } catch (error) {

    }
	}, [handle]);


	return (
    <>
      <Sequence from={0} durationInFrames={duration1}>
        <Clip clip={clip1} />
      </Sequence>
      <Sequence from={duration1 + 10} durationInFrames={duration2}>
        <Clip clip={clip2} />
      </Sequence>
      <Sequence from={duration1 + duration2 + 10} durationInFrames={duration3}>
        <Clip clip={clip3} />
      </Sequence>
      <Sequence from={duration1 + duration2 + duration3 + 10} durationInFrames={duration4}>
        <Clip clip={clip4} />
      </Sequence>
      <Sequence from={duration1 + duration2 + duration3 + duration4 + 10} durationInFrames={duration5}>
        <Clip clip={clip5} />
      </Sequence>
    </>
	);
};
