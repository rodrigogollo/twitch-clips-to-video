
import { interpolate, useCurrentFrame, useVideoConfig, Audio } from "remotion";
import audio from "../clip.mp3";
import './ClipInfo.css';

export const ClipInfo: React.FC<{
  broadcaster: string,
  title: string,
  date: string,
  creator: string
}> = ({broadcaster, title, date, creator}) => {
 
const frame = useCurrentFrame();
const { durationInFrames } = useVideoConfig();
const opacity = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0])

	return (
    <div className="clip-info" style={{
      opacity: opacity
    }}>
      <h1>{broadcaster}: "{title}"</h1>
      <h2>Created by: {creator}</h2>
      <h2>{date}</h2>
      <Audio
        src={audio}
        startFrom={5400} // if composition is 30fps, then it will start at 15s
        endAt={5600} // if composition is 30fps, then it will end at 18s
        volume={0.4}
      />
    </div>
    
  );
};
