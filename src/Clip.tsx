import { AbsoluteFill, Video } from "remotion";
import { Broadcaster } from "./Broadcaster";

export const Clip = (props: any) => {
	return (
    <AbsoluteFill>
      <Broadcaster broadcaster={'gamesdonequick'} />
      <Video src={props.clip} volume={0.5} />
    </AbsoluteFill>
	);
};