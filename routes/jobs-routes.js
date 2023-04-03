let express = require("express");
let router = express.Router();

// const { default: mongoose } = require("mongoose");

// import the controllers
let { home_page, index_jobs, newJob, create_job, show_job, edit_job, update_job, delete_job, apply_job } = require('../controllers/jobs-controllers')

// middleware, destructuring
let { isLoggedIn, isAdmin } = require('../middlewares/middlewares')

router.get("/", home_page);

// REST - routes
// * index
router.get("/jobs", index_jobs);

// * new
router.get("/jobs/new", isLoggedIn, isAdmin, newJob);

// * create
router.post("/jobs", isLoggedIn, isAdmin, create_job);

// * show
router.get("/jobs/:id", show_job);

// * edit
router.get("/jobs/:id/edit", edit_job);

// * update
router.patch("/jobs/:id", update_job);

// * delete
router.delete("/jobs/:id", delete_job);

// apply in jobs
router.get('/jobs/:jobId/apply', isLoggedIn, apply_job);

// export the routes
module.exports = router;
