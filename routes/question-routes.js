const express = require('express');
let router = express.Router();

let Job = require('../models/jobs-database');
let Question = require('../models/questions-database');
// let User = require('../models/users-database');
let {isLoggedIn,isAdmin} = require('../middlewares/middlewares')

//index
router.get('/jobs/:id/questions', async (req, res)=>{
    try {
        // let questions = await Question.find({});
        let jobId = req.params.id;
        let job = await Job.findById(jobId).populate('questions');
        let questions = job.questions;
        res.render('questions/index-question', {questions,jobId});
    } catch (error) {
        console.log('problem while fetching questions', error);
    }
})

//new
router.get('/jobs/:id/questions/new', isAdmin, isLoggedIn , async (req, res)=>{
    try {
        // let jobId = await Job.findById(req.params.id);
        let jobId = req.params.id;
        res.render('questions/new-question', {jobId});
        // res.render('questions/new-question');
    } catch (error) {
        console.log('problem while fetching questions', error);
    }
})

//create
router.post('/jobs/:id/questions',isAdmin,isLoggedIn, async (req, res)=>{
    try {
        let question = await Question.create(req.body.question);
        await question.save();
        let job = await Job.findById(req.params.id);
        job.questions.push(question);
        job.save();
        res.redirect(`/jobs/${req.params.id}/questions`);
    } catch (error) {
        console.log(`problem while creating questions`, error);
    }
})

// delete
router.delete('/jobs/:id/questions/:question_id',isAdmin,isLoggedIn, async (req, res)=>{
    try {
        let question = await Question.findByIdAndDelete(req.params.question_id);
        let job = await Job.findById(req.params.id);
        job.questions.remove(question);
        job.save();
        res.redirect(`/jobs/${req.params.id}/questions`);
    } catch (error) {
        console.log(`problem while deleting questions`, error);
    }
})

// test
router.get('/jobs/:id/test', async (req, res)=>{
    try {
        let jobId = req.params.id;
        let job = await Job.findById(jobId).populate('questions');
        // let questions = job.questions;
        // res.render('questions/test-question', {questions,jobId});
        res.render('questions/test-question', {job});
    } catch (error) {
        console.log('problem while fetching questions', error);
    }
})

// test submit
router.post('/jobs/:id/test', async (req, res)=>{
    try {
        // user can give test only once
        // selected user not able to give test
        let jobId = req.params.id;
        let job = await Job.findById(jobId).populate('questions');
        let questions = job.questions;
        let score = 0;
        let required = 0.75*questions.length;
        for(let i in questions){
            // console.log("default Correct" + questions[i].correctOption)
            // console.log("user correct" + req.body.answers[i])
            if(questions[i].correctOption == req.body.answers[i]){
                score+=1;
            }
        }
        if(score >= required){
            return res.send(`You are passed ${score}`)
        }else{
            return res.send(`You are failed ${score}`)
        }
    } catch (error) {
        console.log('problem while fetching questions', error);
    }
})

module.exports = router;