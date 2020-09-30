import React, { useState } from "react";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const Audio = React.memo((props) => {
  const handleAudioClick = () => {
      let audioElement = document.getElementById(`${props.identifier}-audio`);
      audioElement.play();
  };

  if (props.audioSource && props.textToSpeechMode) {
    return (
      <>
        <audio id={`${props.identifier}-audio`} src={props.audioSource} />
        <Button
          color="primary"
          size="sm"
          className="btn-pill mr-1 mb-1"
          onClick={handleAudioClick}
        >
          <FontAwesomeIcon icon={faVolumeUp} />
        </Button>
      </>
    );
  } else {
    return <></>;
  }
});

export default Audio;
