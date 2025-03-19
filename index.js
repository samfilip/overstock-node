import express from 'express'
import { reverbRouter } from './routes/reverb.js'

const app = express()

app.get('/', (req, res) => {
  res.send('I still got it')
})

app.get('/health', (req, res) => {
  res.send('hey buddy, I\'m here')
})

app.use(express.json())

app.use('/api', reverbRouter())

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});