const validator = require('validator');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  userid: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [2, 'Title must be at least two characters']
  },
  content: {
    type: String,
    required: [true, 'There must be content in the post'],
    minlength: [2, 'The content must be at least two characters']
  },
  url: {
    type: String,
    required: [true, 'You need an image for the post']
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);