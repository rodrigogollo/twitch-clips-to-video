
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";

import { Audio } from "remotion";
import audio from "../intro.mp3";
import './Intro.css';

export const Intro = () => {
	return (
    <div className="intro">
      <h1>Twitch Daily Clips</h1>
      <FontAwesomeIcon className="icon" icon={faTwitch} />
      
      <Audio
        src={audio}
        startFrom={785} // if composition is 30fps, then it will start at 15s
        endAt={940} // if composition is 30fps, then it will end at 18s
        volume={0.2}
      />
    </div>
  );
};
