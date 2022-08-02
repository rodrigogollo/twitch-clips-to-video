import { Composition } from "remotion";
import { useState } from "react";
import { parse } from "dotenv";
import { getVideoMetadata } from "@remotion/media-utils";

import { MyVideo } from "./MyVideo";
import {clips as clipList} from '../downloads/clips.json';
import { useEffect } from "react";

export const RemotionVideo: React.FC = () => {
  
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    async function getTotalDuration(){
      let totalDuration = 1;
      for(const [key, value] of Object.entries(clipList)){
        let currentVideo = require('../downloads/' + value)
        let duration = getVideoMetadata(currentVideo).then(({ durationInSeconds }) => (Math.round(durationInSeconds * 30)))
        totalDuration += await duration
      }
      return totalDuration
    }
    getTotalDuration().then(result => {
      setDuration(result);
    })
  }, [duration])

  const Teste = () => {
    return (
      <h1>{duration}</h1>
    )
  }

  return (
		 <>
			<Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={duration}
        fps={30}
        width={1920}
        height={1080}
        //defaultProps={{ }}        
      />
		</>
	);
};
