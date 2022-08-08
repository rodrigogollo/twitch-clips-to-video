import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { Audio, interpolate, interpolateColors, useCurrentFrame  } from "remotion";
import audio from "../outro.mp3";

import './Outro.css';

export const Outro = () => {
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
        opacity: opacity
      }}>TWITCH DAILY CLIPS
        <FontAwesomeIcon className="icon" icon={faTwitch} /> 
      </h1>
      <div className='boxes' style={{
        opacity: opacityBoxes
      }}>
        <div className='box1'></div>
        <div className='circle'></div>
        <div className='box2'></div>
      </div>
      <h1 style={{
        opacity: opacity
      }}>Thanks for Watching</h1>
      <h1 style={{
        opacity: opacity
      }}>Like {'&'} Subscribe</h1>
      <Audio
        src={audio}
        startFrom={2220} // if composition is 30fps, then it will start at 15s
        endAt={2760} // if composition is 30fps, then it will end at 18s
        volume={audioVolume}
      />
    </div>
  );
};
