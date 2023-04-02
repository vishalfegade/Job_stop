let express = require("express");
let router = express.Router();

// const { default: mongoose } = require("mongoose");

// module
let Job = require("../models/jobs-database");
let Notification = require("../models/notifications-database");

// middleware, destructuring
let { isLoggedIn, isAdmin } = require('../middlewares/middlewares')

router.get("/", function (req, res) {
    // req.flash('success','Welcome to index jobs')
    res.render("home-page", { page: "home-page", 'success': 'Developer : Code With Pankaj' });
});

// REST - routes
// * index
router.get("/jobs", async (req, res) => {
    try {
        if (req.query.search && req.query.search.length > 0) {
            let regex = new RegExp(req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
            let foundJobs = await Job.find({ name: regex });
            res.render('jobs/all-jobs', { foundJobs, page: "all-jobs" });
        } else {
            // extract all the jobs from db
            let foundJobs = await Job.find({});
            res.render('jobs/all-jobs', { foundJobs, page: "all-jobs" });
        }
    } catch (error) {
        res.send("error while extracting all jobs", error);
    }
});

// * new
router.get("/jobs/new", isLoggedIn, isAdmin, (req, res) => {
    res.render("jobs/new-job", { page: "all-jobs" });
});

// * create
router.post("/jobs", isLoggedIn, isAdmin, async (req, res) => {
    try {
        // make a database object
        let newJob = new Job({
            name: req.body.name,
            address: req.body.address,
            image: req.body.image,
            package: req.body.package,
            cgpa: req.body.cgpa,
            deadline: req.body.deadline,
            type: req.body.type,
        });
        await newJob.save();

        // * push a new notification
        let newNotification = new Notification({
            body: `A new job has been posted`,
            author: newJob.name
        })
        await newNotification.save();
        req.flash('success', 'Job Posted Success')
        res.redirect("/jobs");
    } catch (error) {
        req.flash('error', 'Job Posted Failed')
        console.log("error while adding a new job", error);
    }
});

// * show
router.get("/jobs/:id", async (req, res) => {
    // fetch the required job by id
    try {
        let id = req.params.id;
        // let checkId = mongoose.Types.ObjectId.isValid(id);
        // console.log(checkId) // return true if id is a valid
        let job = await Job.findById(id).populate('appliedUsers');
        res.render("jobs/show-job", { job, page: "all-jobs" });
    } catch (error) {
        // console.log("error while fetching job by id to show", error);
        req.flash('error', 'Job Not found')
        res.redirect('/jobs');
    }
});

// * edit
router.get("/jobs/:id/edit", async (req, res) => {
    // fetch the required job by id
    try {
        let id = req.params.id;
        let job = await Job.findById(id);
        res.render("jobs/edit-jobs", { job, page: "all-jobs" });
    } catch (error) {
        console.log("error while fetching job by id to edit", error);
    }
});

// * update
router.patch("/jobs/:id", async (req, res) => {
    // res.send('logic to update jobs');
    try {
        let id = req.params.id;
        let updatedJob = {
            name: req.body.name,
            address: req.body.address,
            image: req.body.image,
            package: req.body.package,
            cgpa: req.body.cgpa,
            deadline: req.body.deadline,
            type: req.body.type,
        };
        await Job.findByIdAndUpdate(id, updatedJob);

        // * push a new notification
        let newNotification = new Notification({
            body: `A new job has been updated`,
            author: updatedJob.name
        })
        await newNotification.save();
        req.flash('success', 'Job Edited Success')
        res.redirect(`/jobs/${id}`);
    } catch (error) {
        req.flash('error', 'Job Not Edited')
        console.log("error while updating a job", error);
        res.redirect(`/jobs`);
    }
});

// * delete
router.delete("/jobs/:id", async (req, res) => {
    // res.send('logic to delete jobs');
    try {
        let id = req.params.id;
        await Job.findByIdAndDelete(id);
        // findOneAndDestroy
        req.flash('success', 'Job Deleted Success')
        res.redirect("/jobs", { page: "all-jobs" });
    } catch (error) {
        req.flash('error', 'Job Deleted Failed')
        console.log("error while deleting a job", error);
        res.redirect('/jobs');
    }
});

// apply in jobs
router.get('/jobs/:jobId/apply', isLoggedIn, async function (req, res) {
    try {
        if (!req.user.cgpa) {
            return res.send('you have not entered your cgpa');
        }
        let { jobId } = req.params;
        let job = await Job.findById(jobId);
        if (req.user.cgpa < job.cgpa) {
            return res.send('your cgpa is not enough');
        }
        for (let user of job.appliedUsers) {
            if (user._id.equals(req.user._id)) {
                return res.send('you can only apply once');
            }
        }
        // console.log(first)
        job.appliedUsers.push(req.user);
        await job.save();
        // console.log(job);
        req.flash('success', 'Applied for Job Success')
        res.redirect("/jobs");
    } catch (error) {
        req.flash('error', 'Applied for Job failed')
        console.log('error while applying in job', error);
        res.redirect("/jobs");
    }
});

// export the routes
module.exports = router;
