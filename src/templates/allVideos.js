import React from "react"
import Video from "../components/Video"
import { graphql } from "gatsby"

const AllVideos = ({ data }) => {
  const videoList = data.allVideo.edges.filter(
    vid => vid.node.embed.html !== null
  )
  let avgVidLength = data.allVideo.edges.reduce((a, b) => {
    return a + b.node.duration
  }, 0)
  // console.log(data.allVideo.edges)
  console.log(avgVidLength)
  return (
    <div className="container">
      <h4>Video List</h4>
      <video src="https://player.vimeo.com/video/18908888"></video>
      <ul>
        {videoList.map((vid, i) => {
          return <Video key={i} video={vid.node} />
        })}
      </ul>
    </div>
  )
}

export const query = graphql`
  query {
    allVideo {
      edges {
        node {
          videoId
          name
          description
          link
          duration
          pictures {
            sizes {
              link_with_play_button
              height
              width
              link
            }
          }
          id
          height
          width
          embed {
            html
          }
        }
      }
    }
  }
`

export default AllVideos
