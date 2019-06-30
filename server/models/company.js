const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

let companySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Name is required in company"]
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

companySchema.plugin(mongoosePaginate);

let Company = mongoose.model("Company", companySchema);

module.exports = Company;
