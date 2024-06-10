const { Schema, Types } = require('mongoose');
const timeStamp = require("../utils/timestamp");

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
      get: (timestamp) => timeStamp(timestamp),
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
