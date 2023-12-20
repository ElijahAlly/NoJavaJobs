const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiceJobSchema = new Schema({
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
        required: false,
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
        required: false,
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
});

module.exports = DiceJob = mongoose.model('DiceJob', DiceJobSchema, 'dice_jobs');
