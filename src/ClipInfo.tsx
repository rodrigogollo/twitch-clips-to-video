
import { Audio } from "remotion";
import audio from "../intro.mp3";

export const ClipInfo = () => {
	return (
    <div style={{
      display: 'flex',
      textAlign: 'center',
      alignContent: 'center',
      backgroundColor: 'purple',
      width: '100%',
      height: '100%'
      }} >
      <h1 style={{
        color: 'white',
      }}>CLIP BROADCASTER - CLIP NAME</h1>
      <Audio
        src={audio}
        startFrom={480} // if composition is 30fps, then it will start at 15s
        endAt={600} // if composition is 30fps, then it will end at 18s
        volume={0.5}
      />
    </div>
    
  );
};
