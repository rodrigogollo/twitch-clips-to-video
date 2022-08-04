import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import './Broadcaster.css'

  export const Broadcaster: React.FC <{broadcaster: any}>= ({broadcaster}) => {
	return (
    <div className="broadcaster">
      <FontAwesomeIcon className="icon" icon={faTwitch} />
      <h1>{broadcaster}</h1>
    </div>
	);
};