import { AbsoluteFill, Video, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Broadcaster } from "./Broadcaster";

export const Clip: React.FC<{clip: any}> = ({clip}) => {
  let source = require(`../downloads/${clip.video}`);
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // const opacityFadeInOut = interpolate(
  //   frame,
  //   [0, 10, durationInFrames - 20, durationInFrames], [0, 1, 1, 0]
  // );

	return (
    <AbsoluteFill style={{
      // opacity: opacityFadeInOut
    }}>
      <Broadcaster broadcaster={clip.data.broadcaster_name} />
      <Video src={source} volume={0.5} />
    </AbsoluteFill>
	);
};