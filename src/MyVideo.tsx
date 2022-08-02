import { useCurrentFrame, useVideoConfig, Sequence, continueRender, delayRender } from "remotion";
import { Clip } from "./Clip";
import { useEffect, useCallback, useState } from "react";

// import clip1  from '../downloads/clip1.mp4';

import { getVideoMetadata } from "@remotion/media-utils";

import { getVideos } from '../server/index.js';

export const MyVideo: React.FC = () => {
	const [handle] = useState(() => delayRender());
  const [duration, setDuration] = useState(1);
	const [videos, setVideos] = useState([]);
	useEffect(() => {
		let videosData = getVideos();
		setVideos(videosData);

		// getVideoMetadata(clip1).then(({ durationInSeconds }) => {
		// 	setDuration(Math.round(durationInSeconds * 30));
		// 	continueRender(handle);
		// })
		// .catch((err) => {
		// 	console.log(`Error fetching metadata: ${err}`);
		// });
	}, [handle]);


	return (
		 <>
		 {
			videos.map(URL => (
				<Sequence from={0} durationInFrames={duration}>
					<Clip clip={URL} />
				</Sequence>
			))
		 }
			
		</>
	);
};
