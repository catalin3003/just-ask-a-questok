const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors()) // Enable CORS for all routes
app.use(express.json()) // Parse JSON bodies

let videos = [
  {
    id: '1',
    uri: 'https://media.publit.io/file/h_720/Production/84/VideoAnswers/AaXXPDyt/JAAQ-RM-AX-001.mp4.mp4',
    likes: 4,
  },
  {
    id: '2',
    uri: 'https://media.publit.io/file/h_720/Production/84/VideoAnswers/jeZ26hu9/JAAQ-RM-AX-002.mp4.mp4',
    likes: 3,
  },
  {
    id: '3',
    uri: 'https://media.publit.io/file/h_720/Production/84/VideoAnswers/tBmQgLTl/JAAQ-RM-AX-003.mp4.mp4',
    likes: 2,
  },
  {
    id: '4',
    uri: 'https://media.publit.io/file/h_720/Production/84/VideoAnswers/qg1d94dG/JAAQ-RM-AX-004.mp4.mp4',
    likes: 1,
  },
  {
    id: '5',
    uri: 'https://media.publit.io/file/h_720/Production/84/VideoAnswers/pmlh50Gk/JAAQ-RM-AX-008.mp4.mp4',
    likes: 0,
  },
]

// Get all videos
app.get('/videos', (req, res) => {
  res.json(videos)
})

// Increment likes for a video
app.post('/videos/:id/like', (req, res) => {
  const { id } = req.params
  videos = videos.map((video) => {
    if (video.id === id) {
      return { ...video, likes: video.likes + 1 }
    }
    return video
  })
  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
