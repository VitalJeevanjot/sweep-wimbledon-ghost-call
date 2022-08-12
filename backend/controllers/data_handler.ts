import { RequestHandler } from 'express'
import { Sequelize, Model, DataTypes } from 'sequelize';
import crypto from 'crypto';

const sequelize = new Sequelize('sqlite::memory:');
const Feedbacks = sequelize.define('Feedbacks', {
  user_posted_feedback: DataTypes.STRING,
  the_feedback: DataTypes.STRING,
  time_posted_feedback: DataTypes.STRING,
  feedback_upvotes: DataTypes.INTEGER,
  feedback_id: DataTypes.STRING,
  feedback_ref: DataTypes.STRING
});
// Feedbacks.sync({ force: true });

export const get_feedbacks: RequestHandler = async (req, res, next) => {
  try {
    const feedbacks = await Feedbacks.findAll();
    return res.status(200).send({status: 'success', response: feedbacks});
  } catch(e) {
    console.log(e)
    return res.status(500).send();

  }
}

export const post_feedback: RequestHandler = async (req, res, next) => {

  console.log(req.body);

  try {
    await Feedbacks.create({
      user_posted_feedback: req.body.user_name,
      the_feedback: req.body.feedback_body,
      time_posted_feedback: Date.now().toString(),
      feedback_upvotes: 0,
      feedback_id: crypto.randomBytes(20).toString("hex"),
      feedback_ref: req.body.feedback_id
    });
    return res.status(200).send({saved: "done"});

  } catch(e) {
    console.log(e)
    return res.status(500).send();
  }
}
