import { ClipInfo } from "./ClipInfo";
import { Series } from "remotion";
import { Clip } from "./Clip";

export const ClipsList: React.FC <{clipList: any, transition: number }>= ({clipList, transition}) => {

  const listItems: any = clipList.map((clip:any, i:number, origin:any) => {
    let duration = clip.duration;
    if(i > 0) duration += origin.slice(0, i).reduce((acc:number, obj:any) => (acc + obj.duration), 0) + transition * (i+1)
    return (
      <div key={clip.id + "_div"}>
        <Series.Sequence  key={clip.id + "_seq_info"} durationInFrames={transition}>
          <ClipInfo key={clip.id + "_info"} broadcaster={'xqc'} title={'funny title'} date={'2022-01-01'} creator={'roddygood'}/>
        </Series.Sequence>
        
        {/* <Series.Sequence key={clip.id + "_seq_clip"} durationInFrames={clip.duration}>
          <Clip key={clip.id} clip={clip.clipName} />
        </Series.Sequence> */}
      </ div>
    )
  })
  
  return (
    <>
      <h1 style={{color: 'pink'}}>hello clips list</h1>
    </>
  )

  

};