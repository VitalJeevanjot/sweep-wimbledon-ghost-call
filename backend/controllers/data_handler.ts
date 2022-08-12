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

  try {
    await store(req.body.user_name, req.body.feedback_body, req.body.feedback_id)
    return res.status(200).send({saved: "Feedback Posted!"});

  } catch(e) {
    console.log(e)
    return res.status(500).send();
  }
}

export const add_upvote: RequestHandler = async (req, res, next) => {

  try {
    const get_current_votes: any = await Feedbacks.findOne({
      attributes: ['feedback_upvotes'],
      where: {
        feedback_id: req.body.feedback_id
      }
    })
    var new_upvotes = get_current_votes.dataValues.feedback_upvotes + 1
    await Feedbacks.update(
      {feedback_upvotes: new_upvotes}, 
      {
        where: {
          feedback_id: req.body.feedback_id
        }
      }
    )

    return res.status(200).send({upvotes_now: new_upvotes});

  } catch(e) {
    console.log(e)
    return res.status(500).send();
  }
}


async function store(user_name: String, feedback_body: String, feedback_id: String) {
  await Feedbacks.create({
    user_posted_feedback: user_name,
    the_feedback: feedback_body,
    time_posted_feedback: Date.now().toString(),
    feedback_upvotes: 0,
    feedback_id: crypto.randomBytes(20).toString("hex"),
    feedback_ref: feedback_id
  });
}

// static submissions

async function static_store(obj: Object) {
  await Feedbacks.create({
    ...obj
  });
}

async function initDB() {
  await Feedbacks.sync({ force: true });
  let ref1 = crypto.randomBytes(20).toString("hex")
  const first_entries = [
    {
      user_posted_feedback: "Vital",
      the_feedback: "I must say that this tutorial is too short to be considered knowledgeable.",
      time_posted_feedback: Date.now().toString(),
      feedback_upvotes: 12,
      feedback_id: crypto.randomBytes(20).toString("hex"),
      feedback_ref: "null"
    },
    {
      user_posted_feedback: "Victor",
      the_feedback: "You should respect the Author. Short thing doesn't means less useful at all.",
      time_posted_feedback:  (Date.now() + 1).toString(),
      feedback_upvotes: 71,
      feedback_id: "afkbe5n32b4b1234b12",
      feedback_ref: ref1
    },
    {
      user_posted_feedback: "Vital",
      the_feedback: "There is something I didn't told you before Victor. I am the Author!!!.",
      time_posted_feedback:  (Date.now() + 2).toString(),
      feedback_upvotes: 172,
      feedback_id: crypto.randomBytes(20).toString("hex"),
      feedback_ref: ref1
    },
    {
      user_posted_feedback: "Victor",
      the_feedback: "Nice parle........",
      time_posted_feedback:  (Date.now() + 3).toString(),
      feedback_upvotes: 96,
      feedback_id: crypto.randomBytes(20).toString("hex"),
      feedback_ref: ref1
    },
    {
      user_posted_feedback: "Jeevanjot",
      the_feedback: "Nice TLDR, Easier to follow. I will add it into my newspaper (if i have one which is).",
      time_posted_feedback:  (Date.now() + 4).toString(),
      feedback_upvotes: 8,
      feedback_id: crypto.randomBytes(20).toString("hex"),
      feedback_ref: "null"
    },
  ]

  for (let index = 0; index < first_entries.length; index++) {
    const element = first_entries[index];
    static_store(element)
  }
}
initDB()
