import { ClipInfo } from "./ClipInfo";
import { Sequence } from "remotion";
import { Clip } from "./Clip";

export const ClipsList: React.FC <{clipList: any, transition: number }>= ({clipList, transition}) => {

  return (
    <>
    { clipList ? 
          clipList.map((clip:any, i:number, origin:any) => {
            let duration = transition
            let transitionFrom = transition;
            if(i > 0) {
              duration += Math.round(origin.slice(0, i).reduce((acc:number, obj:any) => (acc + obj.data.duration), 0) * 30); + transition * (i+1)
              transitionFrom += Math.round(origin.slice(0, i).reduce((acc:number, obj:any) => (acc + obj.data.duration), 0) * 30); + transition * (i+1);
            }
            return (
              <div key={clip.data.id + "_div"}>
                <Sequence key={clip.data.id + "_seq_info"} from={transitionFrom}  durationInFrames={transition}>
                  <ClipInfo key={clip.data.id + "_info"} broadcaster={clip.data.broadcaster_name} title={clip.data.title} date={clip.data.created_at.substring(0, 10)} creator={clip.data.creator_name}/>
                </Sequence>  
                <Sequence key={clip.data.id + "_seq_clip"} from={duration + transitionFrom} durationInFrames={Math.round(clip.data.duration * 30)}>
                  <Clip key={clip.data.id} clip={clip.video} />
                </Sequence>
              </div>
            ) 
        }
      ) : null
    }
    </>
  )
};