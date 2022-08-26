import { AbsoluteFill, Video, interpolate, useCurrentFrame, useVideoConfig, Internals } from "remotion";
import { Broadcaster } from "./Broadcaster";
import { ClipInfo } from "./ClipInfo";
import { useContext } from 'react';

export const Clip: React.FC<{clip: any}> = ({clip}) => {
  
  let source = require(`../downloads/${clip.video}`);
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  console.log('Internals', JSON.stringify(useContext(Internals.SequenceContext)))
  
  const internals = useContext(Internals.SequenceContext)
  const opacityFadeInOut = interpolate(
    frame,
    [0, 10, durationInFrames - 20, durationInFrames], [0, 1, 1, 0]
  );

	return (
    <>
      <AbsoluteFill style={{ opacity: opacityFadeInOut, justifyContent: 'center', margin: 'auto'}}>
        <Broadcaster broadcaster={clip.data.broadcaster_name} />
        <ClipInfo broadcaster={clip.data.broadcaster_name} title={clip.data.title} date={clip.data.created_at.substring(0, 10)} creator={clip.data.creator_name}/>
        <Video src={source} volume={0.5} />
      </AbsoluteFill>
    </>
	);
};