import { AbsoluteFill, Video } from "remotion";

export const Clip = (props: any) => {
	return (
    <AbsoluteFill>
      <Video src={props.clip} />
    </AbsoluteFill>
	);
};