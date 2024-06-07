const { Schema, Types } = require('mongoose');

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
// TODO * Use a getter method to format the timestamp on query
    //  get: timestamp => dateFormat(timestamp)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    timestamps: true
  }
);

module.exports = reactionSchema;
