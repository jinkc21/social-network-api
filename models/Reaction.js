const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs')

// Schema to create User model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
// Used dayjs to format instead of getter method
      get: createdAt => dayjs(createdAt).format('M/D/YYYY h:mm A'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    // timestamps: true
  }
);

module.exports = reactionSchema;
