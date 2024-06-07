const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
// TODO * Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


postSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
