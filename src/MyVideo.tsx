import { useCurrentFrame, useVideoConfig, Sequence, continueRender, delayRender } from "remotion";
import { useEffect, useCallback, useState } from "react";

import { ClipsList } from "./ClipsList";

export const MyVideo: React.FC = () => {
return (
		<>
			<ClipsList />
		</>
	);
};
