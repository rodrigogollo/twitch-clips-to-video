import { Video, interpolate, useCurrentFrame } from "remotion";
import './Subscribe.css'
const source = require(__dirname + '/../out/augh2.mp4');

export const Subscribe = () => {
  const frame = useCurrentFrame();
  const opacity =  interpolate(frame, [200, 201], [0, 1]);
  const opacity2 =  interpolate(frame, [300, 301], [0, 1]);

	return (
    <div className="subscribe">
      <h1 id="header1" style={{opacity: opacity}}>SUBSCRIBE</h1>
      <Video src={source} volume={0.5} />
      <h1 id="header2" style={{opacity: opacity2}}>SUBSCRIBE</h1>
    </div>
	);
};