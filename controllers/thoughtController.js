const { Thought, User } = require('../models');
const dayjs = require('dayjs')

module.exports = {
 
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
     // console.log("Data: ", thoughts);
      // const formattedThoughts = thoughts.map(thought => {
      //   // console.log("Thought: ", thought._doc);
      //   return {...thought._doc, createdAt: dayjs(thought.createdAt).format('M/D/YYYY h:mm A') }
      // })
     // console.log("Formated: ", formattedThoughts);
      // res.json(formattedThoughts);
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Gets a single thought using the findOneAndUpdate method.
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      // const formattedThought = thoughts.map(thought => {
      //   return {...thought._doc, createdAt: dayjs(thought.createdAt).format('M/D/YYYY h:mm A') }
      // })
      // res.json(formattedThought);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Creates a new thought.
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created the thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Updates and thought using the findOneAndUpdate method. 
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Deletes an thought from the database. Looks for an app by ID.
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created but no user with this id!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Adds a reaction to an thought. 
  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
// console.log("reaction: ", reaction)
      if (!reaction) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      // const formattedReaction = reactions.map(reaction => {
      //   return {...reactions._doc, createdAt: dayjs(reactions.createdAt).format('M/D/YYYY h:mm A') }
      // })
      // res.json(formattedReaction);
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove thought reaction. 
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
