import express from 'express'
import { reverbRouter } from './routes/reverb.js'

const app = express()

app.get('/', (req, res) => {
  res.send('I still got it')
})

app.get('/health', (req, res) => {
  res.send('hey buddy, I\'m here')
})

app.use('/api', reverbRouter())

app.listen(3000, () => {
  console.log('Server running on port 3000')
})