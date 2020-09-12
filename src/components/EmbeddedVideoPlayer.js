import React from "react"
import { VideoContainer } from "../elements"

const EmbeddedVideoPlayer = ({ link }) => {
  return (
    <VideoContainer>
      <div className="player">
        <video src={`${link}`} className="player-video viewer"></video>
        <div className="player-controls">
          <div className="progress">
            <div className="progress-filled"></div>
          </div>
          <button className="player-button toggle" title="Toggle Play">
            &#9658;
          </button>
          <input
            type="range"
            name="volume"
            min="0"
            max="1"
            step="0.05"
            defaultValue="1"
            className="player-slider"
          />
          <input
            type="range"
            name="playbackRate"
            min="0.5"
            max="2"
            step="0.1"
            defaultValue="1"
            className="player-slider"
          />
          <button data-skip="-10" className="player-button">
            &larr; 10s
          </button>
          <button data-skip="25" className="player-button">
            &rarr; 25s
          </button>
        </div>
      </div>
    </VideoContainer>
  )
}

export default EmbeddedVideoPlayer
