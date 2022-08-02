import { useCurrentFrame, useVideoConfig, Sequence, continueRender, delayRender } from "remotion";
import { getVideoMetadata } from "@remotion/media-utils";
import { Clip } from "./Clip";
import { ClipInfo } from "./ClipInfo";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { useEffect, useState } from "react";

import {clips as clipList} from '../downloads/clips.json';

export const ClipsList: React.FC = () => {

  const clip1 = require(__dirname + '/../downloads/' + clipList.clip1)

	const [handle] = useState(() => delayRender());
  const [duration, setDuration] = useState(1);
  const transition = 100;
	// const [videos, setVideos] = useState([]);

	useEffect(() => {
		// let videosData = getVideos();
		// setVideos(videosData);
    try {
      getVideoMetadata(clip1).then(({ durationInSeconds }) => {
        setDuration(Math.round(durationInSeconds * 30));
        continueRender(handle);
      })
    } catch (error) {

    }
	}, [handle]);

	return (
    <>
      <Sequence from={0} durationInFrames={transition}>
        <Intro />
      </Sequence>

      <Sequence from={transition} durationInFrames={transition}>
        <ClipInfo />
      </Sequence>
      
      <Sequence from={transition * 2} durationInFrames={duration}>
        <Clip clip={clip1} />
      </Sequence>
    </>
	);
};
