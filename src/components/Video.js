import React from "react"
import { Link } from "gatsby"
import EmbeddedVideoPlayer from "./EmbeddedVideoPlayer"

const Video = ({ video }) => {
  return (
    // <Link to={`/video/${video.videoId}`}>
    <>
      <li>
        <p className="name">{video.name}</p>
        <p className="bio">{video.description}</p>
      </li>
      <div
        className="video"
        dangerouslySetInnerHTML={{
          __html: `${video.embed.html}`,
        }}
      ></div>
      {/* <EmbeddedVideoPlayer link={video.link} /> */}
    </>
  )
}
{
  /* </Link> */
}

export default Video
