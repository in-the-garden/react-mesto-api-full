const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => /^(http|https):\/\/[^ "]+$/g.test(link),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.String,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{ versionKey: false });

module.exports = mongoose.model('card', cardSchema);
