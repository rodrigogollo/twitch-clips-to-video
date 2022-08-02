import { useCurrentFrame, useVideoConfig, Sequence, continueRender, delayRender } from "remotion";
import { Clip } from "./Clip";
import { useEffect, useCallback, useState } from "react";

import clip1  from '../downloads/clip1.mp4';
import clip2  from '../downloads/clip2.mp4';
import clip3  from '../downloads/clip3.mp4';
import clip4  from '../downloads/clip4.mp4';
import clip5  from '../downloads/clip5.mp4';
import clip6  from '../downloads/clip6.mp4';
import clip7  from '../downloads/clip7.mp4';
import clip8  from '../downloads/clip8.mp4';
import clip9  from '../downloads/clip9.mp4';
import clip10  from '../downloads/clip10.mp4';
import clip11  from '../downloads/clip11.mp4';
import clip12  from '../downloads/clip12.mp4';
import clip13  from '../downloads/clip13.mp4';
import clip14  from '../downloads/clip14.mp4';
import clip15  from '../downloads/clip15.mp4';
import clip16  from '../downloads/clip16.mp4';
import clip17  from '../downloads/clip17.mp4';
import clip18  from '../downloads/clip18.mp4';
import clip19  from '../downloads/clip19.mp4';
import clip20  from '../downloads/clip20.mp4';

import { getVideoMetadata } from "@remotion/media-utils";


export const MyVideo: React.FC = () => {
	const [handle] = useState(() => delayRender());
  const [duration1, setDuration1] = useState(1);
  const [duration2, setDuration2] = useState(1);

	useEffect(() => {
		getVideoMetadata(clip1).then(({ durationInSeconds }) => {
			setDuration1(Math.round(durationInSeconds * 30));
			continueRender(handle);
		})
		.catch((err) => {
			console.log(`Error fetching metadata: ${err}`);
		});
		getVideoMetadata(clip2).then(({ durationInSeconds }) => {
			setDuration2(Math.round(durationInSeconds * 30));
			continueRender(handle);
		})
		.catch((err) => {
			console.log(`Error fetching metadata: ${err}`);
		});
}, [handle]);


	return (
		 <>
			<Sequence from={0} durationInFrames={duration1}>
				<Clip clip={clip1} />
			</Sequence>
			<Sequence from={duration1} durationInFrames={duration2}>
				<Clip clip={clip2} />
			</Sequence>
		</>
	);
};
