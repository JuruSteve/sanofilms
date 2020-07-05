import React from "react"
import { Link } from "gatsby"

const Video = ({ video }) => {
  return (
    <Link to={`/video/${video.videoId}`}>
      <li>
        <p className="name">{video.name}</p>
        <p className="bio">{video.description}</p>
      </li>
    </Link>
  )
}

export default Video
