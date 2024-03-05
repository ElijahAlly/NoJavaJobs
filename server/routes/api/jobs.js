const express = require("express");
const router = express.Router();
const Job = require("../../models/Job");

// get all jobs
// needs...
// in body: nothing
// in params: nothing
router.get("/", function (req, res) {
  // console.log('id passed', req.params.id);
  Job.find()
    .then((jobs) => {
      // console.log('job', jobs);
      return res.json(jobs);
    })
    .catch(() => {
      return res
        .status(404)
        .json({ nojobsFound: "No jobs found with that ID" });
    });
});

// get job by id
// needs...
// in body: nothing
// in params: job_id
router.get("/:id", function (req, res) {
  // console.log('id passed', req.params.id);
  Job.findById(req.params.id)
    .then((job) => {
      // console.log('job', job);
      return res.json(job);
    })
    .catch(() => {
      return res
        .status(404)
        .json({ nojobFound: "No job found with that ID" });
    });
});

module.exports = router;
