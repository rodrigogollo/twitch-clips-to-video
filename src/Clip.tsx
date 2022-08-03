import { AbsoluteFill, Video } from "remotion";

export const Clip = (props: any) => {
	return (
    <AbsoluteFill>
      <Video src={props.clip} volume={0.5} />
    </AbsoluteFill>
	);
};