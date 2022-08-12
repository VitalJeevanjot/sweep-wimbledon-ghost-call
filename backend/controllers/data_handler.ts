import { RequestHandler } from 'express'
export const get_feedbacks: RequestHandler = (req, res, next) => {
  res.status(200).send("Yo HOOO!")
}