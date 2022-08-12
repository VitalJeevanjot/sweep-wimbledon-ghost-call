import express from 'express'
import * as handler from './controllers/data_handler'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
const port = 3000

app.get('/get_feedbacks', handler.get_feedbacks)
app.post('/post_feedback', handler.post_feedback)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})