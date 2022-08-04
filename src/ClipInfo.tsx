
import { Audio } from "remotion";
import audio from "../clip.mp3";
import './ClipInfo.css';

export const ClipInfo: React.FC<{
  broadcaster: string,
  title: string,
  date: string,
  creator: string
}> = ({broadcaster, title, date, creator}) => {
	return (
    <div className="clip-info">
      <h1>{broadcaster} - {title}</h1>
      <h2>Created by: {creator}</h2>
      <p>{date}</p>
      <Audio
        src={audio}
        startFrom={480} // if composition is 30fps, then it will start at 15s
        endAt={600} // if composition is 30fps, then it will end at 18s
        volume={0.5}
      />
    </div>
    
  );
};
