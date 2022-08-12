import express from 'express'
import * as handler from './controllers/data_handler'
const app = express()
const port = 3000

app.get('/get_feedbacks', handler.get_feedbacks)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})