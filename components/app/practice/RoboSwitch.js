import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faRobot
} from "@fortawesome/free-solid-svg-icons";
import {    
    CustomInput,
  } from "reactstrap";

const RoboSwitch = React.memo((props) => {
  return  <div>
    <CustomInput
      type="switch"
      id="textToSpeechSwitch"      
      onChange={props.handleSpeechToTextToggle}
      checked={props.textToSpeechMode}
    >
      <FontAwesomeIcon icon={faRobot} />
    </CustomInput>
  </div>;
});

export default RoboSwitch;
