const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  company_link: {
    type: String,
    required: false,
  },
  company_logo: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  job_link: {
    type: String,
    required: true,
  },
  is_remote: {
    type: Boolean,
    required: false
  },
  easy_apply: {
    type: Boolean,
    required: false
  },
  job_board: {
    type: String,
    required: false
  },
  employment_details: {
    type: String,
    required: false,
  },
  employment_pay: {
    type: String,
    required: false,
  },
  description_list: {
    type: String,
    required: true,
  },
  employment_skills: {
    type: String,
    required: false,
  },
  date_posted: {
    type: String,
    required: true,
  },
  date_updated: {
    type: String,
    required: false,
  },
  scraped_at: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Job", JobSchema, "jobs");
