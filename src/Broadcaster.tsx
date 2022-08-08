import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { interpolate, useCurrentFrame } from "remotion";
import './Broadcaster.css'

export const Broadcaster: React.FC <{broadcaster: any}>= ({broadcaster}) => {
  const frame = useCurrentFrame();
  const slideIn =  interpolate(frame, [60, 200], [-600, 0],  {
    extrapolateRight: "clamp",
  });
  const opacity =  interpolate(frame, [300, 350], [1, 0]);

	return (
    <div className="broadcaster" style={{
      opacity: opacity,
      left: slideIn
    }}>
      <FontAwesomeIcon className="icon" icon={faTwitch} />
      <h1>{broadcaster}</h1>
    </div>
	);
};