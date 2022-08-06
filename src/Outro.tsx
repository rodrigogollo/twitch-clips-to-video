import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { Audio, interpolate, useCurrentFrame  } from "remotion";
import audio from "../outro.mp3";

import './Outro.css';

export const Outro = () => {
  const frame = useCurrentFrame();

	return (
    <div className='outro'>
      <h1>TWITCH DAILY CLIPS
        <FontAwesomeIcon className="icon" icon={faTwitch} /> 
      </h1>
      <div className='boxes'>
        <div className='box1'></div>
        <div className='circle'></div>
        <div className='box2'></div>
      </div>
      <h1>Thanks for Watching</h1>
      <h1>Like {'&'} Subscribe</h1>
      <Audio
        src={audio}
        startFrom={1110*2} // if composition is 30fps, then it will start at 15s
        endAt={1380*2} // if composition is 30fps, then it will end at 18s
        volume={interpolate(frame, [0, 60], [0, 0.05], {
          extrapolateLeft: "clamp",
        })}
      />
    </div>
  );
};
