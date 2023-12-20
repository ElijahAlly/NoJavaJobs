const express = require("express");
const router = express.Router();
const DiceJob = require("../../models/DiceJob");

// get all dice jobs
// needs...
// in body: nothing
// in params: nothing
router.get('/', function (req, res) {
    // console.log('id passed', req.params.id);
    DiceJob.find()
        .then((jobs) => { 
            // console.log('dice job', jobs);
            return res.json(jobs); 
        })
        .catch((err) => {
            return res.status(404).json({ nojobsFound: 'No dice jobs found with that ID' });
        });
});

// get dice job by id
// needs...
// in body: nothing
// in params: job_id
router.get('/:id', function (req, res) {
    // console.log('id passed', req.params.id);
    DiceJob.findById(req.params.id)
        .then((job) => { 
            // console.log('dice job', job);
            return res.json(job); 
        })
        .catch((err) => {
            return res.status(404).json({ nojobFound: 'No dice job found with that ID' });
        });
});

module.exports = router;
