
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";

import { Audio, useCurrentFrame, useVideoConfig, interpolate, spring, interpolateColors } from "remotion";
import audio from "../intro.mp3";
import './Intro.css';

export const Intro = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const opacity =  interpolate(frame, [20, 100], [0, 1]);

  const scale = spring({
    fps,
    from: 0,
    to: 1,
    frame,
    durationInFrames: 500
  });

  const color = interpolateColors(
    frame,
    [0, 150],
    ["rgb(100, 65, 165)", "rgb(145, 70, 255)"]
  ); 
   
	return (
    <div className="intro" style={{
      backgroundColor: color
    }}>
      <h1 style={{
        opacity: opacity
      }}>Twitch Daily Clips</h1>
      <FontAwesomeIcon className="icon" icon={faTwitch} style={{transform: `scale(${scale})`}}/>
      
      <Audio
        src={audio}
        startFrom={785*2} // if composition is 30fps, then it will start at 15s
        endAt={940*2} // if composition is 30fps, then it will end at 18s
        volume={0.2}
      />
    </div>
  );
};
