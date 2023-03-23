let express = require('express');
// module
let Job = require('../models/job-DB');

let router = express.Router();

router.get('/',function(req,res){
    res.render('landing');
})

// REST - routes
// * index
router.get('/jobs',async(req,res)=>{
    try{
        // extracts all the jobs from DB
        let foundJobs = await Job.find({});
        res.render('index',{foundJobs});
    } catch(error){
        res.send('error while extracting all jobs',error);
    }
})

// * new
router.get('/jobs/new',(req,res)=>{
    res.render('new');
})

// * create
router.post('/jobs',async(req,res)=>{
    try {
        // make a database object
        let newJob = new Job({
            name: req.body.name,
            address: req.body.address,
            image: req.body.image
        });
        await newJob.save();
        res.redirect('/jobs');
    } catch (error) {
        console.log("error while adding a new job",error)
    }
})

// * show
router.get('/jobs/:id',async(req,res)=>{
    // fetch the required job by id
    try {
        let id = req.params.id;
        let job = await Job.findById(id);
        res.render('show',{job})
    } catch (error) {
        console.log("error while fetching job by id to show",error)
    }
})

// * edit
router.get('/jobs/:id/edit',async(req,res)=>{
     // fetch the required job by id
    try {
        let id = req.params.id;
        let job = await Job.findById(id);
        res.render('edit',{job})
    } catch (error) {
        console.log("error while fetching job by id to edit",error)
    }
})

// * update
router.patch('/jobs/:id',async(req,res)=>{
    // res.send('logic to update jobs');
    try {
        let id = req.params.id;
        let updatedJob = {
            name: req.body.name,
            address: req.body.address,
            image: req.body.image,
        }
        await Job.findByIdAndUpdate(id,updatedJob);
        res.redirect(`/jobs/${id}`)
    } catch (error) {
        console.log("error while updating a job",error);
    }
})

// * delete
router.delete('/jobs/:id',async(req,res)=>{
    // res.send('logic to delete jobs');
    try {
        let id = req.params.id;
        await Job.findByIdAndDelete(id);
        res.redirect('/jobs');
    } catch (error) {
        console.log("error while deleting a job",error);
    }
})

// export the routes
module.exports = router;