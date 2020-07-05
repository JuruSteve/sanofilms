require("dotenv").config()
const path = require("path")
const nodeFetch = require("node-fetch")

exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/^\/video/)) {
    page.matchPath = "/video/*"
    actions.createPage(page)
  }
}

exports.createPages = async ({ actions }) => {
  const user = await getData("user")
  const totalVids = user.metadata.connections.videos.total

  //   Create pages to display videos
  const perPage = 6
  const totalPages = Math.ceil(user && totalVids && totalVids / perPage)
  Array.from({ length: totalPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? "/" : `/${i + 1}`,
      component: path.resolve(__dirname, "./src/templates/allVideos.js"),
      context: {
        user: {
          name: user.name,
          bio: user.bio,
          picture: user.pictures.sizes[2],
        },
        currentPage: i + 1,
        skip: i * perPage,
        limit: perPage,
      },
    })
  })

  // Create single item pages

  const videoList = await getData("videos")
  videoList &&
    videoList.length > 0 &&
    videoList.forEach(vid => {
      const slug = vid.name.trim().split(" ").join("-")
      const id = parseInt(vid.uri.split("/")[2])
      actions.createPage({
        path: `/video/${id}`,
        component: path.resolve(__dirname, "./src/templates/video.js"),
        context: { videoId: id },
      })
    })
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // getting list of videos
  const response = await nodeFetch(
    `${process.env.API_URL}/users/${process.env.USER_ID}/videos`,
    { headers: { Authorization: `bearer ${process.env.ACCESS_TOKEN}` } }
  )
  const { data } = await response.json()

  //   create video source nodes for the graphql data layer
  data.forEach(video => {
    const videoNode = {
      name: video.name,
      description: video.description,
      link: video.link,
      width: video.width,
      height: video.height,
      resource_key: video.resource_key,
      pictures: video.pictures,
      videoId: parseInt(video.uri.split("/")[2]),
    }
    const newNode = {
      ...videoNode,
      id: createNodeId(`video-${videoNode.resource_key}`),
      internal: {
        type: "Video",
        contentDigest: createContentDigest({
          videoNode,
        }),
      },
    }
    actions.createNode(newNode)
  })
}

async function getData(ctx) {
  if (ctx === "videos") {
    const response = await nodeFetch(
      `${process.env.API_URL}/users/${process.env.USER_ID}/videos`,
      { headers: { Authorization: `bearer ${process.env.ACCESS_TOKEN}` } }
    )
    const { data } = await response.json()
    return data
  } else if (ctx === "user") {
    const response = await nodeFetch(
      `${process.env.API_URL}/users/${process.env.USER_ID}`,
      { headers: { Authorization: `bearer ${process.env.ACCESS_TOKEN}` } }
    )
    const user = await response.json()
    return user
  } else {
    return []
  }
}
