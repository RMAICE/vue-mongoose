const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

let memberSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 2
  },
  company_id: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

memberSchema.plugin(mongoosePaginate);

let Member = mongoose.model("Member", memberSchema);

module.exports = Member;
