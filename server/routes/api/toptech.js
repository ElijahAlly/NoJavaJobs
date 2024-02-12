const express = require("express");
const router = express.Router();
const TopTechJob = require("../../models/TopTechJob");

// get all toptech jobs
// needs...
// in body: nothing
// in params: nothing
router.get("/", function (req, res) {
    // console.log('id passed', req.params.id);
    TopTechJob.find()
        .then((jobs) => {
            // console.log('toptech job', jobs);
            return res.json(jobs);
        })
        .catch(() => {
            return res
                .status(404)
                .json({ nojobsFound: "No toptech jobs found with that ID" });
        });
});

// get toptech job by id
// needs...
// in body: nothing
// in params: job_id
router.get("/:id", function (req, res) {
    // console.log('id passed', req.params.id);
    TopTechJob.findById(req.params.id)
        .then((job) => {
            // console.log('toptech job', job);
            return res.json(job);
        })
        .catch(() => {
            return res
                .status(404)
                .json({ nojobFound: "No toptech job found with that ID" });
        });
});

module.exports = router;
