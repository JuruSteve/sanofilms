import React from "react"
import { graphql } from "gatsby"

const SingleVideo = ({ data }) => {
  return (
    <div className="single-vid-container">
      <h3>Single Vid Container</h3>
      <h1>{data.video.name}</h1>
    </div>
  )
}

export const query = graphql`
  query singleVideo($videoId: Int!) {
    video(videoId: { eq: $videoId }) {
      name
      description
      videoId
      link
      pictures {
        sizes {
          height
          link
          link_with_play_button
          width
        }
      }
    }
  }
`

export default SingleVideo
