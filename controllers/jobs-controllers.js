// module
let Job = require("../models/jobs-database");
let Notification = require("../models/notifications-database");

const home_page = (req, res) => {
    // req.flash('success','Welcome to index jobs')
    res.render("home-page", { page: "home-page" });
}

const index_jobs = async (req, res) => {
    try {
        if (req.query.search && req.query.search.length > 0) {
            // fuzzy searching
            let regex = new RegExp(req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
            let foundJobs = await Job.find({ name: regex });
            res.render('jobs/all-jobs', { foundJobs, page: "all-jobs" });
        } else {
            // extract all the jobs from db
            let foundJobs = await Job.find({});
            res.render('jobs/all-jobs', { foundJobs, page: "all-jobs" });
        }
    } catch (error) {
        req.flash('error', 'Error while extracting all jobs')
        res.redirect('/jobs')
    }
}

const newJob = (req, res) => {
    res.render("jobs/new-job", { page: "all-jobs" });
}

const create_job = async (req, res) => {
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
        res.render("jobs/new-job")
        // console.log("error while adding a new job", error);
    }
}

const show_job = async (req, res) => {
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
}

const edit_job = async (req, res) => {
    // fetch the required job by id
    try {
        let id = req.params.id;
        let job = await Job.findById(id);
        res.render("jobs/edit-jobs", { job, page: "all-jobs" });
    } catch (error) {
        req.flash('error', 'Error while editing job')
        res.redirect('/jobs')
        // console.log("error while fetching job by id to edit", error);
    }
}

const update_job = async (req, res) => {
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
        // console.log("error while updating a job", error);
        req.flash('error', 'Error while updating a job')
        res.redirect(`/jobs`);
    }
}

const delete_job = async (req, res) => {
    // res.send('logic to delete jobs');
    try {
        let id = req.params.id;
        await Job.findByIdAndDelete(id);
        // findOneAndDestroy
        req.flash('success', 'Job Deleted Success')
        res.redirect("/jobs", { page: "all-jobs" });
    } catch (error) {
        // console.log("error while deleting a job", error);
        req.flash('error', 'Error while deleting a job')
        res.redirect('/jobs');
    }
}

const apply_job = async function (req, res) {
    try {
        // CGPA validation
        if (!req.user.cgpa) {
            return res.send('you have not entered your cgpa');
        }
        let { jobId } = req.params;
        let job = await Job.findById(jobId);
        // does the user have a required CGPA
        if (req.user.cgpa < job.cgpa) {
            return res.send('your cgpa is not enough');
        }
        // user can apply only once
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
        // console.log('error while applying in job', error);
        req.flash('error', 'Error while applying in job')
        res.redirect("/jobs");
    }
}

module.exports = {
    home_page,
    index_jobs,
    newJob,
    create_job,
    show_job,
    edit_job,
    update_job,
    delete_job,
    apply_job
}