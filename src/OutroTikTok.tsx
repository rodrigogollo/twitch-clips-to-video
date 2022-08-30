import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { Audio, interpolate, interpolateColors, useCurrentFrame  } from "remotion";
import audio from "../outro.mp3";

import './OutroTikTok.css';

export const OutroTikTok = () => {
  const frame = useCurrentFrame();
  const opacity =  interpolate(frame, [60, 180], [0, 1]);
  const opacityBoxes =  interpolate(frame, [180, 220], [0, 1]);

  const color = interpolateColors(
    frame,
    [0, 150],
    ["rgb(145, 70, 255)", "rgb(61, 35, 110)"]
  );

  const audioVolume = interpolate(frame, [0, 60], [0, 0.05], {
    extrapolateLeft: "clamp",
  })

	return (
    <div className='outro' style={{
      backgroundColor: color
    }}>
      <h1 style={{
        opacity: opacity,
        marginBottom: '30px'
      }}>TWITCH DAILY CLIPS
        <FontAwesomeIcon className="icon" icon={faTwitch} /> 
      </h1>
      <h1 style={{
        opacity: opacity,
      }}>Full Length Video</h1>
      <h1 style={{
        opacity: opacity
      }}>in the description</h1>
      <Audio
        src={audio}
        startFrom={2220} // if composition is 30fps, then it will start at 15s
        endAt={2760} // if composition is 30fps, then it will end at 18s
        volume={0.3}
      />
    </div>
  );
};
