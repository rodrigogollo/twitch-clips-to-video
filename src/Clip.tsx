import { AbsoluteFill, Video, interpolate, useCurrentFrame, useVideoConfig  } from "remotion";
import { Broadcaster } from "./Broadcaster";

export const Clip: React.FC<{clip: any}> = ({clip}) => {
  let source = require(`../downloads/${clip.video}`);
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacityFadeIn = interpolate(frame, [0, 20], [0, 1]);

	return (
    <AbsoluteFill>
      <Broadcaster broadcaster={clip.data.broadcaster_name} />
      <Video src={source} volume={0.5} />
    </AbsoluteFill>
	);
};