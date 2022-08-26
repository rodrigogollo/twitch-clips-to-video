
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
const slideIn =  interpolate(frame, [60, 150], [-600, 0],  {
  extrapolateRight: "clamp",
});
const opacity =  interpolate(frame, [300, 350], [1, 0]);

  return (
    <div className="clip-info" style={{
      opacity: opacity,
      left: slideIn
    }}>
    <h2>{title} - <span>{creator}</span> ({date})</h2>
      {/* <Audio
        src={audio}
        startFrom={10800} // if composition is 30fps, then it will start at 15s
        endAt={11200} // if composition is 30fps, then it will end at 18s
        volume={0.2}
      /> */}
    </div>
    
  );
};
