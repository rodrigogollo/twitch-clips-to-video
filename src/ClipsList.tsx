import { useCurrentFrame, useVideoConfig, Sequence, continueRender, delayRender } from "remotion";
import { getVideoMetadata } from "@remotion/media-utils";
import { Clip } from "./Clip";
import { ClipInfo } from "./ClipInfo";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { useEffect, useState } from "react";

import {clips as clipList} from '../downloads/clips.json';

export const ClipsList: React.FC <{
  clipList: any
}>= ({clipList}) => {

  const clip1 = require(__dirname + '/../downloads/' + clipList.clip1)
  const [clipListArray, setClipListArray] = useState([{
    id: '',
    clipName: '',
    duration: 1
  }])
  const transition = 100;

	useEffect(() => {

    async function createClipListArray() {
      let clipArray = [];

      for(const [key, value] of Object.entries(clipList)){
        let currentClipObj = {}
        let currentVideo = require('../downloads/' + value)
        let duration = await getVideoMetadata(currentVideo).then(({ durationInSeconds }) => (Math.round(durationInSeconds * 30)))
        clipArray.push({
          id: [key],
          clipName: currentVideo,
          duration: duration,
        })
      }
      return clipArray
    }
    createClipListArray().then(result => setClipListArray(result))
  }, [clipListArray])
    
	return (
    <>
      <Sequence from={0} durationInFrames={transition}>
        <Intro />
      </Sequence>
    {
      clipListArray.map((clip, i, origin) => {
        let duration = clip.duration;
        let transitionStart = transition;
        if(i > 0) {
          duration += origin.slice(0, i).reduce((acc, obj) => (acc + obj.duration), 0) + transition * (i+1)
          transitionStart += origin.slice(0, i).reduce((acc, obj) => (acc + obj.duration), 0) + transition * i;
        }
        return (
          <div key={clip.id + "_div"}>
            <Sequence  key={clip.id + "_seq_info"} from={transitionStart} durationInFrames={transition + 5}>
              <ClipInfo key={clip.id + "_info"}/>
            </Sequence>
            
            <Sequence key={clip.id + "_seq_clip"} from={transitionStart + transition} durationInFrames={clip.duration}>
              <Clip  key={clip.id} clip={clip.clipName} />
            </Sequence> 
          </ div>
        )
      })
    }
    </>
	);
};
