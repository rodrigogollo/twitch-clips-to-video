import { AbsoluteFill, Video } from "remotion";
import { Broadcaster } from "./Broadcaster";

export const Clip = (props: any) => {
  let source = require(`../downloads/${props.clip}`);
	return (
    <AbsoluteFill>
      <Broadcaster broadcaster={'gamesdonequick'} />
      <Video src={source} volume={0.5} />
    </AbsoluteFill>
	);
};