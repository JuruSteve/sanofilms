import React from "react"
import Video from "../components/Video"
import { graphql } from "gatsby"

const AllVideos = ({ data }) => {
  const videoList = data.allVideo.edges

  return (
    <div className="container">
      <h4>Video List</h4>
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
        }
      }
    }
  }
`

export default AllVideos
