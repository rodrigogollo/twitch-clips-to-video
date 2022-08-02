import { Composition  } from "remotion";
import { MyVideo } from "./MyVideo";

export const RemotionVideo: React.FC = () => {
	return (
		 <>
			<Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={10000}
        fps={30}
        width={1920}
        height={1080}
        // Optionally, you can define props that get passed to the component
        defaultProps={{ hello: "world" }}
      />
		</>
	);
};
